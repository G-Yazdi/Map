import React, { Component } from 'react';
import { Map, TileLayer, Polyline, Marker} from 'react-leaflet';
import userService from "../services/userService";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Fab from '@material-ui/core/Fab';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Card from "./card";


class LeafletPolyLineMarker extends Component {
  constructor(props) {
    super(props);
    this.date ={};
  if(this.props.location.state){
    const {date} = this.props.location.state;
    this.date = new Date(date).toLocaleDateString('fa-IR');
  }
    this.state = {
      isLoading: true,
      points: '',
      deviceInfo:'',
      date:this.date
    };
    
  }
    
      
    async componentDidMount() {
      const {date, deviceId} = this.props.match.params;
        await userService.getBrowsedRoute(deviceId, date).then(response => {
          const data = response.data;
          if (data !== null && data.deviceInfo !== null) {
            this.setState({ deviceInfo: data.deviceInfo});
          }
          else{
            this.props.history.push(`/notFound`);
            return;
          }
          if(data.browsedPoints !== null && data.browsedPoints.length > 0){
            this.setState({ points: data.browsedPoints});
            this.setState({ isLoading:false});
          }
          else{
            this.props.history.replace(`/notFound`);
            return;
          }
      })
      .catch(error => {
          console.log("error", error);
          this.props.history.push(`/notFound`);
          return;
      });
    }
    async componentDidUpdate(prevProps) {
      if(this.props.match.params.date !== prevProps.match.params.date) {
        const {date, deviceId} = this.props.match.params;
        this.setState({isLoading:true});
        await userService.getBrowsedRoute(deviceId, date).then(response => {
            const data = response.data;
            
            if (data !== null && data.deviceInfo !==null) {
              this.setState({ deviceInfo: data.deviceInfo});
              const {date} = this.props.location.state;
              this.setState({ date: new Date(date).toLocaleDateString('fa-IR')});
            }
            else{
              this.props.history.push(`/notFound`);
              return;
            }
            if(data.browsedPoints !== null && data.browsedPoints.length > 0){
              this.setState({ points: data.browsedPoints});
              this.setState({ isLoading:false});
            }
            else{
              this.props.history.replace(`/notFound`);
              return;
            }
        })
        .catch(error => {
          console.log("error", error);
          this.props.history.push(`/notFound`);
          return;
        });
      }
    }
    handleBackToList = () => {
        this.props.history.replace("/");
    };

    render() {
        if (!this.state.isLoading) {
            const length = this.state.points.length;
            const fullName = this.state.deviceInfo.nickName !=="N/A" ? this.state.deviceInfo.nickname : "نام و نام خانوادگی";
            return<React.Fragment>
              <Fab color="primary" aria-label="add" style={{zIndex:"1", bottom: "0",
            position: "absolute"}} onClick={()=>this.handleBackToList()}>
               <ArrowBackIcon />
          </Fab>
                
              <Card fullName={fullName} imei={this.state.deviceInfo.imei} simNumber={this.state.deviceInfo.simNumber} date={this.state.date}/>
             <Map 
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
                    <Marker position={[this.state.points[length - 1].latitude, this.state.points[length - 1].longitude]}/>
                    {this.state.points.map((item, index) => {
                        let prevItem = index > 0 ? this.state.points[index - 1] : item;
                        return <Polyline key={index} positions={[
                                [prevItem.latitude, prevItem.longitude], [item.latitude, item.longitude],
                                ]} color={'red'} />
                    })}
                    </Map>
                    </React.Fragment>
        }else {
            return (
             <React.Fragment>
                 <div className="alert text-center  mt-5 rtl" role="alert">
                   <h5>Loading...</h5>
                 </div>
               </React.Fragment>
             ); 
         }
    }
}
export default LeafletPolyLineMarker;