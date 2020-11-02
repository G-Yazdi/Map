import React, { Component } from 'react';
import { Map, TileLayer, Polyline, Popup} from 'react-leaflet';
import { DriftMarker } from "leaflet-drift-marker";
import userService from "../services/userService";
import Typography from "@material-ui/core/Typography";
import Card from "./card";
import Moment from "moment";
import ErrorPage from "./errorPage";
import {iconVisitor} from "./icon";
 
class LeafletDriftMarker extends Component {
    index = 0;
    _isMounted = false;
    _hasPoints = false;
    constructor(props) {
      super(props);
      console.log("driftconstructor")
      this.state = {
        isLoading: true,
        points: '',
        deviceInfo:'', 
        pointInfo: {lat:'', lng:'', speed:'', time:''},
        date:'',
        mapErrorMessage: '',
        deviceErrorMessage: '',
        serverErrorMessage:''
      };
    }
    
 
    async componentDidMount() {
      console.log("driftcomponentDidMount1")
      this._isMounted = true;
      const {date, deviceId} = this.props.match.params;
      await userService.getBrowsedRoute(deviceId, date).then(response => {
          const data = response.data;
          if (data && data.deviceInfo) {
            if(this._isMounted)
              this.setState({ deviceInfo: data.deviceInfo, date: new Date(date).toLocaleDateString('fa-IR')});
          }
          else{
            if(this._isMounted)
              this.setState({deviceErrorMessage: "اطلاعات دستگاه مورد نظر یافت نشد"});
              // this.setState({deviceErrorMessage: "اطلاعات دستگاه مورد نظر یافت نشد"}, ()=>this.props.handler());
            
            return;
          }
          if(data.browsedPoints !== null && data.browsedPoints.length > 0 && this._isMounted){
            this._hasPoints = true;
            this.setState({ points: data.browsedPoints});
            this.setState(() => ({ pointInfo: this.get_position()}));
          }
          else{
            if(this._isMounted)
              this.setState({mapErrorMessage: "اطلاعات مسیر طی شده در تاریخ مورد نظر موجود نمی باشد"});
            return;
          }
      })
      .catch(error => {
        console.log("error", error);
        if(this._isMounted)
          this.setState({serverErrorMessage: "در حال حاضر امکان برقراری ارتباط با سرور وجود ندارد"});
        return;
      });
      if(this._isMounted)
        this.setState({ isLoading:false});
      if(this.state.points !==''){
        this.repeat();
      }
          
    }

     async componentDidUpdate(prevProps) {
        if(this.props.match.params.date !== prevProps.match.params.date) {
          this._isMounted = true;
          this._hasPoints = false;
          this.index = 0;
          const {date, deviceId} = this.props.match.params;
          this.setState({isLoading: true, mapErrorMessage: '', deviceErrorMessage: '', serverErrorMessage: '', points:''});
          await userService.getBrowsedRoute(deviceId, date).then(response => {
              const data = response.data;
              
              if (data  && data.deviceInfo ) {
                if(this._isMounted)
                  this.setState({ deviceInfo: data.deviceInfo, date: new Date(date).toLocaleDateString('fa-IR')});
              }
              else{
                if(this._isMounted)
                  this.setState({deviceErrorMessage: "اطلاعات دستگاه مورد نظر یافت نشد"});
                  // this.setState({deviceErrorMessage: "اطلاعات دستگاه مورد نظر یافت نشد"}, ()=>this.props.handler());
              return;
              }
              if(data.browsedPoints && data.browsedPoints.length > 0){
                if(this._isMounted)
                {
                  this._hasPoints = true;
                  this.setState({ points: data.browsedPoints});
                  this.setState(() => ({ latlng: this.get_position()}));
                }
              }
              else{
                if(this._isMounted)
                  this.setState({mapErrorMessage: "اطلاعات مسیر طی شده در تاریخ مورد نظر موجود نمی باشد"});
              return;
              }
          })
          .catch(error => {
            console.log("error", error);
            if(this._isMounted)
              this.setState({serverErrorMessage: "در حال حاضر امکان برقراری ارتباط با سرور وجود ندارد"});
            return;
        });
        this.setState({ isLoading:false});
          if(this.state.points !==''){
            this.repeat();
          }
        }
      }
      componentWillUnmount() {
        this._isMounted = false;
      }
      repeat = () => {
          if(this.index < this.state.points.length-1){
            this.index++;
            setTimeout(() => {
              if(this._isMounted){
                this.setState({ pointInfo: this.get_position() }, this.repeat);
              }
            }, 2000);
          }
        
      };
    
      get_position = () =>{
        if(this._hasPoints){
          return {
            lat: this.state.points[this.index].latitude,
            lng: this.state.points[this.index].longitude,
            speed: this.state.points[this.index].speed,
            time: this.state.points[this.index].time
          };
        }
      }
      
    render() {
      console.log("driftRender")
      
      if (!this.state.isLoading) {
        if(this.state.serverErrorMessage){
          return <ErrorPage errorMessage={this.state.serverErrorMessage}/>
        }
        let cardComponent = null;
        let mapComponent = null;
        if(!this.state.deviceErrorMessage){
          const fullName = this.state.deviceInfo.nickName !=="N/A"? this.state.deviceInfo.nickName: "نام و نام خانوادگی";
          cardComponent = <Card fullName={fullName} 
                  imei={this.state.deviceInfo.imei} 
                  simNumber={this.state.deviceInfo.simNumber} 
                  date={this.state.date}
              />
          if(!this.state.mapErrorMessage){
            mapComponent = <Map center={[this.state.points[0].latitude, this.state.points[0].longitude]} zoom={15}
                                style={{
                                        position: "absolute",
                                        top: "65px",
                                        bottom: 0,
                                        width: "100%", zIndex:"-1"
                                      }} 
                            >
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                {this.state.points.map((item, index) => {
                                          let prevItem = index > 0 ? this.state.points[index - 1] : item;
                                          return <Polyline key={index} positions={[
                                                  [prevItem.latitude, prevItem.longitude], [item.latitude, item.longitude],
                                                  ]} color={'red'} />
                                })}
                                <DriftMarker
                                  // if position changes, marker will drift its way to new position
                                  position={[this.state.pointInfo.lat, this.state.pointInfo.lng]}
                                  // time in ms that marker will take to reach its destination
                                  duration={1000}
                                  icon={iconVisitor}>
                                    <Popup>
                                      <Typography align="right" style={{fontFamily:"Vazir"}}>
                                          سرعت: 
                                          {` ${this.state.pointInfo.speed}` }
                                          <br/>
                                          زمان: 
                                          {` ${Moment(this.state.pointInfo.time).format("HH:mm:ss")}`}
                                      </Typography>
                                    
                                    </Popup>
                                </DriftMarker>
                            </Map>
            }else{
              mapComponent = <ErrorPage errorMessage={this.state.mapErrorMessage}/>
            }
        }else{
          cardComponent = <ErrorPage errorMessage={this.state.deviceErrorMessage}/>
        }
        return<React.Fragment>
          {cardComponent}
          {mapComponent}
        </React.Fragment>
      }else {
         return (
          <React.Fragment>
              <div className="alert text-center  mt-5 rtl" role="alert">
                <h5 style={{position: "absolute", top: "70px"}}>Loading...</h5>
              </div>
            </React.Fragment>
          ); 
      }
  }
}
export default LeafletDriftMarker;