import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import './components/leaflet-react-track-player/src/index.css'
import './components/leaflet/leaflet.css'; // sass
import 'react-leaflet-markercluster/dist/styles.min.css';
import {createStore} from "redux";
import reducer from "./store/reducer";
import {Provider} from "react-redux";


const store = createStore(reducer);

ReactDOM.render(<BrowserRouter><Provider store={store}><App /></Provider></BrowserRouter>, document.getElementById('root'));