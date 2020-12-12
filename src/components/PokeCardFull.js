import React, { useState, useEffect } from 'react';
import '../styles/_pokecard__full.scss';
import '../styles/_pokecard__full--detailed-info.scss';

const PokeCardFull = (props) => {

    //Note 2/12/20 ::: cool new properties to get info from:
        //pokemon.genera[7](7 is english).genus - string describing pokemon genus ('Seed Pokemon', 'Embrace Pokemon', etc)
        //pokemon.is_legendary/.is_mythical - returns true/false for these

    //Note 12/12/20 ::: GenIndex now working as intended. Might be some issue with the second pokemon.moves.forEach method, but not critical. Look into later when refactoring

    const { pokemon, pokemonIndex, moves, styles, textColor, getContrastBg, typeListText, abilityListText } = props;
    const [gen, setGen] = useState(1);

    //initializes gen hook for each pokemon
    function initGen(input) {
        switch(true) {
            case input.generation.name === 'generation-i':
                return setGen(1);
            case input.generation.name === 'generation-ii':
                return setGen(2);
            case input.generation.name === 'generation-iii':
                return setGen(3);
            case input.generation.name === 'generation-iv':
                return setGen(4);
            case input.generation.name === 'generation-v':
                return setGen(5);
            case input.generation.name === 'generation-vi':
                return setGen(6);
            case input.generation.name === 'generation-vii':
                return setGen(7);
            case input.generation.name === 'generation-viii':
                return setGen(8);
        };
    };
    initGen(pokemon);

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
                return el.type_id = 'psychic';
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

    //changes pokemon.moves.move.version_group_details.version_group.name to number equal to gen
    pokemon.moves.forEach((move, val) => {
        move.version_group_details.map((el, index) => {
            switch(true) { //also deletes items that aren't gen 1-7 since colosseum and xd are not relevant and 8 has no move data
                case el.version_group.name === 'red-blue':
                    return el.version_group.name = 1;
                case el.version_group.name === 'yellow':
                    return el.version_group.name = 1;
                case el.version_group.name === 'gold-silver':
                    return el.version_group.name = 2;
                case el.version_group.name === 'crystal':
                    return el.version_group.name = 2;
                case el.version_group.name === 'ruby-sapphire':
                    return el.version_group.name = 3;
                case el.version_group.name === 'emerald':
                    return el.version_group.name = 3;
                case el.version_group.name === 'firered-leafgreen':
                    return el.version_group.name = 3;
                case el.version_group.name === 'diamond-pearl':
                    return el.version_group.name = 4;
                case el.version_group.name === 'platinum':
                    return el.version_group.name = 4;
                case el.version_group.name === 'heartgold-soulsilver':
                    return el.version_group.name = 4;
                case el.version_group.name === 'black-white':
                    return el.version_group.name = 5;
                case el.version_group.name === 'black-2-white-2':
                    return el.version_group.name = 5;
                case el.version_group.name === 'x-y':
                    return el.version_group.name = 6;
                case el.version_group.name === 'omega-ruby-alpha-sapphire':
                    return el.version_group.name = 6;
                case el.version_group.name === 'sun-moon':
                    return el.version_group.name = 7;
                case el.version_group.name === 'ultra-sun-ultra-moon':
                    return el.version_group.name = 7;

                case el.version_group.name === 'colosseum':
                    return move.version_group_details.splice(index, 1);
                case el.version_group.name === 'xd':
                    return move.version_group_details.splice(index, 1);
            };
        });

        //removes any moves that were only xd or col
        if (move.version_group_details.length === 0) {
            pokemon.moves.splice(val, 1);
        }

    });

    //attempt to filter out different versions of moves from the same generations
    //this works, but PAY ATTENTION for any irregulatities
    pokemon.moves.forEach((move) => {
        if (move.version_group_details.length > 1 && move.version_group_details !== undefined) {
            for (let i = 1; i < move.version_group_details.length; i++) {
                //if current index and previous index contain the same gen name:
                if (move.version_group_details[i].version_group.name === move.version_group_details[i - 1].version_group.name) {
                    move.version_group_details.splice(i, 1);
                }
            }
            for (let i = 1; i < move.version_group_details.length; i++) {
                //if current index and previous index contain the same gen name:
                if (move.version_group_details[i].version_group.name === move.version_group_details[i - 1].version_group.name) {
                    move.version_group_details.splice(i, 1);
                }
            }
        }
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
    const statBars = (input) => {
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

    const getGenSelect = (input) => {

        //changes current pokemon.generation.name to number value corresponding to generation number
        switch(true) {
            case input.generation.name === 'generation-i':
                return input.generation.name = 1;
            case input.generation.name === 'generation-ii':
                return input.generation.name = 2;
            case input.generation.name === 'generation-iii':
                return input.generation.name = 3;
            case input.generation.name === 'generation-iv':
                return input.generation.name = 4;
            case input.generation.name === 'generation-v':
                return input.generation.name = 5;
            case input.generation.name === 'generation-vi':
                return input.generation.name = 6;
            case input.generation.name === 'generation-vii':
                return input.generation.name = 7;
            case input.generation.name === 'generation-viii':
                return input.generation.name = 8;
        };

        //empty array to push JSX elements
        let selectOptions = [];
        //first geneation current pokemon appears in
        const firstGen = input.generation.name;
        //initial select option for firstGen, selected by default on load
        selectOptions.push(<option key={`gen-select-${firstGen}`} value={firstGen} selected>{`Gen ${firstGen}`}</option>);

        //pushing new select options in for each gen between firstGen and gen 8
        if (firstGen !== 8) {
            for (let i = (firstGen + 1); i <= 8; i++) {
                selectOptions.push(
                    <option key={`gen-select-${i}`} value={i}>{`Gen ${i}`}</option>
                );
            };
        };

        return selectOptions;
    };

    //function for generation move pool
    const movePool = (input, learnMethod) => {
        //filters moves not in current selected gen
        input = input.filter((el) => {
            let id = parseInt(el.move.url.slice(31).slice(0, -1), 10);
    
            if (moves[id].generation_id <= gen) {
                return el;
            };
        });

        //filter for each learn method argument
        input = input.filter(el => el.version_group_details[0].move_learn_method.name === learnMethod);

        //gets genIndex for each lvl move to select the right index for levels in different gens
        if (learnMethod === 'level-up') {
            input.forEach(move => {
                move.version_group_details.map((el, val) => {
                    switch(true) {
                        case el.move_learn_method.name === 'level-up' && el.version_group.name === parseInt(gen, 10):
                            return move.genIndex = val;
                    };
                });
            });
        };

        //this can be used for styling specific to move type
        const moveTypeColor = (el) => {
            let id = parseInt(el.move.url.slice(31).slice(0, -1), 10);

            const curMove = moves.find((el) => {
                return el.id === id;
            });

            return curMove.type_id;
        };

        //gets PP value for each move
        const movePP = (el) => {
            let id = parseInt(el.move.url.slice(31).slice(0, -1), 10);

            const curMove = moves.find((el) => {
                return el.id === id;
            });

            return curMove.pp;
        };

        //gets category of each move (status, physical, special)
        const moveCategory = (el) => {
            let id = parseInt(el.move.url.slice(31).slice(0, -1), 10);

            const curMove = moves.find((el) => {
                return el.id === id;
            });

            if (curMove.damage_class_id === 1) {
                return 'Status';
            } else if (curMove.damage_class_id === 2) {
                return 'Phsycial';
            } else {
                return 'Special';
            };
        };

        //sorting all level-up moves by level
        input.sort((a, b) => {
            if (a.version_group_details[0].move_learn_method.name === 'level-up') {
                let genIndexA = a.genIndex !== undefined ? a.genIndex : 0;
                let genIndexB = b.genIndex !== undefined ? b.genIndex: 0;
                return a.version_group_details[genIndexA].level_learned_at - b.version_group_details[genIndexB].level_learned_at;
            } else {
                return 0;
            }
        });

        //setting genIndex incase intial render is undefined
        let genIndex = (el) => el.genIndex === undefined ? 0 : el.genIndex;

        return input.map((el, index) => 
            <div className="move" key={`pk-move-${index}`} style={{background: eval(`styles.gradient_${moveTypeColor(el)}`), color: textColor(moveTypeColor(el)), border: `2px solid ${textColor(typeName)}`}}>
                <div className="move__info" key={`pk-move-info-top-${index}`}>
                    <span className="move__info--learn-lvl" key={`pk-learn-level-${index}`}>
                        lvl {el.version_group_details[genIndex(el)].level_learned_at === 0 ? '-' : el.version_group_details[genIndex(el)].level_learned_at}
                    </span>
                    <span className="move__info--learn-method" key={`pk-learn-method-${index}`}>
                        {el.version_group_details[0].move_learn_method.name}
                    </span>
                </div>
                <div className="move--name" key={`pk-move-${index}`}>
                    {el.move.name}
                </div>
                <div className="move__info" key={`pk-move-info-bottom-${index}`}>
                    <span className="move__info--pp">
                        {movePP(el)} PP
                    </span>
                    <span className="move__info--category">
                        {moveCategory(el)}
                    </span>
                </div>
            </div>
        );
    };

////////// Final return for each card //////////

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
                    onClick={() => console.log(pokemon.moves)}
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

                    <div className="move-display__custom-select">
                        <select
                            className="move-display__custom-select--gens"
                            style={{
                                color: textColor(typeName),
                                background: getContrastBg(typeName),
                                border: `2px solid ${textColor(typeName)}`
                            }}
                            onChange={(e) => setGen(e.target.value)}
                        >
                            {getGenSelect(pokemon)}
                        </select>
                    </div>

                    <span className="move-display--title" style={{color: textColor(typeName)}}>
                        {movePool(pokemon.moves, 'level-up').length === 0 ? '' : 'Learned Naturally:'}
                    </span>

                    <div className="move-display--section">
                        {movePool(pokemon.moves, 'level-up')}
                    </div>
                    
                    <span className="move-display--title" style={{color: textColor(typeName)}}>
                        {movePool(pokemon.moves, 'machine').length === 0 ? '' : 'TM/TM:'}
                    </span>                   
                    <div className="move-display--section">
                        {movePool(pokemon.moves, 'machine')}
                    </div>

                    <span className="move-display--title" style={{color: textColor(typeName)}}>
                        {movePool(pokemon.moves, 'tutor').length === 0 ? '' : 'Tutor Moves:'}
                    </span>
                    <div className="move-display--section">
                        {movePool(pokemon.moves, 'tutor')}
                    </div>

                    <span className="move-display--title" style={{color: textColor(typeName)}}>
                        {movePool(pokemon.moves, 'egg').length === 0 ? '' : 'Egg Moves:'}
                    </span>                   
                    <div className="move-display--section">
                        {movePool(pokemon.moves, 'egg')}
                    </div>    

                </section>

            </div>

        </section>
    );

};

export default PokeCardFull;