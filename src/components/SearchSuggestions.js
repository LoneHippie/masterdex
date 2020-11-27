import React from 'react';
import '../styles/_suggestions.scss';

const SearchSuggestions = (props) => {

    const testLog = (e) => {
        console.log(e.target.innerHTML);
    }

    const suggestions = props.entries.filter(el => el.name.includes(props.query));

    const suggestionsList = suggestions.map((el, value) => {
        if (props.query !== '') {
            return (
                <li key={value} className="suggestions__item">
                    <span onClick={testLog}>{el.name}</span>
                </li>
            )
        }
    });

    return (
        <ul className="suggestions">
            {suggestionsList}
        </ul>
    );
};

export default SearchSuggestions;