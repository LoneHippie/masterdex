import React from 'react';
import pokeapi from '../api/pokeapi';
import SearchSuggestions from './SearchSuggestions';

import '../styles/_searchbar.scss';

class SearchBar extends React.Component {

    state = {term: '', pokeList: [], isFocused: 'none'};

    getAllEntries = async() => {
        const pokeEntries = await pokeapi.get('/pokemon?limit=893');

        let allPokeEntries = pokeEntries.data.results;

        this.setState({pokeList: allPokeEntries});
    };

    componentDidMount() {
        this.getAllEntries();
        window.addEventListener('click', this.handleWindowClick);
    };

    onFormSubmit = (event) => {
        event.preventDefault();
        
        this.props.onSubmit(this.state.term);
    };

    handleWindowClick = (e) => {
        if (e.target.className !== 'search-input' && e.target.className !== 'suggestions-span') {
            this.setState({isFocused: 'none'});
        };
    };

    render() {
        return(
            <nav className="searchbar">
                <form onSubmit={this.onFormSubmit} className="searchbar__form" autoComplete="off">
                    <div className="searchbar__form--field">
                        <label>Pokemon Search</label>
                        <input
                            className="search-input"
                            type="text"
                            spellCheck="false"
                            placeholder="pokemon name or type"
                            onChange={(e) => {
                                let value = e.target.value
                                value = value.replace(/[^A-Za-z]/ig, '').toLowerCase()
                                this.setState({term: value})
                            }}
                            onFocus={() => this.setState({isFocused: 'block'})}
                            value={this.state.term}
                            id="search-input"
                        />
                        <SearchSuggestions
                            query={this.state.term}
                            clickFill={(e) => this.setState({term: e.target.innerHTML})}
                            entries={this.state.pokeList}
                            isFocused={this.state.isFocused}
                        />
                    </div>
                    <button className="searchbar__form--btn">Search</button>
                </form>
            </nav>
        );
    };
};

export default SearchBar;