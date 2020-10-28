import React, {Component} from "react";
import "./App.css";
import userService from "./services/userService";
import {Route, Switch, Redirect, withRouter } from "react-router-dom";
import NavBar from "./components/navBar";
import PointList from "./components/pointList";
import LeafletDriftMarker from "./components/leafletDriftMarker";
import LeafletPolyLineMarker from "./components/leafletPolyLineMarker";
import NotFound from "./components/notFound";
import SearchInput from "./components/searchInput";
import Moment from "moment-jalali";
import { Map, TileLayer, Marker } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import ReactDOM from 'react-dom';
import Cluster from "./components/cluster";


class App extends Component {
  state = {
    isLoading: true,
    customers: [],
    devices:[]
};

  componentDidMount() {
    userService.getMonitoringMap().then(response => {
      const data = response.data;
      console.log("data:", data)
      if (data !== null) {
        this.setState({ customers: data.customers, devices: data.devices});
        this.setState({isLoading:false})
      }
  })
  .catch(error => {
      console.log("error", error);
  });
  }
  // constructor(props) {
  //   super(props);
  //   console.log("0")
  //   this.state ={
  //     date:'',
  //     deviceId:'',
  //     validDate:''
  //   }
  // }

  // componentDidMount() {
  //   console.log("1")
  //   if(this.props.location.state){
  //     console.log("2")
  //     const {date, deviceId} = this.props.location.state;
  //     let formateDate = date.replace(/\-/g, '/');
  //     console.log("formatedDate:", formateDate)
  //     this.setState({date: formateDate, deviceId});  
  //   }
     
  // }

  // componentDidUpdate(prevProps) {
  //   console.log("3")
  //   if(this.props.location.state){
  //     console.log("4")
  //     if(this.props.location.state !== prevProps.location.state) {
  //       console.log("5")
  //       const {date, deviceId} = this.props.location.state;
  //       let formateDate = date.replace(/\-/g, '/');
  //     console.log("formatedDate:", formateDate);
  //       this.setState({date: formateDate, deviceId});
  //     }
  //   }
  // }

  // handleSearch = () => {
  //   console.log("6")
  //   let date = this.state.validDate._d;
  //   if(!date) return;
  //     date = new Date(date.toString().slice(0, 28)).toISOString()
  //     date = date.slice(0,10)
  //   if(this.props.location.pathname.includes("browsedRoute")){
  //     // console.log("1:", value)
      
  //     this.props.history.push(
  //       {pathname:`/pointList/${this.state.deviceId}/browsedRoute/${date}`, 
  //       state: { date: date, deviceId: this.state.deviceId}});
  //   }
  //   else{
  //     this.props.history.push(
  //       {pathname:`/pointList/${this.state.deviceId}/traveledDistance/${date}`, 
  //       state: { date: date, deviceId: this.state.deviceId}});
  //   }

  // };

  // handleChange = (value) => {
  //   this.setState({validDate: value});
  // };
  render(){
    if(!this.state.isLoading){
      return (
        <Cluster customers={this.state.customers} devices={this.state.devices}/>
      );
    }
    return null;
    
    // const path = this.props.location.pathname;
    // let date1 ={};
    // if(this.props.location.state){
    //   const {date} = this.props.location.state;
    //   let formateDate = date.replace(/\-/g, '/');
    //   date1 = formateDate;
    // }
    
  //   <React.Fragment>

  //     <NavBar>
  //       {(path.includes("browsedRoute") || path.includes("traveledDistance")) && 
  //       <SearchInput onClickSearch={this.handleSearch} onChange={this.handleChange} date={this.state.validDate} defaultDate={new Moment(date1)}/>}
  //     </NavBar>
      
  //   <Switch>
  //     <Route path="/pointList/:deviceId/browsedRoute/:date" exact component={LeafletDriftMarker}/>
  //     <Route path="/pointList/:deviceId/traveledDistance/:date" exact component={LeafletPolyLineMarker}/>
  //     <Route path="/pointList" exact component={PointList}/>
  //     <Route path="/notFound"  component={NotFound}/>
  //     <Redirect from="/" exact  to="/pointList"/>
  //     <Redirect to="/notFound"/>
  //   </Switch>
  // </React.Fragment>;
  }
}

export default withRouter(App);;
