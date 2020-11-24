import React, {Component} from "react";
import "./App.css";
import {Route, Switch, Redirect, withRouter, Link, matchPath } from "react-router-dom";
import NavBar from "./components/navBar";
import PointList from "./pages/pointList/pointList";
import LeafletPolyLineMarker from "./pages/traveledDistance/leafletPolyLineMarker";
import SearchInput from "./components/searchInput";
import MonitoringButton from "./components/monitoringButton";
import Moment from "moment-jalali";
import Monitoring from './pages/monitoring/monitoring';
import FabBackButton from './components/fabBackButton';
import NotFound from './components/notFound';
import TrackPlayer from './pages/browsedRoute/trackPlayer';
import ProtectedRoute from './components/utils/protectedRoute';
import LoginMiddleware from "./components/utils/loginMiddleware";
import hostService from "./services/hostService";
import auth from "./services/authService";


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
      showSearchInput: true,
      isLoading: true,
      hostAddress:''
    }
  }

  componentDidMount() {
    this._isMounted = true;
    const { pathname } = this.props.location;
    let currentParams = null;
    if(pathname.includes("browsedRoute")){
      currentParams = getParamsOfLeafletDriftMarkerPath(pathname);
    }
    else if(pathname.includes("traveledDistance")){
      currentParams = getParamsOfLeafletPolyLineMarkerPath(pathname);
    }
    
    if(currentParams){
      const {date, deviceId} = currentParams;
      let formateDate = date.replace(/\-/g, '/');
      if(this._isMounted)
        this.setState({date: new Moment(formateDate), deviceId});  
    }

    hostService.getHostAddress().then(response => {
      const address = response.data;

      if (address !== null) {
          this.setState({ hostAddress: address, isLoading: false });
      } else {
          this.setState({ isLoading: true });
      }
  })
  .catch(error => {
      console.log("error", error);
  });
     
  }

  componentDidUpdate(prevProps) {
    this._isMounted = true;
    const { pathname } = this.props.location;
    let currentParams = null;
    if(this.props.location !== prevProps.location) {

      if(pathname.includes("browsedRoute")){
        currentParams = getParamsOfLeafletDriftMarkerPath(pathname);
      }
      else if(pathname.includes("traveledDistance")){
        currentParams = getParamsOfLeafletPolyLineMarkerPath(pathname);
      }
    
      if(currentParams){
        const {date, deviceId} = currentParams;
        let formateDate = date.replace(/\-/g, '/');
        if(this._isMounted)
          this.setState({date: new Moment(formateDate), deviceId});  
      }
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleSearch = () => {
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
    if(this._isMounted)
      this.setState({date: value});
  };
  handleBackToList = () => {
    this.props.history.replace("/");
  };
  handleExit = async ()=>{
    try{
      await auth.logout();
      this.props.history.replace("/login");
    }
    catch(error){
      console.log("error", error);
    }
  }
  render(){
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

    if(!this.state.isLoading){
      return <React.Fragment>
      <NavBar onClick={this.handleExit}>
        {navComponent}
      </NavBar>
      {backButton}
      <Switch>
        <ProtectedRoute exact path="/pointList/:deviceId/browsedRoute/:date" component={TrackPlayer}/>
        <ProtectedRoute exact path="/pointList/:deviceId/traveledDistance/:date" component={LeafletPolyLineMarker}/>
        <ProtectedRoute exact path="/monitoring" component={Monitoring}/>
        <Route path="/loginMiddleware" exact component={LoginMiddleware}/>
        <ProtectedRoute path="/pointList" exact component={PointList}/>
        <Route path="/notFound" exact component={NotFound}/>
        <Redirect from="/" exact  to="/pointList"/>
        <Route path='/login' component={() =>
            {
                window.location.href = `http://login.dm1.com/login?platform=1&returnurl=http://${this.state.hostAddress}/loginMiddleware`;
                return null;
            }
            } />
        <Redirect to="/notFound"/>
      </Switch>
    </React.Fragment>
  
    }
    else{
      return null;
    }

    }
}

export default withRouter(App);;
