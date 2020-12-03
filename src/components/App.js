import React from 'react';
import pokeapi from '../api/pokeapi';

import Welcome from './Welcome';
import SearchBar from './SearchBar';
import PokeCard from './PokeCard';
import LoaderButtons from './LoaderButtons';

class App extends React.Component {

    state = { pokeData: [], moves: this.props.moveData, pokeLimit: 25, currentList: null, listMode: 'default' };

    //NOTE 30/11/20 ::: Look into getting info on the pokemon's initial generation and other details by making calls to v2/pokemon-species/{id}, all the ids/numbers for these calls match the pokemon id numbers from standard calls
    //NOTE 30/11/20 ::: Make another select/option button next to the toggle switch in full display to select a generation. First option should always be the first gen the entry appears in and it should change the info for moves and flavor text (when added later)
    //NOTE 30/11/20 ::: Maybe add a star next to stats that are maxed on the bar to indicate that this pokemon has the highest possible of given stat
    //NOTE 1/12/20 ::: Look into finding a better solution for stoping API for loop calls when another search is made. Currently it kind of works but it's not perfect
    //NOTE 1/12/20 ::: Figure out how to remove the first pokecard in the list from the DOM/view when doing a new search while another loop is going to get rid of the extra element

    componentDidMount() {
        // console.log(this.state.moves);
        // console.log(this.state.moves[78].type_id);
        //generating state for all pokemon API fetches
        this.populatePokeData(this.state.pokeLimit);
    };

    populatePokeData = async(limit) => {
        let emptyArr = [];

        for (let i = 1; i <= limit; i++) {
            emptyArr.push(i);
        };

        try { 
            for (const el of emptyArr) {
                if (this.state.listMode !== 'default') { break; };
                const pokemon = await pokeapi.get(`/pokemon/${el}`);
                const species = await pokeapi.get(`/pokemon-species/${el}`);
                this.setState((prevState => {
                    return prevState.pokeData.push({...species.data, ...pokemon.data});
                }));
            }
        } catch (error) {
            console.log('Error return from populatePokeData');
            console.log(error);
        }
    };

    loadMorePokemon = async () => { //NOTE::: pokeLimit and any hardcoded number in this function will need to be updated manually
        if (this.state.listMode !== 'default') { //refresh list
            this.setState({listMode: 'default'});
            this.setState({pokeData: []});
            this.populatePokeData(this.state.pokeLimit);
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
            try {
                for (const el of emptyArr) {
                    if (this.state.listMode !== 'default') { break; };

                    const pokemon = await pokeapi.get(`/pokemon/${el}`);
                    const species = await pokeapi.get(`/pokemon-species/${el}`);

                    if (pokemon.data.id !== 808 && pokemon.data.id !== 809) {
                        this.setState((prevState => {
                            return prevState.pokeData.push({...species.data, ...pokemon.data});
                        }));
                    };
                };
            } catch(error) {
                console.log('Error return from App.js loadMorePokemon:');
                console.log(error);
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
        this.setState({listMode: 'default'});

        //loop through emptyArr to numerically call data for each pokemon in order and push into pokeList state
        try {
            for (const el of emptyArr) {
                const pokemon = await pokeapi.get(`/pokemon/${el}`);
                const species = await pokeapi.get(`/pokemon-species/${el}`);

                if (pokemon.data.id !== 808 && pokemon.data.id !== 809) {
                    this.setState((prevState => {
                        return prevState.pokeData.push({...species.data, ...pokemon.data});
                    }));
                };
            };
        } catch(error) {
            console.log('Error return from App.js loadAllPokemon:');
            console.log(error);
        };
    };

    onSearchSubmit = async (term) => {
        //clear currently rendered entries from screen/DOM
        document.getElementById('pokemon-gen-point').innerHTML = '';

        try {
            if (term === 'fire' || term === 'normal' || term === 'grass' || term === 'water' || term === 'fighting' || term === 'flying' || term === 'poison' || term === 'ground' || term === 'rock' || term === 'bug' || term === 'ghost' || term === 'electric' || term === 'psychic' || term === 'ice' || term === 'dragon' || term === 'dark' || term === 'steel' || term === 'fairy') { //check to see if term is a type string
                this.setState({listMode: 'type'}); //set list mode to type for checking in other components
                this.setState({pokeData: []});

                const response = await pokeapi.get(`/type/${term}`, {
                    params: { query: term }
                });

                for (let i = 0; i <= response.data.pokemon.length; i++) {
                    if (this.state.listMode !== 'type') {
                        break;
                    };
                    const pokemon = await pokeapi.get(`/pokemon/${response.data.pokemon[i].pokemon.url.slice(34).slice(0, -1)}`);
                    const species = await pokeapi.get(`/pokemon-species/${response.data.pokemon[i].pokemon.url.slice(34).slice(0, -1)}`);
                    //break condition in case max id is reached
                    if (pokemon.data.id >= 893) {
                        console.log(`All ${term} pokemon entries rendered`);
                        console.log(`Current entries in mounted component: ${this.state.pokeData.length}`);
                        
                        break; 
                    };

                    //pokemon id 808 and 809 are currently broken and have empty stat arrays
                    if (pokemon.data.id !== 808 && pokemon.data.id !== 809) {
                        this.setState((prevState => {
                            return prevState.pokeData.push({...species.data, ...pokemon.data});
                        }));
                    };
                };

            } else { //normal single return search
                const pokemon = await pokeapi.get(`/pokemon/${term}`, {
                    params: { query: term }
                });
                const species = await pokeapi.get(`/pokemon-species/${term}`, {
                    params: { query: term }
                });

                if (term === '') { //refresh
                    if (this.state.listMode !== 'default' && this.state.pokeData.length !== this.state.pokeLimit) {
                        this.setState({listMode: 'default'});
                        this.setState({pokeData: []});
                        this.populatePokeData(this.state.pokeLimit);
                    }
                } else {
                    this.setState({listMode: 'search'});
                    this.setState({pokeData: []});
                    this.setState((prevState => {
                        return prevState.pokeData.push({...species.data, ...pokemon.data});
                    }));
                };
            }
        } catch(error) {
            console.log('Error return from App.js onSearchSubmit:');
            console.log(error);
        };
    };

    loadGen = async(gen) => {
        //clear currently rendered entries from screen/DOM
        document.getElementById('pokemon-gen-point').innerHTML = '';

        try {
            //change listmode to gen if it's not already selected previously
            if (this.state.listMode !== 'gen') {
                this.setState({listMode: 'gen'});
            };
    
            //reset pokeData list
            this.setState({pokeData: []});
    
            const response = await pokeapi.get(`/generation/${gen}`); //returns array with pokemon_species property containing all names and urls for generation

            //loop through all returned ids (sliced to extract ID instead of name, which sometimes doesn't match API call name)
            for (let i = 0; i < response.data.pokemon_species.length; i++) {
                if (this.state.listMode !== 'gen') { break; }

                const pokemon = await pokeapi.get(`/pokemon/${response.data.pokemon_species[i].url.slice(42).slice(0, -1)}`);
                const species = await pokeapi.get(`/pokemon-species/${response.data.pokemon_species[i].url.slice(42).slice(0, -1)}`);

                if (pokemon.data.id >= 893) { //break condition to avoid getting "extra" pk (megas, etc)
                    console.log(`All gen ${gen} pokemon entries rendered`);
                    console.log(`Current pokemon in mounted component: ${this.state.pokeData.length}`);
                    
                    break; 
                };
    
                //condition for pushing API returns into both species and poke lists
                if (pokemon.data.id !== 808 && pokemon.data.id !== 809) {
                    this.setState((prevState) => {
                        return prevState.pokeData.push({...species.data, ...pokemon.data});
                    });
                };
            };

        } catch (error) {
            console.log('Error return from App.js loadGen:');
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
                    pokeData={this.state.pokeData}
                    moveData={this.state.moves}
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