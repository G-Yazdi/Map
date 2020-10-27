import React, {Component} from "react";
import "./App.css";
import {Route, Switch, Redirect, withRouter } from "react-router-dom";
import NavBar from "./components/navBar";
import PointList from "./components/pointList";
import LeafletDriftMarker from "./components/leafletDriftMarker";
import LeafletPolyLineMarker from "./components/leafletPolyLineMarker";
import NotFound from "./components/notFound";
import SearchInput from "./components/searchInput";
import Moment from "moment";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date:'',
      deviceId:'',
      validDate:''
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
    let date = this.state.validDate._d;
      date = new Date(date.toString().slice(0, 28)).toISOString()
      date = date.slice(0,10)
    if(this.props.location.pathname.includes("browsedRoute")){
      // console.log("1:", value)
      
      this.props.history.push(
        {pathname:`/pointList/${this.state.deviceId}/browsedRoute/${date}`, 
        state: { date: date, deviceId: this.state.deviceId}});
    }
    else{
      this.props.history.push(
        {pathname:`/pointList/${this.state.deviceId}/traveledDistance/${date}`, 
        state: { date: date, deviceId: this.state.deviceId}});
    }

  };

  handleChange = (value) => {
    console.log("3:", value)
    this.setState({validDate: value});
  };
  render(){
    const path = this.props.location.pathname;
    return <React.Fragment>
      <NavBar>
        {(path.includes("browsedRoute") || path.includes("traveledDistance")) && 
        <SearchInput onClickSearch={this.handleSearch} onChange={this.handleChange} date={this.state.validDate}/>}
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
