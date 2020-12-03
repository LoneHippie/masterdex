import React from 'react';
import ReactDOM from 'react-dom';
import './styles/_base.scss';
import App from './components/App';

const moveData = require('./json-data/moves.json');

ReactDOM.render(<App moveData={moveData} />, document.querySelector('#root'));