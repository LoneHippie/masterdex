import React from 'react';
import pokeapi from '../api/pokeapi';

import Welcome from './Welcome';
import SearchBar from './SearchBar';
import PokeCard from './PokeCard';
import LoaderButtons from './LoaderButtons';

class App extends React.Component {

    state = { pokeList: [], pokeLimit: 25, currentList: null, listMode: 'default' };

    //NOTE 29/11/20 ::: Make full display for instructions/welcome on initial loads. Explain how the search works, that you can click/tap (depending on user screen size) on any pokemon to see a full display of detailed info. Have it also explain that currently ability and move info for all gen 8 pokemon is missing.

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
        if (this.state.listMode === 'default' && this.state.pokeList.length === this.state.pokeLimit) {
            console.log('All current pokemon entries rendered');
            console.log(`Current entries in mounted component: ${this.state.pokeList.length}`);
        };
    };

    onSearchSubmit = async (term) => {
        try {
            if (term === 'fire' || term === 'normal' || term === 'grass' || term === 'water' || term === 'fighting' || term === 'flying' || term === 'poison' || term === 'ground' || term === 'rock' || term === 'bug' || term === 'ghost' || term === 'electric' || term === 'psychic' || term === 'ice' || term === 'dragon' || term === 'dark' || term === 'steel' || term === 'fairy') { //check to see if term is a type string
                this.setState({listMode: 'type'}); //set list mode to type for checking in other components
                this.setState({pokeList: []}); //reset list

                const response = await pokeapi.get(`/type/${term}`, {
                    params: { query: term }
                });

                for (let i = 0; i <= response.data.pokemon.length; i++) {
                    const pokemon = await pokeapi.get(`/pokemon/${response.data.pokemon[i].pokemon.url.slice(34).slice(0, -1)}`);
                    //break condition in case max id is reached
                    if (pokemon.data.id >= 893) {
                        console.log(`All ${term} pokemon entries rendered`);
                        console.log(`Current entries in mounted component: ${this.state.pokeList.length}`);
                        break; 
                    };

                    //pokemon id 808 and 809 are currently broken and have empty stat arrays
                    if (pokemon.data.id !== 808 && pokemon.data.id !== 809) {
                        this.setState((prevState) => {
                            return prevState.pokeList.push(pokemon);
                        });
                    };
                };

            } else { //normal single return search
                const response = await pokeapi.get(`/pokemon/${term}`, {
                    params: { query: term }
                });

                if (term === '') { //refresh
                    if (this.state.listMode !== 'default' && this.state.pokeList.length !== this.state.pokeLimit) {
                        this.setState({listMode: 'default'});
                        this.setState({pokeList: []});
                        this.populatePokeList(this.state.pokeLimit);
                    }
                } else {
                    this.setState({listMode: 'search'});
                    this.setState({pokeList: []});
                    this.setState((prevState) => {
                        return prevState.pokeList.push(response);
                    });
                };
            }
        } catch(error) {
            console.log(error);
        };
    };

    loadMorePokemon = async () => { //NOTE::: pokeLimit and any hardcoded number in this function will need to be updated manually
        if (this.state.listMode !== 'default') { //refresh list
            this.setState({listMode: 'default'});
            this.setState({pokeList: []});
            this.populatePokeList(this.state.pokeLimit);
        } else { //load more like usual
            //empty array to loop over els for API calls
            let emptyArr = [];

            //filling array with every number needed for API calls: currently 893 pokemon
            for (let i = this.state.pokeLimit + 1; i <= this.state.pokeLimit + 25; i++) {
                emptyArr.push(i);
            };

            //updating pokeLimit for incrimental/repeat usage
            this.setState((prevState) => {
                return prevState.pokeLimit += 25;
            });

            //loop through emptyArr to numerically call data for each pokemon in order and push into pokeList state
            for (const el of emptyArr) {
                const pokemon = await pokeapi.get(`/pokemon/${el}`);
                if (pokemon.data.id !== 808 && pokemon.data.id !== 809) {
                    this.setState((prevState) => {
                        return prevState.pokeList.push(pokemon);
                    });
                } 
            };
        }
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
            if (pokemon.data.id !== 808 && pokemon.data.id !== 809) {
                this.setState((prevState) => {
                    return prevState.pokeList.push(pokemon);
                });
            };
        };
    };

    loadGen = async(gen) => {
        try {
            if (this.state.listMode !== 'gen') {
                this.setState({listMode: 'gen'});
            };
    
            this.setState({pokeList: []});
    
            const response = await pokeapi.get(`/generation/${gen}`); 

            for (let i = 0; i < response.data.pokemon_species.length; i++) {
                const pokemon = await pokeapi.get(`/pokemon/${response.data.pokemon_species[i].url.slice(42).slice(0, -1)}`);
                if (pokemon.data.id >= 893) {
                    console.log(`All gen ${gen} pokemon entries rendered`);
                    console.log(`Current entries in mounted component: ${this.state.pokeList.length}`);
                    break; 
                };
    
                if (pokemon.data.id !== 808 && pokemon.data.id !== 809) {
                    this.setState((prevState) => {
                        return prevState.pokeList.push(pokemon);
                    });
                };
            };

        } catch (error) {
            console.log(error);
        };
    };

    render() {
        return(
            <main>
                <SearchBar
                    onSubmit={this.onSearchSubmit}
                />
                <Welcome />
                <PokeCard
                    entries={this.state.pokeList} //all pokemon api data
                />
                <LoaderButtons 
                    limit={this.state.pokeLimit}
                    loadNext={this.loadMorePokemon}
                    loadAll={this.loadAllPokemon}
                    listMode={this.state.listMode}
                    loadGen={this.loadGen}
                />
            </main>
        ) 
    }
};

export default App;