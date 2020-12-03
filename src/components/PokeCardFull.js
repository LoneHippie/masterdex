import React from 'react';
import '../styles/_pokecard__full.scss';
import '../styles/_pokecard__full--detailed-info.scss';

const PokeCardFull = (props) => {

    //Note 2/12/20 ::: cool new properties to get info from:
        //pokemon.genera[7](7 is english).genus - string describing pokemon genus ('Seed Pokemon', 'Embrace Pokemon', etc)
        //pokemon.generation.name - gets string for gens like 'generation-iv'
        //pokemon.is_legendary/.is_mythical - returns true/false for these

    const { pokemon, pokemonIndex, moves, styles, textColor, getContrastBg, typeListText, abilityListText } = props;

    //primary type name for pokemon
    let typeName = pokemon.types[0].type.name;

    //japanese string name for pokemon
    let nameJp = pokemon.names.filter((el => el.language.name === 'ja-Hrkt'));
    nameJp = nameJp[0].name;

    //change moves.type_id from number to type string value for styling purposes
    moves.map(el => {
        switch (true) {
            case el.type_id === 1:
                return el.type_id = 'normal';
            case el.type_id === 2:
                return el.type_id = 'fighting';
            case el.type_id === 3:
                return el.type_id = 'flying';
            case el.type_id === 4:
                return el.type_id = 'poison';
            case el.type_id === 5:
                return el.type_id = 'ground';
            case el.type_id === 6:
                return el.type_id = 'rock';
            case el.type_id === 7:
                return el.type_id = 'bug';
            case el.type_id === 8:
                return el.type_id = 'ghost';
            case el.type_id === 9:
                return el.type_id = 'steel';
            case el.type_id === 10:
                return el.type_id = 'fire';
            case el.type_id === 11:
                return el.type_id = 'water';
            case el.type_id === 12:
                return el.type_id = 'grass';
            case el.type_id === 13:
                return el.type_id = 'electric';
            case el.type_id === 14:
                return el.type_id = 'pyschic';
            case el.type_id === 15:
                return el.type_id = 'ice';
            case el.type_id === 16:
                return el.type_id = 'dragon';
            case el.type_id === 17:
                return el.type_id = 'dark';
            case el.type_id === 18:
                return el.type_id = 'fairy';
        };
    });

    //function for toggling between base stat and move pool view
    function toggleDisplay() {
        let checkStatus = document.getElementById(`switch-${pokemonIndex}`);
        let statDisplay = document.getElementById(`stat-display-${pokemonIndex}`);
        let moveDisplay = document.getElementById(`move-display-${pokemonIndex}`);

        if (checkStatus.checked === false) {
            statDisplay.style.display = "flex";
            moveDisplay.style.display = "none";
        } else {
            statDisplay.style.display = "none";
            moveDisplay.style.display = "flex";
        };
    };

    //function for getting JSX for stat bars. Starting point = el.data.stats for input
    const statBars = (input, type) => {
        let stats = {
            name: ['HP', 'Attack', 'Defense', 'Sp. Atk', 'Sp. Def', 'Speed', 'Total'], //name of each stat including "total"
            value: [], //value for each individual stat
            percentage: [], //percentage for width styling
            max: [255, 165, 230, 154, 230, 160, 720], //max value of each stat
            jsx: [], //jsx elements to  be returned later

            getTotalStats: function() {
                let max = this.value.reduce((el, acc) => el + acc);
                this.value.push(max);
            }
        };

        //getting data per pokemon for stat values
        for (let i = 0; i < input.length; i++) {
            stats.value.push(input[i].base_stat);
        };

        stats.getTotalStats();

        for (let i = 0; i < stats.value.length; i++) {
            let perc;

            perc = (stats.value[i] / stats.max[i]) * 100;
            perc = perc + '%';

            stats.percentage.push(String(perc));
        };

        for (let i = 0; i < stats.value.length; i++) {
            stats.jsx.push(
                <div className="stat" key={`stat-${stats.name[i]}`}>
                    <div className="stat__container" key={`stat-container-${stats.name[i]}`} style={{border: `2px solid ${textColor(typeName)}`}}>
                        <div className="stat__container--stat" key={`stat-bar-${stats.name[i]}`} id={`stat-bar-${stats.name[i]}`} style={{width: stats.percentage[i], background: getContrastBg(typeName)}}>
                            <strong className="stat__container--stat--value" key={`stat-bar-value-${stats.name[i]}`}>{stats.value[i]}</strong>
                        </div>
                    </div>
                    <label className="stat--label" key={`stat-label-${stats.name[i]}`} htmlFor={`stat-bar-${stats.name[i]}`}>
                        {stats.name[i]}
                    </label>
                </div>
            );
        };

        return stats.jsx; //array of jsx generated from for looping over stats obj
        
    };    

    const movesLevel = pokemon.moves.filter(el => el.version_group_details[0].move_learn_method.name === 'level-up');
    const movesMachine = pokemon.moves.filter(el => el.version_group_details[0].move_learn_method.name === 'machine');
    const movesTutor = pokemon.moves.filter(el => el.version_group_details[0].move_learn_method.name === 'tutor');
    const movesEgg = pokemon.moves.filter(el => el.version_group_details[0].move_learn_method.name === 'egg');

    const movePool = (input) => { //input = pokemon.data.moves, eventually replace the index for method and details with gen index

        //this can be used for styling specific to move type
        const moveTypeColor = (el) => {
            let id = parseInt(el.move.url.slice(31).slice(0, -1), 10);

            const curMove = moves.find((el) => {
                return el.id === id;
            });

            return curMove.type_id;
        };

        //sorting all moves first by learn method, then by level
        input.sort((a, b) => {
            return b.version_group_details[0].move_learn_method.name.length - a.version_group_details[0].move_learn_method.name.length;
        });

        input.sort((a, b) => {
            if (a.version_group_details[0].move_learn_method.name === 'level-up') {
                return a.version_group_details[0].level_learned_at - b.version_group_details[0].level_learned_at;
            } else {
                return 0;
            }
        });

        return input.map((el, index) => 
            <div className="move" key={`pk-move-${index}`} style={{background: eval(`styles.gradient_${moveTypeColor(el)}`), color: textColor(moveTypeColor(el)), border: `2px solid ${textColor(typeName)}`}}>
                <div className="move__info" key={`pk-move-info-${index}`}>
                    <span className="move__info--learn-lvl" key={`pk-learn-level-${index}`}>
                        lvl {el.version_group_details[0].level_learned_at === 0 ? '-' : el.version_group_details[0].level_learned_at}
                    </span>
                    <span className="move__info--learn-method" key={`pk-learn-method-${index}`}>
                        {el.version_group_details[0].move_learn_method.name}
                    </span>
                </div>
                <div className="move--name" key={`pk-move-${index}`}>
                    {el.move.name}
                </div>
            </div>
        );
    };

    return (
        <section className="pokecard-full" key={`pokemon-full-${pokemonIndex}`} id={`full-display-pk-${pokemon.id}`} style={{background: eval(`styles.solid_${typeName}`)}}>

            <strong className="pokecard-full--exit" style={{color: textColor(typeName)}} id={`close-display-pk-${pokemon.id}`} onClick={props.closeFullDisplay}>x</strong>
                    
            <div className="pokecard-full__general-info" style={{color: textColor(typeName)}}>

                <div className="pokecard-full__general-info--id">{`Game ID: #${pokemon.id}`}</div>
                <div className="pokecard-full__general-info--height">{`Height: ${pokemon.height / 10}m`}</div>
                <div className="pokecard-full__general-info--weight">{`Weight: ${pokemon.weight / 10}kg`}</div>

                <div className="pokecard-full__general-info__type-container">
                    <span>Type:</span>
                    <div style={{color: textColor(typeName)}}>
                        {typeListText(pokemon.types, typeName)}
                    </div>
                </div>

                <div className="pokecard-full__general-info__ability-container">
                    <span>Abilities:</span>
                    <div className="ability-flex-container" >
                        {abilityListText(pokemon.abilities, typeName)}
                    </div>
                </div>

            </div>

            <div className="pokecard-full__visual">

                <div className="pokecard-full__visual--name" key={`pk-name-${pokemonIndex}`} style={{color: textColor(typeName)}}>
                    {pokemon.name}
                </div>

                <div className="pokecard-full__visual--name-jp" key={`pk-name-jp-${pokemonIndex}`} style={{color: pokemon.color.name}}>
                    {nameJp}
                </div>

                <img
                    key={`pk-sprite-${pokemonIndex}`}
                    src={pokemon.sprites.front_default}
                    alt={`sprite for ${pokemon.name}`}
                    className="pokecard-full__visual--sprite"
                    style={{filter: `drop-shadow(1.5px 3px 3px #2F4F4F`}}
                />

            </div>

            <div className="pokecard-full__detailed-info">

                <section className="info-toggle" style={{color: textColor(typeName)}}>
                    <span className="info-toggle--current-label">Stats</span>
                    <input type="checkbox" id={`switch-${pokemonIndex}`} className="info-toggle--switch" onChange={toggleDisplay}/>
                    <label htmlFor={`switch-${pokemonIndex}`} className="info-toggle--switch--label"></label>
                    <span className="info-toggle--current-label">Moves</span>
                </section>
                
                <section className="stat-display" id={`stat-display-${pokemonIndex}`} style={{color: textColor(typeName)}}>
                    {statBars(pokemon.stats)}
                </section>

                <section className="move-display" id={`move-display-${pokemonIndex}`}>

                    <span className="move-display--title" style={{color: textColor(typeName)}}>
                        {movePool(movesLevel).length === 0 ? '' : 'Learned Naturally:'}
                    </span>
                    <div className="move-display--section">
                        {movePool(movesLevel)}
                    </div>

                    <span className="move-display--title" style={{color: textColor(typeName)}}>
                        {movePool(movesMachine).length === 0 ? '' : 'TM/TM:'}
                    </span>                   
                    <div className="move-display--section">
                        {movePool(movesMachine)}
                    </div>

                    <span className="move-display--title" style={{color: textColor(typeName)}}>
                        {movePool(movesTutor).length === 0 ? '' : 'Tutor Moves:'}
                    </span>
                    <div className="move-display--section">
                        {movePool(movesTutor)}
                    </div>

                    <span className="move-display--title" style={{color: textColor(typeName)}}>
                        {movePool(movesEgg).length === 0 ? '' : 'Egg Moves:'}
                    </span>                   
                    <div className="move-display--section">
                        {movePool(movesEgg)}
                    </div>    

                </section>

            </div>

        </section>
    );

};

export default PokeCardFull;