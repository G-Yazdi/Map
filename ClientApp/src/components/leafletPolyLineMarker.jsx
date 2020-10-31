import React, { Component } from 'react';
import { Map, TileLayer, Polyline, Marker} from 'react-leaflet';
import userService from "../services/userService";
import Card from "./card";
import {iconVisitor} from "./icon";
import NotFound from "./notFound";


class LeafletPolyLineMarker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      points: '',
      deviceInfo:'',
      date:'',
      mapErrorMessage: '',
      deviceErrorMessage: '',
      serverErrorMessage:''
    };
    
  }
    
      
    async componentDidMount() {
      const {date, deviceId} = this.props.match.params;
        await userService.getBrowsedRoute(deviceId, date).then(response => {
          const data = response.data;
          if (data &&  data.deviceInfo) {
            this.setState({ deviceInfo: data.deviceInfo});
            this.setState({ date: new Date(date).toLocaleDateString('fa-IR')});
            console.log("heyyyyyyyyyyyyyyyyyyyy", data.deviceInfo)
          }
          else{
            this.setState({deviceErrorMessage: "اطلاعات دستگاه مورد نظر یافت نشد"});
            return;
          }
          if(data.browsedPoints !== null && data.browsedPoints.length > 0){
            this.setState({ points: data.browsedPoints});
          }
          else{
            this.setState({mapErrorMessage: "اطلاعات مسافت پیموده شده در تاریخ مورد نظر موجود نمی باشد"});
            return;
          }
      })
      .catch(error => {
        console.log("error", error);
        this.props.history.replace({pathname:`/notFound`, 
          props: { errorMessage: "در حال حاضر امکان برقراری ارتباط با سرور وجود ندارد"}} );
        return;
      });
      this.setState({ isLoading:false});
    }
    async componentDidUpdate(prevProps) {
      if(this.props.match.params.date !== prevProps.match.params.date) {
        const {date, deviceId} = this.props.match.params;

        this.setState({isLoading: true, mapErrorMessage: '', deviceErrorMessage: ''});

        await userService.getBrowsedRoute(deviceId, date).then(response => {
            const data = response.data;
            
            if (data && data.deviceInfo) {
              this.setState({ deviceInfo: data.deviceInfo});
              this.setState({ date: new Date(date).toLocaleDateString('fa-IR')});
            }
            else{
              this.setState({deviceErrorMessage: "اطلاعات دستگاه مورد نظر یافت نشد"});
              return;
            }
            if(data.browsedPoints !== null && data.browsedPoints.length > 0){
              this.setState({ points: data.browsedPoints});
            }
            else{
              this.setState({mapErrorMessage: "اطلاعات مسافت پیموده شده در تاریخ مورد نظر موجود نمی باشد"});
              return;
            }
        })
        .catch(error => {
          console.log("error", error);
          this.props.history.replace({pathname:`/notFound`, 
            props: { errorMessage: "در حال حاضر امکان برقراری ارتباط با سرور وجود ندارد"}} );
          return;
        });
        this.setState({ isLoading:false});
      }
    }

    render() {
      if(!this.state.isLoading){
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
                mapComponent = <NotFound errorMessage={this.state.mapErrorMessage}/>
              }
            }
            else{
              cardComponent = <NotFound errorMessage={this.state.deviceErrorMessage}/>
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