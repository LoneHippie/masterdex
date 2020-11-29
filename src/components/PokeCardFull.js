import React from 'react';
import '../styles/_pokecard__full.scss';
import '../styles/_pokecard__full--detailed-info.scss';

const PokeCardFull = (props) => {

    const { pokemon, pokemonIndex, styles, textColor, getContrastBg, typeListText, abilityListText } = props;

    let typeName = pokemon.data.types[0].type.name;

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
            moveDisplay.style.display = "grid";
        }

    };

    //function for getting JSX for stat bars. Starting point = el.data.stats for input
    const statBars = (input, type) => {
        let stats = {
            name: ['HP', 'Attack', 'Defense', 'Sp. Attack', 'Sp. Defense', 'Speed', 'Total'], //name of each stat including "total"
            value: [], //value for each individual stat
            percentage: [], //percentage for width styling
            max: [255, 190, 230, 194, 230, 180, 780], //max value of each stat
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
                    <label className="stat--label" key={`stat-label-${stats.name[i]}`} htmlFor={`stat-bar-${stats.name[i]}`}>{stats.name[i]}</label>
                </div>
            );
        };

        return stats.jsx; //array of jsx generated from for looping over stats obj
        
    };

    const originalGen = () => {
        let firstVersion = pokemon.data.game_indicies[0].name;

        switch(true) {
            case firstVersion === 'red' || firstVersion === 'blue' || firstVersion === 'yellow':
                return 1;
            case firstVersion === 'gold' || firstVersion === 'silver' || firstVersion === 'crystal':
                return 2;
            case firstVersion === 'ruby' || firstVersion === 'sapphire' || firstVersion === 'emerald' || firstVersion === 'firered' || firstVersion === 'leafgreen':
                return 3;
            case firstVersion === 'diamond' || firstVersion === 'pearl' || firstVersion === 'platinum' || firstVersion === 'heartgold' || firstVersion === 'soulsilver':
                return 4;
            case firstVersion === 'black' || firstVersion ==='white' || firstVersion === 'black-2' || firstVersion === 'white-2':
                return 5;
            default:
                return 6; //game_indicies after gen5 are not listed but move properties should be more or less the same for every sequential gen
        };
    };

    const movePool = (input, type) => { //input = pokemon.data.moves
        return input.map((el, index) => 
            <div className="move" key={`pk-move-${index}`} style={{background: getContrastBg(typeName), border: `2px solid ${textColor(typeName)}`}} onClick={() => console.log(el.version_group_details[0].move_learn_method.name)}>
                <div className="move__info" key={`pk-move-info-${index}`}>
                    <span className="move__info--learn-lvl" key={`pk-learn-level-${index}`}>
                        lvl {el.version_group_details[0].level_learned_at}
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
        <section className="pokecard-full" key={`pokemon-full-${pokemonIndex}`} id={`full-display-pk-${pokemon.data.id}`} style={{background: eval(`styles.solid_${typeName}`)}}>

            <strong className="pokecard-full--exit" style={{color: textColor(typeName)}} id={`close-display-pk-${pokemon.data.id}`} onClick={props.closeFullDisplay}>x</strong>
                    
            <div className="pokecard-full__general-info" style={{color: textColor(typeName)}}>

                <div className="pokecard-full__general-info--id">{`Game ID: #${pokemon.data.id}`}</div>
                <div className="pokecard-full__general-info--height">{`Height: ${pokemon.data.height / 10}m`}</div>
                <div className="pokecard-full__general-info--weight">{`Weight: ${pokemon.data.weight / 10}kg`}</div>

                <div className="pokecard-full__general-info__type-container">
                    <span>Type:</span>
                    <div style={{color: textColor(typeName)}}>
                        {typeListText(pokemon.data.types, typeName)}
                    </div>
                </div>

                <div className="pokecard-full__general-info__ability-container">
                    <span>Abilities:</span>
                    <div className="ability-flex-container" >
                        {abilityListText(pokemon.data.abilities, typeName)}
                    </div>
                </div>

            </div>

            <div className="pokecard-full__visual">

                <div className="pokecard-full__visual--name" key={`pk-name-${pokemonIndex}`} style={{color: textColor(typeName)}}>
                    {pokemon.data.name}
                </div>

                <img
                    key={`pk-sprite-${pokemonIndex}`}
                    src={pokemon.data.sprites.front_default}
                    alt={`sprite for ${pokemon.data.name}`}
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
                    {statBars(pokemon.data.stats)}
                </section>

                <section className="move-display" id={`move-display-${pokemonIndex}`} style={{color: textColor(typeName)}}>
                    {movePool(pokemon.data.moves)}
                </section>

            </div>

        </section>
    );

};

export default PokeCardFull;