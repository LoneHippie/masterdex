import React from 'react';
import pokeapi from '../api/pokeapi';
import SearchSuggestions from './SearchSuggestions';

import '../styles/_searchbar.scss';

class SearchBar extends React.Component {

    state = {term: '', pokeList: []};

    getAllEntries = async() => {
        const pokeEntries = await pokeapi.get('/pokemon?limit=2000');

        let allPokeEntries = pokeEntries.data.results;

        this.setState({pokeList: allPokeEntries});
    };

    componentDidMount() {
        this.getAllEntries();
    };

    onFormSubmit = (event) => {
        event.preventDefault();
        
        this.props.onSubmit(this.state.term);
    };
    
    render() {
        return(
            <nav className="searchbar">
                <form onSubmit={this.onFormSubmit} className="searchbar__form">
                    <div className="searchbar__form--field">
                        <label>Pokemon Search</label>
                        <input
                            type="text"
                            spellCheck="false"
                            onChange={(e) => this.setState({term: e.target.value})}
                            value={this.state.term}
                        />
                        <SearchSuggestions query={this.state.term} entries={this.state.pokeList}/>
                    </div>
                </form>
            </nav>
        )
    }
};

export default SearchBar;