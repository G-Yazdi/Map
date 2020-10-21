import React, { Component } from 'react';
import { Map, TileLayer, Polyline, Marker} from 'react-leaflet';
import userService from "../services/userService";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
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


class LeafletPolyLineMarker extends Component {
    state = {
        isLoading: true,
        points: '',
        deviceInfo:'',
        date:''
      };
      
    async componentDidMount() {
      const {date, deviceId} = this.props.match.params;
        await userService.getBrowsedRoute(deviceId, date).then(response => {
          const data = response.data;
          if (data !== null && data.deviceInfo !== null) {
            this.setState({ deviceInfo: data.deviceInfo});
          }
          else{
            this.props.history.push(`/notFound`);
          }
          if(data.browsedPoints !== null && data.browsedPoints.length > 0){
            this.setState({ points: data.browsedPoints});
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
    }
    async componentDidUpdate(prevProps) {
      console.log("componentDidUpdate")
      if(this.props.match.params.date !== prevProps.match.params.date) {
        console.log("componentDidUpdate1")
        const {date, deviceId} = this.props.match.params;
        this.setState({isLoading:true});
        await userService.getBrowsedRoute(deviceId, date).then(response => {
            const data = response.data;
            
            if (data !== null && data.deviceInfo !==null) {
              this.setState({ deviceInfo: data.deviceInfo});
            }
            else{
              this.props.history.push(`/notFound`);
            }
            if(data.browsedPoints !== null && data.browsedPoints.length > 0){
              this.setState({ points: data.browsedPoints});
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
      }
    }
    handleBackToList = () => {
        this.props.history.push("/");
    };

    render() {
        if (!this.state.isLoading) {
            const length = this.state.points.length;
            const fullName = this.state.deviceInfo.nickName !=="N/A" ? this.state.deviceInfo.nickname : "نامشخص";
            const title = "IMEI:" + this.state.deviceInfo.imei;
            return<React.Fragment>
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