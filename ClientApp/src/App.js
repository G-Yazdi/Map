import React, {Component} from "react";
import "./App.css";
import {Route, Switch, Redirect, withRouter, Link, matchPath } from "react-router-dom";
import NavBar from "./components/navBar";
import PointList from "./components/pointList";
import LeafletDriftMarker from "./components/leafletDriftMarker";
import LeafletPolyLineMarker from "./components/leafletPolyLineMarker";
import SearchInput from "./components/searchInput";
import MonitoringButton from "./components/monitoringButton";
import Moment from "moment-jalali";
import Monitoring from './components/monitoring';
import FabBackButton from './components/fabBackButton';
import NotFound from './components/notFound';
import TrackPlayer from './components/trackPlayer';


const getParamsOfLeafletDriftMarkerPath = pathname => {
  const matchProfile = matchPath(pathname, {
    path: `/pointList/:deviceId/browsedRoute/:date`,
  });
  return (matchProfile && matchProfile.params) || {};
};
const getParamsOfLeafletPolyLineMarkerPath = pathname => {
  const matchProfile = matchPath(pathname, {
    path: `/pointList/:deviceId/traveledDistance/:date`,
  });
  return (matchProfile && matchProfile.params) || {};
};


class App extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state ={
      date:new Moment(),
      deviceId:'',
      showSearchInput: true
    }
  }

  componentDidMount() {
    this._isMounted = true;
    console.log("componentDidMount1", this.props.location)
    const { pathname } = this.props.location;
    let currentParams = null;
    if(pathname.includes("browsedRoute")){
      currentParams = getParamsOfLeafletDriftMarkerPath(pathname);
    }
    else if(pathname.includes("traveledDistance")){
      currentParams = getParamsOfLeafletPolyLineMarkerPath(pathname);
    }
    
    if(currentParams){
      console.log("componentDidMount1.1", currentParams)
      const {date, deviceId} = currentParams;
      console.log("componentDidMount1.1.1", date)
      let formateDate = date.replace(/\-/g, '/');
      console.log("componentDidMountformatedDate:", formateDate)
      if(this._isMounted)
        this.setState({date: new Moment(formateDate), deviceId});  
    }
     
  }

  componentDidUpdate(prevProps) {
    this._isMounted = true;
    console.log("componentDidUpdate2")
    const { pathname } = this.props.location;
    let currentParams = null;
    if(this.props.location !== prevProps.location) {
      console.log("componentDidUpdate2.1")

      if(pathname.includes("browsedRoute")){
        currentParams = getParamsOfLeafletDriftMarkerPath(pathname);
      }
      else if(pathname.includes("traveledDistance")){
        currentParams = getParamsOfLeafletPolyLineMarkerPath(pathname);
      }
    
      if(currentParams){
        console.log("componentDidUpdate1.1", currentParams)
        const {date, deviceId} = currentParams;
        console.log("componentDidUpdate1.1.1", date)
        let formateDate = date.replace(/\-/g, '/');
        console.log("componentDidUpdateformatedDate:", formateDate)
        if(this._isMounted)
          this.setState({date: new Moment(formateDate), deviceId});  
      }
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleSearch = () => {
    console.log("3")
    let date = this.state.date._d;
    if(!date) return;
    date = new Date(date.toString().slice(0, 28)).toISOString()
    date = date.slice(0,10);
    if(this.props.location.pathname.includes("browsedRoute")){
      this.props.history.push(`/pointList/${this.state.deviceId}/browsedRoute/${date}`);
    }
    else{
      this.props.history.push(`/pointList/${this.state.deviceId}/traveledDistance/${date}`);
    }

  };

  // handler = () => {
  //   console.log("yesssssssssss")
  //   if(this._isMounted && this.state.showSearchInput)
  //     {this.setState({
  //       showSearchInput: false
  //     })}
  // }
  handleChange = (value) => {
    console.log("date", value)
    if(this._isMounted)
      this.setState({date: value});
  };
  handleBackToList = () => {
    this.props.history.replace("/");
  };
  render(){
    console.log("4", this.props)
    const path = this.props.location.pathname;

    let navComponent = '';
    let backButton = '';
    if(path !=="/pointList"){
      backButton = <FabBackButton onClick={this.handleBackToList}/>;
    }
    if(path === "/pointList"){
      navComponent = <Link style={{marginTop: "-30px"}} to= "/monitoring">
        <MonitoringButton/>
      </Link>
    }
    else if((path.includes("browsedRoute") || path.includes("traveledDistance"))){
      navComponent = <SearchInput onClickSearch={this.handleSearch} 
                      onChange={this.handleChange} date={this.state.date}/>;
    }



    return <React.Fragment>
      <NavBar>
        {navComponent}
      </NavBar>
      {backButton}
      <Switch>
        <Route path="/pointList/:deviceId/browsedRoute/:date" exact component={TrackPlayer}/>
        <Route path="/pointList/:deviceId/traveledDistance/:date" exact component={LeafletPolyLineMarker}/>
        <Route path="/monitoring" exact component={Monitoring}/>
        <Route path="/pointList" exact component={PointList}/>
        <Route path="/notFound" exact component={NotFound}/>
        <Redirect from="/" exact  to="/pointList"/>
        <Redirect to="/notFound"/>
      </Switch>
  </React.Fragment>;
  }
}

export default withRouter(App);;
