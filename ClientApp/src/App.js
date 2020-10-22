import React, {Component} from "react";
import "./App.css";
import {Route, Switch, Redirect, withRouter } from "react-router-dom";
import NavBar from "./components/navBar";
import PointList from "./components/pointList";
import LeafletDriftMarker from "./components/leafletDriftMarker";
import LeafletPolyLineMarker from "./components/leafletPolyLineMarker";
import NotFound from "./components/notFound";
import SearchInput from "./components/searchInput";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date:'',
      deviceId:''
    };
  }

  componentDidMount() {
    if(this.props.location.state){
      const {date, deviceId} = this.props.location.state;
      this.setState({date, deviceId});  
    }
     
  }

  componentDidUpdate(prevProps) {
    if(this.props.location.state){
      if(this.props.location.state !== prevProps.location.state) {
        const {date, deviceId} = this.props.location.state;
        this.setState({date, deviceId});
      }
    }
  }

  handleSearch = () => {
    if(this.props.location.pathname.includes("browsedRoute")){
      this.props.history.push(
        {pathname:`/pointList/${this.state.deviceId}/browsedRoute/${this.state.date}`, 
        state: { date: this.state.date, deviceId: this.state.deviceId}});
    }
    else{
      this.props.history.push(
        {pathname:`/pointList/${this.state.deviceId}/traveledDistance/${this.state.date}`, 
        state: { date: this.state.date, deviceId: this.state.deviceId}});
    }

  };

  handleChange = (event) => {
    this.setState({date: event.target.value});
  };
  render(){
    const path = this.props.location.pathname;
    return <React.Fragment>
      <NavBar>
        {(path.includes("browsedRoute") || path.includes("traveledDistance")) && 
        <SearchInput onClickSearch={this.handleSearch} onChange={this.handleChange} date={this.state.date}/>}
      </NavBar>
      
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
}

export default withRouter(App);;
