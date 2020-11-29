import React from 'react';
import '../styles/_suggestions.scss';

const SearchSuggestions = (props) => {

    const suggestions = props.entries.filter(el => el.name.includes(props.query));

    const suggestionsList = suggestions.map((el, value) => {
        if (props.query !== '') {
            return (
                <li key={value} className="suggestions__item">
                    <span className="suggestions-span" onClick={props.clickFill}>{el.name}</span>
                </li>
            );
        }
    });

    return (
        <ul className="suggestions" style={{display: props.isFocused}} id="suggestions-ul">
            {suggestionsList}
        </ul>
    );
};

export default SearchSuggestions;