import React from 'react';
import pokeapi from '../api/pokeapi';

import SearchBar from './SearchBar';
import PokeCard from './PokeCard';
import LoaderButtons from './LoaderButtons';

class App extends React.Component {

    state = { pokeData: [], pokeList: [], pokeLimit: 47, updateCount: 0 };

    //use this.state.pokeLimit to limit how many API calls are made. A button below the main-display grid will give the option after scrolling to the bottom to load the next 100 

    populatePokeList = async(limit) => {
        //empty array to loop over els for API calls
        let emptyArr = [];
        //filling array with every number needed for API calls: currently 893 pokemon
        for (let i = 1; i <= limit; i++) {
            emptyArr.push(i);
        };
        //loop through emptyArr to numerically call data for each pokemon in order and push into pokeList state
        for (const el of emptyArr) {
            const pokemon = await pokeapi.get(`/pokemon/${el}`);
            this.setState((prevState) => {
                return prevState.pokeList.push(pokemon);
            });
        }
    };

    componentDidMount() {
        //generating state for all pokemon API fetches
        this.populatePokeList(this.state.pokeLimit);
    };

    componentDidUpdate() {
        if (this.state.pokeList.length === this.state.pokeLimit) {
            console.log('All current pokemon entries rendered');
            console.log(`Current entries in mounted component: ${this.state.pokeList.length}`);
        };
    };

    onSearchSubmit = async (term) => {
        const response = await pokeapi.get(`/pokemon/${term}`, {
            params: { query: term }
        });

        this.setState({pokeData: response});

        console.log(response);
    };

    loadMorePokemon = async () => { //NOTE::: pokeLimit and any hardcoded number in this function will need to be updated manually
        //empty array to loop over els for API calls
        let emptyArr = [];

        //filling array with every number needed for API calls: currently 893 pokemon
        for (let i = this.state.pokeLimit + 1; i <= this.state.pokeLimit + 47; i++) {
            emptyArr.push(i);
        };

        //updating pokeLimit for incrimental/repeat usage
        this.setState((prevState) => {
            return prevState.pokeLimit += 47;
        });

        //loop through emptyArr to numerically call data for each pokemon in order and push into pokeList state
        for (const el of emptyArr) {
            const pokemon = await pokeapi.get(`/pokemon/${el}`);
            this.setState((prevState) => {
                return prevState.pokeList.push(pokemon);
            });
        };
    };

    loadAllPokemon = async () => {
        //empty array to loop over els for API calls
        let emptyArr = [];

        //filling array with every number needed for API calls: currently 893 pokemon
        for (let i = this.state.pokeLimit; i <= 893; i++) {
            emptyArr.push(i);
        };

        this.setState({pokeLimit: 893});

        //loop through emptyArr to numerically call data for each pokemon in order and push into pokeList state
        for (const el of emptyArr) {
            const pokemon = await pokeapi.get(`/pokemon/${el}`);
            this.setState((prevState) => {
                return prevState.pokeList.push(pokemon);
            });
        };
    };

    render() {
        return(
            <main>
                <SearchBar
                    onSubmit={this.onSearchSubmit}
                />
                <PokeCard
                    entries={this.state.pokeList} //all pokemon api data
                />
                <LoaderButtons 
                    limit={this.state.pokeLimit}
                    loadNext={this.loadMorePokemon}
                    loadAll={this.loadAllPokemon}
                />
            </main>
        ) 
    }
};

export default App;