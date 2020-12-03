import React from 'react';
import '../styles/_loaderButton.scss';

const LoaderButtons = (props) => {

    return(
        <div className="loader-button-container">
            <div 
                className="loader-button-container__btn"
                onClick={props.loadNext}
                style={{display: `${props.limit === 893 || props.listMode !== 'default' ? 'none' : 'block'}`}}>
                    {props.listMode !== 'default' ? 'Back' : 'Show More'}
            </div>
            <div 
                className="loader-button-container__btn"
                onClick={props.loadAll}
                style={{display: `${props.limit === 893 || props.listMode !== 'default' ? 'none' : 'block'}`}}>
                    Load all
            </div>
            <div className="loader-button-container__custom-select">
                <select onChange={(e) => props.loadGen(e.target.value)} className="loader-button-container__custom-select--gens">
                    <option value="0" disabled selected>GEN</option>
                    <option value="1">Gen 1</option>
                    <option value="2">Gen 2</option>
                    <option value="3">Gen 3</option>
                    <option value="4">Gen 4</option>
                    <option value="5">Gen 5</option>
                    <option value="6">Gen 6</option>
                    <option value="7">Gen 7</option>
                    <option value="8">Gen 8</option>
                </select>
            </div>
        </div>
    );
};

export default LoaderButtons;