import React from 'react';
import '../styles/_loaderButton.scss';

const LoaderButtons = (props) => {

    return(
        <div className="loader-button-container">
            <div 
                className="loader-button-container__btn"
                onClick={props.loadNext}
                style={{display: `${props.limit === 893 ? 'none' : 'block'}`}}>
                    Show more
            </div>
            <div 
                className="loader-button-container__btn"
                onClick={props.loadAll}
                style={{display: `${props.limit === 893 ? 'none' : 'block'}`}}>
                    Load all
            </div>
        </div>
    );
};

export default LoaderButtons;