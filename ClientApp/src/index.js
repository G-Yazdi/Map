import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import './components/leaflet-react-track-player/src/index.css'
import './components/leaflet/leaflet.css'; // sass
import 'react-leaflet-markercluster/dist/styles.min.css';

// ReactDOM.render(
//   <React.StrictMode>
//     <BrowserRouter><TrackPlayer /></BrowserRouter>
//   </React.StrictMode>,
//   document.getElementById('root')
// );
// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));