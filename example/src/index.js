import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ConferenceModel from './ConferenceModel';

// create the model
const model = new ConferenceModel();

ReactDOM.render(<App model={model}/>, document.getElementById('root'));