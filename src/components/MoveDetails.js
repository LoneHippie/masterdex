import React from 'react';

import '../styles/_move-details.scss';

const MoveDetails = (props) => {

    const { move, moveDetails, renderDetails, movesJSON, pokemonIndex, PP, genIndex, styles, textColor, getContrastBg, typeName } = props;
    //id that can be used to get the right index of movesJSON for that info
    let id = parseInt(move.move.url.slice(31).slice(0, -1), 10);

    //this conditional render shows a loading screen until the api returns and can be used
    if (renderDetails === true && moveDetails !== undefined) {
        return (
            <div className="move-details" id={`desc-move-${move.move.name}-${pokemonIndex}`} style={{background: getContrastBg(typeName), color: textColor(typeName)}}>

                <div className="move-details__title">
                    <span className="move-details__title--name">{move.move.name}</span>
                    <span className="move-details__title--id">#{id}</span>
                </div>

                <div className="move-details__mq-wrapper">
                    <div className="move-details__stats">
                        <div className="move-details__stats--category">
                            Category: {moveDetails.damage_class.name}
                        </div>
                        <div className="move-details__stats--power">
                            Power: {moveDetails.power !== null ? moveDetails.power : 'N/A'}
                        </div>
                        <div className="move-details__stats--accuracy">
                            Accuracy: {moveDetails.accuracy !== null ? moveDetails.accuracy : 'N/A'}
                        </div>
                        <div className="move-details__stats--pp">
                            PP: {moveDetails.pp}
                        </div>
                    </div>
                    
                    <span className="move-details--desc-title">Effect</span>
                    <div className="move-details--desc">
                        {moveDetails.effect_entries[0].effect.replace(/\$effect_chance%/g, `${moveDetails.effect_chance}%`)}
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="move-details" id={`desc-move-${move.move.name}-${pokemonIndex}`} style={{background: getContrastBg(typeName), color: textColor(typeName)}}>
                <span className="move-details--loading">Loading...</span>
            </div>
        )
    }
};

export default MoveDetails;