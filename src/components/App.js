import React from 'react';
import pokeapi from '../api/pokeapi';

import Welcome from './Welcome';
import SearchBar from './SearchBar';
import PokeCard from './PokeCard';
import LoaderButtons from './LoaderButtons';

class App extends React.Component {

    state = {
        pokeData: [],
        moves: this.props.moveData,
        pokeLimit: 25,
        currentList: null,
        listMode: 'default',
        typeSearch: 'none',
        genSearch: 'none'
    };

    //NOTE 30/11/20 ::: Maybe add a star next to stats that are maxed on the bar to indicate that this pokemon has the highest possible of given stat
    //NOTE 1/12/20 ::: Figure out how to remove the first pokecard in the list from the DOM/view when doing a new search while another loop is going to get rid of the extra element <<<<<
    //NOTE 5/12/20 ::: Think of adding a new button in place of load all to load 10-25 pokemon at a time by stats (attack will get top 10 pokemon with highest attack, def with top 10 def, so on)
    //NOTE 5/12/20 ::: Made seperate async functions for each instance of generating pokeData for gen and type, working GREAT now


    componentDidMount() {
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
            };
        } catch (error) {
            console.log('Error return from populatePokeData');
            console.log(error);
        };
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

////////// FUNCTIONS FOR TYPE //////////
    
    searchByType = async (term) => {
        switch(true) {
            case term === 'fire':
                this.getTypeFire(term);
                break;
            case term === 'normal':
                this.getTypeNormal(term); 
                break;
            case term === 'grass':
                this.getTypeGrass(term);
                break;
            case term === 'water':
                this.getTypeWater(term);
                break;
            case term === 'fighting':
                this.getTypeFighting(term);
                break;
            case term === 'flying':
                this.getTypeFlying(term);
                break;
            case term === 'poison':
                this.getTypePoison(term);
                break;
            case term === 'ground':
                this.getTypeGround(term);
                break;
            case term === 'rock':
                this.getTypeRock(term);
                break;
            case term === 'bug':
                this.getTypeBug(term);
                break;
            case term === 'ghost':
                this.getTypeGhost(term);
                break;
            case term === 'electric':
                this.getTypeElectric(term);
                break;
            case term === 'psychic':
                this.getTypePsychic(term);
                break;
            case term === 'ice':
                this.getTypeIce(term); 
                break;
            case term === 'dragon':
                this.getTypeDragon(term);
                break;
            case term === 'dark':
                this.getTypeDark(term);
                break;
            case term === 'steel':
                this.getTypeSteel(term);
                break;
            case term === 'fairy':
                this.getTypeFairy(term);
                break;
            default:
                return;
        }
    };

    getTypeFire = async(type) => {

        this.setState({listMode: 'type'});
        this.setState({pokeData: []});
        this.setState({typeSearch: type});

        const response = await pokeapi.get(`/type/${type}`);

        for (let i = 0; i <= response.data.pokemon.length; i++) {
            if (this.state.listMode !== 'type') { break; };
            if (this.state.typeSearch !== type) { break; };

            const pokemon = await pokeapi.get(`/pokemon/${response.data.pokemon[i].pokemon.url.slice(34).slice(0, -1)}`);
            const species = await pokeapi.get(`/pokemon-species/${response.data.pokemon[i].pokemon.url.slice(34).slice(0, -1)}`);
            //break condition in case max id is reached
            if (pokemon.data.id >= 893) {
                console.log(`All ${type} pokemon entries rendered`);
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
    }

    getTypeNormal = async(type) => {

        this.setState({listMode: 'type'});
        this.setState({pokeData: []});
        this.setState({typeSearch: type});

        const response = await pokeapi.get(`/type/normal`);

        for (let i = 0; i <= response.data.pokemon.length; i++) {
            if (this.state.listMode !== 'type') { break; };
            if (this.state.typeSearch !== type) { break; };

            const pokemon = await pokeapi.get(`/pokemon/${response.data.pokemon[i].pokemon.url.slice(34).slice(0, -1)}`);
            const species = await pokeapi.get(`/pokemon-species/${response.data.pokemon[i].pokemon.url.slice(34).slice(0, -1)}`);
            //break condition in case max id is reached
            if (pokemon.data.id >= 893) {
                console.log(`All ${type} pokemon entries rendered`);
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
    }

    getTypeGrass = async(type) => {
        this.setState({listMode: 'type'});
        this.setState({pokeData: []});
        this.setState({typeSearch: type});

        const response = await pokeapi.get(`/type/${type}`);

        for (let i = 0; i <= response.data.pokemon.length; i++) {
            if (this.state.listMode !== 'type') { break; };
            if (this.state.typeSearch !== type) { break; };
            
            const pokemon = await pokeapi.get(`/pokemon/${response.data.pokemon[i].pokemon.url.slice(34).slice(0, -1)}`);
            const species = await pokeapi.get(`/pokemon-species/${response.data.pokemon[i].pokemon.url.slice(34).slice(0, -1)}`);
            //break condition in case max id is reached
            if (pokemon.data.id >= 893) {
                console.log(`All ${type} pokemon entries rendered`);
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
    }

    getTypeWater = async(type) => {
        this.setState({listMode: 'type'});
        this.setState({pokeData: []});
        this.setState({typeSearch: type});

        const response = await pokeapi.get(`/type/${type}`);

        for (let i = 0; i <= response.data.pokemon.length; i++) {
            if (this.state.listMode !== 'type') { break; };
            if (this.state.typeSearch !== type) { break; };
            
            const pokemon = await pokeapi.get(`/pokemon/${response.data.pokemon[i].pokemon.url.slice(34).slice(0, -1)}`);
            const species = await pokeapi.get(`/pokemon-species/${response.data.pokemon[i].pokemon.url.slice(34).slice(0, -1)}`);
            //break condition in case max id is reached
            if (pokemon.data.id >= 893) {
                console.log(`All ${type} pokemon entries rendered`);
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
    }

    getTypeFighting = async(type) => {
        this.setState({listMode: 'type'});
        this.setState({pokeData: []});
        this.setState({typeSearch: type});

        const response = await pokeapi.get(`/type/${type}`);

        for (let i = 0; i <= response.data.pokemon.length; i++) {
            if (this.state.listMode !== 'type') { break; };
            if (this.state.typeSearch !== type) { break; };
            
            const pokemon = await pokeapi.get(`/pokemon/${response.data.pokemon[i].pokemon.url.slice(34).slice(0, -1)}`);
            const species = await pokeapi.get(`/pokemon-species/${response.data.pokemon[i].pokemon.url.slice(34).slice(0, -1)}`);
            //break condition in case max id is reached
            if (pokemon.data.id >= 893) {
                console.log(`All ${type} pokemon entries rendered`);
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
    }

    getTypeFlying = async(type) => {
        this.setState({listMode: 'type'});
        this.setState({pokeData: []});
        this.setState({typeSearch: type});

        const response = await pokeapi.get(`/type/${type}`);

        for (let i = 0; i <= response.data.pokemon.length; i++) {
            if (this.state.listMode !== 'type') { break; };
            if (this.state.typeSearch !== type) { break; };
            
            const pokemon = await pokeapi.get(`/pokemon/${response.data.pokemon[i].pokemon.url.slice(34).slice(0, -1)}`);
            const species = await pokeapi.get(`/pokemon-species/${response.data.pokemon[i].pokemon.url.slice(34).slice(0, -1)}`);
            //break condition in case max id is reached
            if (pokemon.data.id >= 893) {
                console.log(`All ${type} pokemon entries rendered`);
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
    }

    getTypePoison = async(type) => {
        this.setState({listMode: 'type'});
        this.setState({pokeData: []});
        this.setState({typeSearch: type});

        const response = await pokeapi.get(`/type/${type}`);

        for (let i = 0; i <= response.data.pokemon.length; i++) {
            if (this.state.listMode !== 'type') { break; };
            if (this.state.typeSearch !== type) { break; };
            
            const pokemon = await pokeapi.get(`/pokemon/${response.data.pokemon[i].pokemon.url.slice(34).slice(0, -1)}`);
            const species = await pokeapi.get(`/pokemon-species/${response.data.pokemon[i].pokemon.url.slice(34).slice(0, -1)}`);
            //break condition in case max id is reached
            if (pokemon.data.id >= 893) {
                console.log(`All poison pokemon entries rendered`);
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
    }

    getTypeGround = async(type) => {
        this.setState({listMode: 'type'});
        this.setState({pokeData: []});
        this.setState({typeSearch: type});

        const response = await pokeapi.get(`/type/${type}`);

        for (let i = 0; i <= response.data.pokemon.length; i++) {
            if (this.state.listMode !== 'type') { break; };
            if (this.state.typeSearch !== type) { break; };
            
            const pokemon = await pokeapi.get(`/pokemon/${response.data.pokemon[i].pokemon.url.slice(34).slice(0, -1)}`);
            const species = await pokeapi.get(`/pokemon-species/${response.data.pokemon[i].pokemon.url.slice(34).slice(0, -1)}`);
            //break condition in case max id is reached
            if (pokemon.data.id >= 893) {
                console.log(`All ground pokemon entries rendered`);
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
    }

    getTypeRock = async(type) => {
        this.setState({listMode: 'type'});
        this.setState({pokeData: []});
        this.setState({typeSearch: type});

        const response = await pokeapi.get(`/type/${type}`);

        for (let i = 0; i <= response.data.pokemon.length; i++) {
            if (this.state.listMode !== 'type') { break; };
            if (this.state.typeSearch !== type) { break; };
            
            const pokemon = await pokeapi.get(`/pokemon/${response.data.pokemon[i].pokemon.url.slice(34).slice(0, -1)}`);
            const species = await pokeapi.get(`/pokemon-species/${response.data.pokemon[i].pokemon.url.slice(34).slice(0, -1)}`);
            //break condition in case max id is reached
            if (pokemon.data.id >= 893) {
                console.log(`All ${type} pokemon entries rendered`);
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
    }

    getTypeBug = async(type) => {
        this.setState({listMode: 'type'});
        this.setState({pokeData: []});
        this.setState({typeSearch: type});

        const response = await pokeapi.get(`/type/${type}`);

        for (let i = 0; i <= response.data.pokemon.length; i++) {
            if (this.state.listMode !== 'type') { break; };
            if (this.state.typeSearch !== type) { break; };
            
            const pokemon = await pokeapi.get(`/pokemon/${response.data.pokemon[i].pokemon.url.slice(34).slice(0, -1)}`);
            const species = await pokeapi.get(`/pokemon-species/${response.data.pokemon[i].pokemon.url.slice(34).slice(0, -1)}`);
            //break condition in case max id is reached
            if (pokemon.data.id >= 893) {
                console.log(`All ${type} pokemon entries rendered`);
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
    }

    getTypeGhost = async(type) => {
        this.setState({listMode: 'type'});
        this.setState({pokeData: []});
        this.setState({typeSearch: type});

        const response = await pokeapi.get(`/type/${type}`);

        for (let i = 0; i <= response.data.pokemon.length; i++) {
            if (this.state.listMode !== 'type') { break; };
            if (this.state.typeSearch !== type) { break; };
            
            const pokemon = await pokeapi.get(`/pokemon/${response.data.pokemon[i].pokemon.url.slice(34).slice(0, -1)}`);
            const species = await pokeapi.get(`/pokemon-species/${response.data.pokemon[i].pokemon.url.slice(34).slice(0, -1)}`);
            //break condition in case max id is reached
            if (pokemon.data.id >= 893) {
                console.log(`All ${type} pokemon entries rendered`);
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
    }

    getTypeElectric = async(type) => {
        this.setState({listMode: 'type'});
        this.setState({pokeData: []});
        this.setState({typeSearch: type});

        const response = await pokeapi.get(`/type/${type}`);

        for (let i = 0; i <= response.data.pokemon.length; i++) {
            if (this.state.listMode !== 'type') { break; };
            if (this.state.typeSearch !== type) { break; };
            
            const pokemon = await pokeapi.get(`/pokemon/${response.data.pokemon[i].pokemon.url.slice(34).slice(0, -1)}`);
            const species = await pokeapi.get(`/pokemon-species/${response.data.pokemon[i].pokemon.url.slice(34).slice(0, -1)}`);
            //break condition in case max id is reached
            if (pokemon.data.id >= 893) {
                console.log(`All ${type} pokemon entries rendered`);
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
    }

    getTypePsychic = async(type) => {
        this.setState({listMode: 'type'});
        this.setState({pokeData: []});
        this.setState({typeSearch: type});

        const response = await pokeapi.get(`/type/${type}`);

        for (let i = 0; i <= response.data.pokemon.length; i++) {
            if (this.state.listMode !== 'type') { break; };
            if (this.state.typeSearch !== type) { break; };
            
            const pokemon = await pokeapi.get(`/pokemon/${response.data.pokemon[i].pokemon.url.slice(34).slice(0, -1)}`);
            const species = await pokeapi.get(`/pokemon-species/${response.data.pokemon[i].pokemon.url.slice(34).slice(0, -1)}`);
            //break condition in case max id is reached
            if (pokemon.data.id >= 893) {
                console.log(`All ${type} pokemon entries rendered`);
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
    }

    getTypeIce = async(type) => {
        this.setState({listMode: 'type'});
        this.setState({pokeData: []});
        this.setState({typeSearch: type});

        const response = await pokeapi.get(`/type/${type}`);

        for (let i = 0; i <= response.data.pokemon.length; i++) {
            if (this.state.listMode !== 'type') { break; };
            if (this.state.typeSearch !== type) { break; };
            
            const pokemon = await pokeapi.get(`/pokemon/${response.data.pokemon[i].pokemon.url.slice(34).slice(0, -1)}`);
            const species = await pokeapi.get(`/pokemon-species/${response.data.pokemon[i].pokemon.url.slice(34).slice(0, -1)}`);
            //break condition in case max id is reached
            if (pokemon.data.id >= 893) {
                console.log(`All ${type} pokemon entries rendered`);
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
    }

    getTypeDragon = async(type) => {
        this.setState({listMode: 'type'});
        this.setState({pokeData: []});
        this.setState({typeSearch: type});

        const response = await pokeapi.get(`/type/${type}`);

        for (let i = 0; i <= response.data.pokemon.length; i++) {
            if (this.state.listMode !== 'type') { break; };
            if (this.state.typeSearch !== type) { break; };
            
            const pokemon = await pokeapi.get(`/pokemon/${response.data.pokemon[i].pokemon.url.slice(34).slice(0, -1)}`);
            const species = await pokeapi.get(`/pokemon-species/${response.data.pokemon[i].pokemon.url.slice(34).slice(0, -1)}`);
            //break condition in case max id is reached
            if (pokemon.data.id >= 893) {
                console.log(`All ${type} pokemon entries rendered`);
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
    }

    getTypeDark = async(type) => {
        this.setState({listMode: 'type'});
        this.setState({pokeData: []});
        this.setState({typeSearch: type});

        const response = await pokeapi.get(`/type/${type}`);

        for (let i = 0; i <= response.data.pokemon.length; i++) {
            if (this.state.listMode !== 'type') { break; };
            if (this.state.typeSearch !== type) { break; };
            
            const pokemon = await pokeapi.get(`/pokemon/${response.data.pokemon[i].pokemon.url.slice(34).slice(0, -1)}`);
            const species = await pokeapi.get(`/pokemon-species/${response.data.pokemon[i].pokemon.url.slice(34).slice(0, -1)}`);
            //break condition in case max id is reached
            if (pokemon.data.id >= 893) {
                console.log(`All ${type} pokemon entries rendered`);
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
    }

    getTypeSteel = async(type) => {
        this.setState({listMode: 'type'});
        this.setState({pokeData: []});
        this.setState({typeSearch: type});

        const response = await pokeapi.get(`/type/${type}`);

        for (let i = 0; i <= response.data.pokemon.length; i++) {
            if (this.state.listMode !== 'type') { break; };
            if (this.state.typeSearch !== type) { break; };
            
            const pokemon = await pokeapi.get(`/pokemon/${response.data.pokemon[i].pokemon.url.slice(34).slice(0, -1)}`);
            const species = await pokeapi.get(`/pokemon-species/${response.data.pokemon[i].pokemon.url.slice(34).slice(0, -1)}`);
            //break condition in case max id is reached
            if (pokemon.data.id >= 893) {
                console.log(`All ${type} pokemon entries rendered`);
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
    }

    getTypeFairy = async(type) => {
        this.setState({listMode: 'type'});
        this.setState({pokeData: []});
        this.setState({typeSearch: type});

        const response = await pokeapi.get(`/type/${type}`);

        for (let i = 0; i <= response.data.pokemon.length; i++) {
            if (this.state.listMode !== 'type') { break; };
            if (this.state.typeSearch !== type) { break; };
            
            const pokemon = await pokeapi.get(`/pokemon/${response.data.pokemon[i].pokemon.url.slice(34).slice(0, -1)}`);
            const species = await pokeapi.get(`/pokemon-species/${response.data.pokemon[i].pokemon.url.slice(34).slice(0, -1)}`);
            //break condition in case max id is reached
            if (pokemon.data.id >= 893) {
                console.log(`All ${type} pokemon entries rendered`);
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
    }

////////// FUNCTION FOR SINGLE, REFRESH AND TYPE SEARCH //////////

    onSearchSubmit = async (term) => {
        //clear currently rendered entries from screen/DOM
        document.getElementById('pokemon-gen-point').innerHTML = '';

        try {
            if (term === 'fire' || term === 'normal' || term === 'grass' || term === 'water' || term === 'fighting' || term === 'flying' || term === 'poison' || term === 'ground' || term === 'rock' || term === 'bug' || term === 'ghost' || term === 'electric' || term === 'psychic' || term === 'ice' || term === 'dragon' || term === 'dark' || term === 'steel' || term === 'fairy') { //check to see if term is a type string

                this.searchByType(term);

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
                } else { //single pokemon return
                    this.setState({listMode: 'search'});
                    this.setState({pokeData: []});
                    this.setState((prevState => {
                        return prevState.pokeData.push({...species.data, ...pokemon.data});
                    }));

                    //clean-up for extra cards leftover from active loops, turns display to none for last element
                    let parent = document.querySelector('.main-display');
                    setTimeout(() => {
                        if (parent.childNodes.length !== 1) {
                            parent.lastElementChild.style.display = "none";
                        }
                    }, 1000);
                };
            }
        } catch(error) {
            console.log('Error return from App.js onSearchSubmit:');
            console.log(error);
        };
    };

////////// FUNCTIONS FOR GEN //////////
    
    searchByGen = async (generation) => {
        switch(true) {
            case generation === '1':
                this.getGen1(generation);
                break;
            case generation === '2':
                this.getGen2(generation);
                break;
            case generation === '3':
                this.getGen3(generation);
                break;
            case generation === '4':
                this.getGen4(generation);
                break;
            case generation === '5':
                this.getGen5(generation);
                break;
            case generation === '6':
                this.getGen6(generation);
                break;
            case generation === '7':
                this.getGen7(generation);
                break;
            case generation === '8':
                this.getGen8(generation);
                break;
            default:
                return;    
        };
    };

    getGen1 = async(gen) => {
        this.setState({listMode: 'gen'});
        this.setState({pokeData: []});
        this.setState({genSearch: gen});

        const response = await pokeapi.get(`/generation/${gen}`); //returns array with pokemon_species property containing all names and urls for generation

        //loop through all returned ids (sliced to extract ID instead of name, which sometimes doesn't match API call name)
        for (let i = 0; i < response.data.pokemon_species.length; i++) {
            if (this.state.listMode !== 'gen') { break; };
            if (this.state.genSearch !== gen) { break; };

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
    };

    getGen2 = async(gen) => {
        this.setState({listMode: 'gen'});
        this.setState({pokeData: []});
        this.setState({genSearch: gen});

        const response = await pokeapi.get(`/generation/${gen}`); //returns array with pokemon_species property containing all names and urls for generation

        //loop through all returned ids (sliced to extract ID instead of name, which sometimes doesn't match API call name)
        for (let i = 0; i < response.data.pokemon_species.length; i++) {
            if (this.state.listMode !== 'gen') { break; };
            if (this.state.genSearch !== gen) { break; };

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
    };

    getGen3 = async(gen) => {
        this.setState({listMode: 'gen'});
        this.setState({pokeData: []});
        this.setState({genSearch: gen});

        const response = await pokeapi.get(`/generation/${gen}`); //returns array with pokemon_species property containing all names and urls for generation

        //loop through all returned ids (sliced to extract ID instead of name, which sometimes doesn't match API call name)
        for (let i = 0; i < response.data.pokemon_species.length; i++) {
            if (this.state.listMode !== 'gen') { break; };
            if (this.state.genSearch !== gen) { break; };

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
    };

    getGen4 = async(gen) => {
        this.setState({listMode: 'gen'});
        this.setState({pokeData: []});
        this.setState({genSearch: gen});

        const response = await pokeapi.get(`/generation/${gen}`); //returns array with pokemon_species property containing all names and urls for generation

        //loop through all returned ids (sliced to extract ID instead of name, which sometimes doesn't match API call name)
        for (let i = 0; i < response.data.pokemon_species.length; i++) {
            if (this.state.listMode !== 'gen') { break; };
            if (this.state.genSearch !== gen) { break; };

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
    };

    getGen5 = async(gen) => {
        this.setState({listMode: 'gen'});
        this.setState({pokeData: []});
        this.setState({genSearch: gen});

        const response = await pokeapi.get(`/generation/${gen}`); //returns array with pokemon_species property containing all names and urls for generation

        //loop through all returned ids (sliced to extract ID instead of name, which sometimes doesn't match API call name)
        for (let i = 0; i < response.data.pokemon_species.length; i++) {
            if (this.state.listMode !== 'gen') { break; };
            if (this.state.genSearch !== gen) { break; };

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
    };

    getGen6 = async(gen) => {
        this.setState({listMode: 'gen'});
        this.setState({pokeData: []});
        this.setState({genSearch: gen});

        const response = await pokeapi.get(`/generation/${gen}`); //returns array with pokemon_species property containing all names and urls for generation

        //loop through all returned ids (sliced to extract ID instead of name, which sometimes doesn't match API call name)
        for (let i = 0; i < response.data.pokemon_species.length; i++) {
            if (this.state.listMode !== 'gen') { break; };
            if (this.state.genSearch !== gen) { break; };

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
    };

    getGen7 = async(gen) => {
        this.setState({listMode: 'gen'});
        this.setState({pokeData: []});
        this.setState({genSearch: gen});

        const response = await pokeapi.get(`/generation/${gen}`); //returns array with pokemon_species property containing all names and urls for generation

        //loop through all returned ids (sliced to extract ID instead of name, which sometimes doesn't match API call name)
        for (let i = 0; i < response.data.pokemon_species.length; i++) {
            if (this.state.listMode !== 'gen') { break; };
            if (this.state.genSearch !== gen) { break; };

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
    };

    getGen8 = async(gen) => {
        this.setState({listMode: 'gen'});
        this.setState({pokeData: []});
        this.setState({genSearch: gen});

        const response = await pokeapi.get(`/generation/${gen}`); //returns array with pokemon_species property containing all names and urls for generation

        //loop through all returned ids (sliced to extract ID instead of name, which sometimes doesn't match API call name)
        for (let i = 0; i < response.data.pokemon_species.length; i++) {
            if (this.state.listMode !== 'gen') { break; };
            if (this.state.genSearch !== gen) { break; };

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
    };

    loadGen = async(generation) => {
        //clear currently rendered entries from screen/DOM
        document.getElementById('pokemon-gen-point').innerHTML = '';

        try {

            this.searchByGen(generation);

        } catch (error) {
            console.log('Error return from App.js loadGen:');
            console.log(error);
        };
    };

////////// RENDER/RETURN //////////

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
                    listMode={this.state.listMode}
                    loadGen={this.loadGen}
                />
            </main>
        ) 
    }
};

export default App;