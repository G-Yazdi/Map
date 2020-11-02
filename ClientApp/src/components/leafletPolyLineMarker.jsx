import React, { Component } from 'react';
import { Map, TileLayer, Polyline, Marker} from 'react-leaflet';
import userService from "../services/userService";
import Card from "./card";
import {iconVisitor} from "./icon";
import ErrorPage from "./errorPage";


class LeafletPolyLineMarker extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      points: '',
      deviceInfo:'',
      date:'',
      mapErrorMessage: '',
      deviceErrorMessage: '',
      serverErrorMessage: ''

    };
    
  }
    
      
    async componentDidMount() {
      console.log("llllllllllllllllllllll")
      this._isMounted = true;
      const {date, deviceId} = this.props.match.params;
        await userService.getBrowsedRoute(deviceId, date).then(response => {
          const data = response.data;
          if (data &&  data.deviceInfo) {
            if(this._isMounted)
            {
              this.setState({ deviceInfo: data.deviceInfo});
              this.setState({ date: new Date(date).toLocaleDateString('fa-IR')});
            }
          }
          else{
            if(this._isMounted)
              this.setState({deviceErrorMessage: "اطلاعات دستگاه مورد نظر یافت نشد"});
              // this.setState({deviceErrorMessage: "اطلاعات دستگاه مورد نظر یافت نشد"}, ()=>this.props.handler());
            return;
          }
          if(data.browsedPoints !== null && data.browsedPoints.length > 0){
            if(this._isMounted)
              this.setState({ points: data.browsedPoints});
          }
          else{
            if(this._isMounted)
              this.setState({mapErrorMessage: "اطلاعات مسافت پیموده شده در تاریخ مورد نظر موجود نمی باشد"});
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
    }
    async componentDidUpdate(prevProps) {
      this._isMounted = true;
      if(this.props.match.params.date !== prevProps.match.params.date) {
        const {date, deviceId} = this.props.match.params;
        if(this._isMounted)
          this.setState({isLoading: true, mapErrorMessage: '', deviceErrorMessage: '', serverErrorMessage:''});

        await userService.getBrowsedRoute(deviceId, date).then(response => {
            const data = response.data;
            
            if (data && data.deviceInfo) {
              if(this._isMounted)
              {
                this.setState({ deviceInfo: data.deviceInfo});
                this.setState({ date: new Date(date).toLocaleDateString('fa-IR')});
              }
            }
            else{
              if(this._isMounted)
                this.setState({deviceErrorMessage: "اطلاعات دستگاه مورد نظر یافت نشد"});
                // this.setState({deviceErrorMessage: "اطلاعات دستگاه مورد نظر یافت نشد"}, ()=>this.props.handler());
              return;
            }
            if(data.browsedPoints && data.browsedPoints.length > 0){
              if(this._isMounted)
                this.setState({ points: data.browsedPoints});
            }
            else{
              if(this._isMounted)
                this.setState({mapErrorMessage: "اطلاعات مسافت پیموده شده در تاریخ مورد نظر موجود نمی باشد"});
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
      }
    }

    componentWillUnmount() {
      console.log("componentWillUnmountpoly")
      this._isMounted = false;
    }

    render() {
      if(!this.state.isLoading){
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
                const length = this.state.points.length;
                mapComponent = <Map 
                      center={[this.state.points[length - 1].latitude, this.state.points[length - 1].longitude]} zoom={15}
                      style={{
                          position: "absolute",
                          top: "65px",
                          bottom: 0,
                          width: "100%", zIndex:"-1"}} 
                      >
                      <TileLayer
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      <Marker position={[this.state.points[length - 1].latitude, this.state.points[length - 1].longitude]} icon={ iconVisitor }/>
                      {this.state.points.map((item, index) => {
                          let prevItem = index > 0 ? this.state.points[index - 1] : item;
                          return <Polyline key={index} positions={[
                                  [prevItem.latitude, prevItem.longitude], [item.latitude, item.longitude],
                                  ]} color={'red'} />
                      })}
                  </Map>
              }
              else{
                mapComponent = <ErrorPage errorMessage={this.state.mapErrorMessage}/>
              }
            }
            else{
              cardComponent = <ErrorPage errorMessage={this.state.deviceErrorMessage}/>
            }
            return<React.Fragment>
              {cardComponent}
              {mapComponent}
            </React.Fragment>
      }
      else{
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
export default LeafletPolyLineMarker;