import React, { Component } from 'react';
import { Map, TileLayer} from 'react-leaflet';
import { DriftMarker } from "leaflet-drift-marker";
import userService from "../services/userService";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import SearchNavBar from "./searchNavBar";
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
    constructor(props) {
      super(props);
      this.state = {
        isLoading: true,
          points: '',
          deviceInfo:'', 
          latlng: '',
          date:''
        };
    }
    
 
    async componentDidMount() {
      this._isMounted = true;
      const {date, deviceId} = this.props.match.params;
      this.setState({date});
      await userService.getBrowsedRoute(deviceId, date).then(response => {
          const data = response.data;
          if (data !== null && data.deviceInfo !== null) {
            this.setState({ deviceInfo: data.deviceInfo});
          }
          else{
            this.props.history.push(`/notFound`);
          }
          if(data.browsedPoints !== null && data.browsedPoints.length > 0 && this._isMounted){
            this.setState({ points: data.browsedPoints});
            this.setState(() => ({ latlng: this.get_position()}));
            this.setState({ isLoading:false});
          }
          else{
            this.setState({ isLoading:true});
          }
      })
      .catch(error => {
          console.log("error", error);
          this.props.history.push(`/notFound`);
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
          this.setState({date});
          await userService.getBrowsedRoute(deviceId, date).then(response => {
              const data = response.data;
              
              if (data !== null && data.deviceInfo !==null) {
                this.setState({ deviceInfo: data.deviceInfo});
              }
              else{
                this.props.history.push(`/notFound`);
              }
              if(data.browsedPoints !== null && data.browsedPoints.length > 0){
                this._isMounted = true;
                this.setState({ points: data.browsedPoints});
                this.setState(() => ({ latlng: this.get_position()}));
                this.setState({ isLoading:false});
              }
              else{
                this.setState({points:''});
              }
          })
          .catch(error => {
            console.log("error", error);
            this.props.history.push(`/notFound`);
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
                this.setState({ latlng: this.get_position() }, this.repeat);
              }
            }, 2000);
          }
        
      };
    
      get_position = () =>{
        if(this._isMounted){
          return {
            lat: this.state.points[this.index].latitude,
            lng: this.state.points[this.index].longitude
          };
        }
      }
      handleBackToList = () => {
        this.props.history.push("/");
      };
      handleSearch = () => {
        this._isMounted = false;
        this.setState({isLoading:true})
        this.props.history.push(`/pointList/${this.state.deviceInfo.id}/browsedRoute/${this.state.date}`);
      };

      handleChange = (event) => {
        let state = [...this.state.date];
        state = event.target.value;
        this.setState({date: state});
      };
    render() {
      
      if (!this.state.isLoading) {
        const fullName = this.state.deviceInfo.nickName !=="N/A" ? this.state.deviceInfo.nickname : "نامشخص";
        const title = "IMEI:" + this.state.deviceInfo.imei;
        return (
        <React.Fragment>
          <SearchNavBar onClickSearch={this.handleSearch} onChange={this.handleChange} date={this.state.date}/>
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
            <SearchNavBar onClickSearch={this.handleSearch} onChange={this.handleChange} date={this.state.date}/>
              <div className="alert text-center  mt-5 rtl" role="alert">
                <h5>Loading...</h5>
              </div>
            </React.Fragment>
          ); 
      }
  }
}
export default LeafletDriftMarker;