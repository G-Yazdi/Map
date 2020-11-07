import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import 'leaflet-react-track-player/src/index.css'
import 'leaflet/dist/leaflet.css'; // sass
import 'react-leaflet-markercluster/dist/styles.min.css';
import TrackPlayer from './components/trackPlayer';

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