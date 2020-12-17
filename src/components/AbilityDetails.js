import React from 'react';

const AbilityDetails = (props) => {

    const { ability, abilityDetails, renderDetails, pokemonIndex, getContrastBg, textColor, typeName } = props;

    const getEffectEntry = (input) => {
        for (let i = 0; i <= input.length; i++) {
            if (abilityDetails.effect_entries[i].language.name === 'en') {
                return <div className="pokecard-full__general-info__ability-container__details--effect" key={`ability-effect-${pokemonIndex}`}>{abilityDetails.effect_entries[i].effect}</div>
            };
        };
    };

    if (renderDetails === true && abilityDetails !== undefined) {
        return (
            <div
                className="pokecard-full__general-info__ability-container__details"
                id={`details-ability-${ability}-${pokemonIndex}`}
                style={{background: getContrastBg(typeName), color: textColor(typeName)}}
            >
                <div className="pokecard-full__general-info__ability-container__details--title" style={{background: textColor(typeName), color: getContrastBg(typeName)}}>{ability}</div>
                {getEffectEntry(abilityDetails.effect_entries)}
            </div>
        );
    } else {
        return (
            <div className="pokecard-full__general-info__ability-container__details" id={`details-ability-${ability}-${pokemonIndex}`} style={{background: getContrastBg(typeName), color: textColor(typeName)}}>
                <span className="pokecard-full__general-info__ability-container__details--loading">Loading...</span>
            </div>
        );
    };
};

export default AbilityDetails;