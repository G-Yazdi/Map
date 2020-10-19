import React, { Component } from 'react';
import { Map, TileLayer} from 'react-leaflet';
import { DriftMarker } from "leaflet-drift-marker";
import userService from "../services/userService";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import SearchNavBar from "./searchNavBar";
import { ColorLensOutlined } from '@material-ui/icons';
const StyledButton = withStyles({
  root: {
    background: "linear-gradient(45deg, #846bfe, #846bfe)",
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
    state = {
      isLoading: true,
        points: [],
        deviceInfo:"", 
        latlng: null,
        date:null
      };
 
    async componentDidMount() {
      console.log("yes")
      this._isMounted = true;
      let time = null;
      if(this.props.match.params.date === null || this.props.match.params.date === undefined){
        const date = new Date();
        time = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getUTCDate());
        
      }
      else{
        time = this.props.match.params.date;
        console.log("time:", time)
      }
      this.setState({date: time});
      await userService.getBrowsedRoute(this.props.match.params.deviceId, time).then(response => {
          const data = response.data;
          if (data !== null && data.browsedPoints.length > 0 && this._isMounted) {
            this.setState({ points: data.browsedPoints});
            this.setState({ deviceInfo: data.deviceInfo});
            this.setState(() => ({ latlng: this.get_position()}));
            this.setState({ isLoading:false});
          }
          else{
            this.setState({ isLoading:true});
          }
      })
      .catch(error => {
          console.log("error", error);
      });
          this.repeat();
          
      }

     async componentDidUpdate(prevProps) {
      console.log("yes1")
        if(this.props.match.params.date !== prevProps.match.params.date && this.state.date !==this.props.match.params.date) {
          this.setState({ isLoading:true});
          console.log("yes11")
          this._isMounted = true;
        const time = this.props.match.params.date;
        console.log("time:", time)
        this.setState({date: time});
      await userService.getBrowsedRoute(this.props.match.params.deviceId, time).then(response => {
          const data = response.data;
          if (data !== null && data.browsedPoints.length > 0 && this._isMounted) {
            this.setState({ points: data.browsedPoints});
            this.setState({ deviceInfo: data.deviceInfo});
            this.setState(() => ({ latlng: this.get_position()}));
            this.setState({ isLoading:false});
          }
          else{
            this.setState({ isLoading:true});
          }
      })
      .catch(error => {
          console.log("error", error);
      });
          this.repeat();
          
        }
      }
      componentWillUnmount() {
        this._isMounted = false;
      }
      repeat = () => {
          this.index++;
          
          if(this.index < this.state.points.length){
            setTimeout(() => {
              if(this._isMounted){
                this.setState({ latlng: this.get_position() }, this.repeat);
              }
            }, 2000);
          }
        
      };
    
      get_position() {
        return {
          lat: this.state.points[this.index].latitude,
          lng: this.state.points[this.index].longitude
        };
      }
      handleBackToList = () => {
        this.props.history.push("/");
      };
      handleSearch = (value) => {
        console.log("clicked")
        if(value !==undefined){
          this.props.history.push(`/pointList/${this.state.deviceInfo.id}/browsedRoute/${value}`);
        }
        
      };
    render() {
      
      if (!this.state.isLoading) {
        const fullName = this.state.deviceInfo.nickName !=="N/A" ? this.state.deviceInfo.nickname : "نامشخص";
        const title = "IMEI:" + this.state.deviceInfo.imei;
        return (
        <React.Fragment>
          <SearchNavBar onClickSearch={this.handleSearch}/>
          <StyledButton style={{zIndex:"1", bottom: "0",
            position: "absolute", borderBottomLeftRadius: "0",
            borderTopLeftRadius: "0"}} onClick={()=>this.handleBackToList()} >
              برگشت
          </StyledButton>
        
          <Typography  variant="body2" color="textSecondary" component="p" align="right" 
            style={{fontFamily:"Vazir", fontSize:"20px", backgroundColor:"white", width:"fit-content", 
            right:"5px", position:"absolute"}}>
              {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" align="right" 
            style={{fontFamily:"Vazir", fontSize:"20px", backgroundColor:"white" , width:"fit-content", 
            right:"5px", position:"absolute", marginTop:"25px"}}>
              {fullName}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" align="right" 
            style={{fontFamily:"Vazir", fontSize:"20px", backgroundColor:"white" , width:"fit-content", 
            right:"5px", position:"absolute", marginTop:"50px"}}>
              {this.state.date}
          </Typography>
          <Map 
              center={[this.state.points[this.index].latitude, this.state.points[this.index].longitude]} zoom={15}
              style={{
                      position: "absolute",
                      top: "65px",
                      bottom: 0,
                      width: "100%", zIndex:"-1"}} 
                  >
              <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
         
              <DriftMarker
                // if position changes, marker will drift its way to new position
                position={this.state.latlng}
                // time in ms that marker will take to reach its destination
                duration={1000}>
              </DriftMarker>
          </Map>
        </React.Fragment> 
        )
     
      }else {
         return (
          <React.Fragment>
            <SearchNavBar />
              <div className="alert text-center  mt-5 rtl" role="alert">
                <h5>Loading...</h5>
              </div>
            </React.Fragment>
          ); 
      }
  }
}
export default LeafletDriftMarker;