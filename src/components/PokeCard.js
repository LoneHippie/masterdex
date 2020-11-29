import React from 'react';
import '../styles/_pokecard.scss';
import '../styles/svg_icons.css';

import Bug from '../images/bug.svg';
import Dark from '../images/dark.svg';
import Dragon from '../images/dragon.svg';
import Electric from '../images/electric.svg';
import Fairy from '../images/fairy.svg';
import Fighting from '../images/fighting.svg';
import Fire from '../images/fire.svg';
import Flying from '../images/flying.svg';
import Ghost from '../images/ghost.svg';
import Grass from '../images/grass.svg';
import Ground from '../images/ground.svg';
import Ice from '../images/ice.svg';
import Normal from '../images/normal.svg';
import Poison from '../images/poison.svg';
import Psychic from '../images/psychic.svg';
import Rock from '../images/rock.svg';
import Steel from '../images/steel.svg';
import Water from '../images/water.svg';

import PokeCardFull from './PokeCardFull';
import PokeCardMini from './PokeCardMini';

const PokeCard = (props) => {

    //style object for card backgrounds
    let styles = {
        gradient_normal: "linear-gradient(to top left, rgba(169, 169, 169, 0.95), rgba(169, 169, 169, 0.6))",
        gradient_fire: "linear-gradient(to top left, rgba(238, 129, 48, 0.95), rgba(238, 129, 48, 0.6))",
        gradient_water: "linear-gradient(to top left, rgba(99, 144, 240, 0.95), rgba(99, 144, 240, 0.6))",
        gradient_electric: "linear-gradient(to top left, rgba(247, 208, 44, 0.95), rgba(247, 208, 44, 0.6))",
        gradient_grass: "linear-gradient(to top left, rgba(122, 199, 76, 0.95), rgba(122, 199, 76, 0.6))",
        gradient_ice: "linear-gradient(to top left, rgba(150, 217, 214, 0.95), rgba(150, 217, 214, 0.6))",
        gradient_fighting: "linear-gradient(to top left, rgba(194, 46, 40, 0.95), rgba(194, 46, 40, 0.6))",
        gradient_poison: "linear-gradient(to top left, rgba(163, 62, 161, 0.95), rgba(163, 62, 161, 0.6))",
        gradient_ground: "linear-gradient(to top left, rgba(226, 191, 101, 0.95), rgba(226, 191, 101, 0.6))",
        gradient_flying: "linear-gradient(to top left, rgba(169, 143, 243, 0.95), rgba(169, 143, 243, 0.6))",
        gradient_psychic: "linear-gradient(to top left, rgba(249, 85, 135, 0.95), rgba(249, 85, 135, 0.6))",
        gradient_bug: "linear-gradient(to top left, rgba(166, 185, 26, 0.95), rgba(166, 185, 26, 0.6))",
        gradient_rock: "linear-gradient(to top left, rgba(182, 161, 54, 0.95), rgba(182, 161, 54, 0.6))",
        gradient_ghost: "linear-gradient(to top left, rgba(115, 87, 151, 0.95), rgba(115, 87, 151, 0.6))",
        gradient_dragon: "linear-gradient(to top left, rgba(111, 53, 252, 0.95), rgba(111, 53, 252, 0.6))",
        gradient_dark: "linear-gradient(to top left, rgba(112, 87, 70, 0.95), rgba(112, 87, 70, 0.6))",
        gradient_steel: "linear-gradient(to top left, rgba(183, 183, 206, 0.95), rgba(183, 183, 206, 0.6))",
        gradient_fairy: "linear-gradient(to top left, rgba(214, 133, 173, 0.95), rgba(214, 133, 173, 0.6))",

        solid_normal: "rgba(169, 169, 169)",
        solid_fire: "rgba(238, 129, 48)",
        solid_water: "rgba(99, 144, 240)",
        solid_electric: "rgba(247, 208, 44)",
        solid_grass: "rgba(122, 199, 76)",
        solid_ice: "rgba(150, 217, 214)",
        solid_fighting: "rgba(194, 46, 40)",
        solid_poison: "rgba(163, 62, 161)",
        solid_ground: "rgba(226, 191, 101)",
        solid_flying: "rgba(169, 143, 243)",
        solid_psychic: "rgba(249, 85, 135)",
        solid_bug: "rgba(166, 185, 26)",
        solid_rock: "rgba(182, 161, 54)",
        solid_ghost: "rgba(115, 87, 151)",
        solid_dragon: "rgba(111, 53, 252)",
        solid_dark: "rgba(112, 87, 70)",
        solid_steel: "rgba(183, 183, 206)",
        solid_fairy: "rgba(214, 133, 173)"
    };

    //text color changer for managing background contrast
    const textColor = (type) => {
        if (type === 'grass' || type === 'water' || type === 'poison' || type === 'fighting' || type === 'dragon' || type === 'dark' || type === 'ghost' || type === 'psychic') {
            return '#DCDCDC';
        } else {
            return '#2F4F4F';
        };
    };

    //for getting the inverse bg color of the text color
    const getContrastBg = (type) => {
        if (type === 'grass' || type === 'water' || type === 'poison' || type === 'fighting' || type === 'dragon' || type === 'dark' || type === 'ghost' || type === 'psychic') {
            return '#2F4F4F';
        } else {
            return '#DCDCDC';
        };
    }

    //function for getting JSX img list of type icons
    const typeListIcons = (input) => {
        let types = [];

        //re-assigning imported variables to local variables for easier use
        const [bug, dark, dragon, electric, fairy, fighting, fire, flying, ghost, grass, ground, ice, normal, poison, psychic, rock, steel, water] = [Bug, Dark, Dragon, Electric, Fairy, Fighting, Fire, Flying, Ghost, Grass, Ground, Ice, Normal, Poison, Psychic, Rock, Steel, Water];

        for (let i = 0; i < input.length; i++) {
            types.push(input[i].type.name);
        };

        return types.map((input, index) => <img key={`pk-type-icon-${index}`} className={`icon ${input}`} src={eval(input)} alt={`${input} icon`}/>);
    };

     //function for getting JSX div list of type names
    const typeListText = (input, type) => {
        let types = [];

        for (let i = 0; i < input.length; i++) {
            types.push(input[i].type.name);
        };

        return types.map((input, index) => 
            <div key={`pk-type-text-${index}`} className="pokecard-full__general-info__type-container--type" style={{background: eval(`styles.gradient_${input}`), border: `2px solid ${textColor(type)}`}}>
                {input}
            </div>
        );
    };

    //function for getting JSX div list of ability names
    const abilityListText = (input, type) => {
        let abilities = [];

        for (let i = 0; i < input.length; i++) {
            abilities.push(input[i].ability.name);
        };

        return abilities.map((input, index) => 
            <div key={`pk-ability-text-${index}`} className="pokecard-full__general-info__ability-container--ability" style={{background: getContrastBg(type), border: `2px solid ${textColor(type)}`}}>
                {input}
            </div>
        );
    };

    //functions for click events toggling display for full pokemon cards
    function openFullDisplay(e) {
        document.getElementById(`full-display-${e.target.id}`).style.display = "flex";
        document.getElementById(`display-${e.target.id}`).style.display = "block";
    };
    function closeFullDisplay(e) { //need to target id='display-pk-{pokemon.data.id}, id='full-display-pk-{pokemon.data.id}'
        document.getElementById(`full-${e.target.id}`).style.display = "none";
        document.getElementById(`${e.target.id}`).style.display = "none";
    };
    function closeDisplayViaX(e) {
        document.getElementById(`full-${e.target.id.slice(6)}`).style.display = "none";
        document.getElementById(`${e.target.id.slice(6)}`).style.display = "none";
    };

    //function for creating all ui cards by looping through prop data passed from App.js
    const allCards = props.entries.map((el, value) => {

        // let typeName = el.data.types[0].type.name; //shortcut for arguments

        //NOTE 20/11/20 ::: make a color for normal type so when the full display for a normal pokemon pops up it isn't transparent!

        return (
            <article className="pokemon" key={`pokemon-entry-${value}`}>

                <PokeCardMini 
                    pokemon={el}
                    pokemonIndex={value}
                    styles={styles}
                    textColor={textColor}
                    typeListIcons={typeListIcons}
                    openFullDisplay={openFullDisplay}
                />

                <section 
                    key={`pokemon-full-${value}-blur`}
                    className="full-card-blur"
                    id={`display-pk-${el.data.id}`}
                    onClick={closeFullDisplay}>
                </section>

                <PokeCardFull 
                    pokemon={el}
                    pokemonIndex={value}
                    styles={styles}
                    textColor={textColor}
                    getContrastBg={getContrastBg}
                    typeListText={typeListText}
                    abilityListText={abilityListText}
                    closeFullDisplay={closeDisplayViaX} //special function for closing full display specifically with X button
                />

            </article>
        );
    });

    return(
        <div className='main-display'>
            {allCards}
        </div>
    );
};

export default PokeCard;