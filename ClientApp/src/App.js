import React from "react";
import "./App.css";
import Layout from "./components/layout";
import {Route, Switch, Redirect} from "react-router-dom";
import NavBar from "./components/navBar";
import PointList from "./components/pointList";
import CssBaseline from "@material-ui/core/CssBaseline";
import LeafletDriftMarker from "./components/leafletDriftMarker";
import LeafletPolyLineMarker from "./components/leafletPolyLineMarker";
import NotFound from "./components/notFound";

function App() {
  const data = [{latitude:"10", longitude:"10"}]
  return <React.Fragment>
  <Switch>
    <Route path="/pointList/:deviceId/browsedRoute/:date" exact component={LeafletDriftMarker}/>
    <Route path="/pointList/:deviceId/traveledDistance/:date" exact component={LeafletPolyLineMarker}/>
    <Route path="/pointList" exact component={PointList}/>
    <Route path="/notFound"  component={NotFound}/>
    <Redirect from="/" exact  to="/pointList"/>
    <Redirect to="/notFound"/>
  </Switch>
</React.Fragment>;
}

export default App;
