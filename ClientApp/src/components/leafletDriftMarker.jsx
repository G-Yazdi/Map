import React, { Component } from 'react';
import { Map, TileLayer, Polyline, Popup} from 'react-leaflet';
import { DriftMarker } from "leaflet-drift-marker";
import userService from "../services/userService";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Card from "./card";
import Moment from "moment";
const StyledButton = withStyles({
  root: {
    background: "rgb(63, 81, 181)",
    '&:hover': {
      background: "rgb(63, 81, 181)"
  },
    border: 0,
    color: "white",
    height: 30,
    size: "small",
    fontFamily:"vazir"
  },
})(Button);
 
class LeafletDriftMarker extends Component {
    index = 0;
    _isMounted = false;
    constructor(props) {
      super(props);
      this.state = {
        isLoading: true,
        points: '',
        deviceInfo:'', 
        pointInfo: {lat:'', lng:'', speed:'', time:''}
      };
    }
    
 
    async componentDidMount() {
      this._isMounted = true;
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
          if(data.browsedPoints !== null && data.browsedPoints.length > 0 && this._isMounted){
            this.setState({ points: data.browsedPoints});
            this.setState(() => ({ pointInfo: this.get_position()}));
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
      
      if(this.state.points !==''){
        this.repeat();
      }
          
    }

     async componentDidUpdate(prevProps) {
        if(this.props.match.params.date !== prevProps.match.params.date) {
          this._isMounted = false;
          this.index = 0;
          const {date, deviceId} = this.props.match.params;
          this.setState({isLoading:true});
          await userService.getBrowsedRoute(deviceId, date).then(response => {
              const data = response.data;
              
              if (data !== null && data.deviceInfo !==null) {
                this.setState({ deviceInfo: data.deviceInfo});
              }
              else{
                this.props.history.push(`/notFound`);
                return;
              }
              if(data.browsedPoints !== null && data.browsedPoints.length > 0){
                this._isMounted = true;
                this.setState({ points: data.browsedPoints});
                this.setState(() => ({ latlng: this.get_position()}));
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
        if(this._isMounted){
          return {
            lat: this.state.points[this.index].latitude,
            lng: this.state.points[this.index].longitude,
            speed: this.state.points[this.index].speed,
            time: this.state.points[this.index].time
          };
        }
      }
      handleBackToList = () => {
        this.props.history.replace("/");
      };
    render() {
      
      if (!this.state.isLoading) {
        const fullName = this.state.deviceInfo.nickName !=="N/A" ? this.state.deviceInfo.nickname : "نام و نام خانوادگی";
        return (
        <React.Fragment>
          <StyledButton style={{zIndex:"1", bottom: "0",
            position: "absolute", borderBottomLeftRadius: "0",
            borderTopLeftRadius: "0"}} onClick={()=>this.handleBackToList()} >
              برگشت
          </StyledButton>
        
          <Card fullName={fullName} imei={this.state.deviceInfo.imei} simNumber={this.state.deviceInfo.simNumber}/>
          <Typography variant="body2" color="textSecondary" component="p" align="right" 
            style={{fontFamily:"Vazir", fontSize:"20px", backgroundColor:"white" , width:"fit-content", 
            right:"5px", position:"absolute", marginTop:"50px"}}>
              {this.state.date}
          </Typography>
          <Map 
              center={[this.state.points[0].latitude, this.state.points[0].longitude]} zoom={15}
              style={{
                      position: "absolute",
                      top: "65px",
                      bottom: 0,
                      width: "100%", zIndex:"-1"}} 
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
                duration={1000}>
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
        </React.Fragment> 
        )
     
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
export default LeafletDriftMarker;