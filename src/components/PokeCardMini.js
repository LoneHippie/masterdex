import React from 'react';
import '../styles/_pokecard.scss';

const PokeCardMini = (props) => {

    const { pokemon, pokemonIndex, styles, textColor, typeListIcons, openFullDisplay } = props;

    let typeName = pokemon.data.types[0].type.name;

    return (
        <section key={`pokemon-mini-${pokemonIndex}`} className="main-display__pokecard" style={{background: eval(`styles.gradient_${typeName}`)}} onClick={openFullDisplay}>

            <div className="main-display__pokecard__info" key={`pk-info-display-${pokemonIndex}`}>
                <div key={`pk-types-${pokemonIndex}`} className="main-display__pokecard__info--types">
                    {typeListIcons(pokemon.data.types)}
                </div>
                <div className="main-display__pokecard__info--number" key={`pk-id-${pokemonIndex}`} style={{color: textColor(typeName)}}>
                    {`#${pokemon.data.id}`}
                </div>
            </div>

            <img
                key={`pk-sprite-${pokemonIndex}`}
                src={pokemon.data.sprites.front_default}
                alt={`sprite for ${pokemon.data.name}`}
                className="main-display__pokecard--sprite"
                style={{filter: `drop-shadow(1.5px 3px 3px #2F4F4F`}}
            />

            <div className="main-display__pokecard--name" key={`pk-name-${pokemonIndex}`} style={{color: textColor(typeName)}}>
                {pokemon.data.name}
            </div>

            <div
                key={`pokemon-selector-${pokemon.data.id}`}
                id={`pk-${pokemon.data.id}`}
                className="pokecard--mask">
            </div>

        </section>
    );

};

export default PokeCardMini;