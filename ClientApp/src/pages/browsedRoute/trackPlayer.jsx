import React, { useState, useEffect, useContext } from "react";
import "./TrackPlayer.css";
import LeafletReactTrackPlayer from "../../components/leaflet-react-track-player";
import userService from "../../services/userService";
import { Map, TileLayer } from "react-leaflet";
import DeviceInfoCard from "../../components/deviceInfoCard";
import MovingInfoCard from "../../components/movingInfoCard";
import ErrorPage from "../../components/errorPage";
import {connect} from "react-redux";
import Moment from "moment-jalali";


const TrackPlayer = (props)=>{
  const [isLoading, setIsLoading]=useState(true);
  const [points, setPoints]=useState('');
  const [deviceInfo, setDeviceInfo]=useState('');
  const [date, setDate]=useState("");
  const [pointsErrorMessage, setPointsErrorMessage]=useState('');
  const [deviceErrorMessage, setDeviceErrorMessage]=useState('');
  const [serverErrorMessage, setServerErrorMessage]=useState('');
  const[speed, setSpeed]= useState(0);

  useEffect(() => {
    const {date:paramDate, deviceId} = props.match.params;
    setIsLoading(true);
    setPoints('');
    setPointsErrorMessage('');
    setDeviceErrorMessage('');
    setServerErrorMessage('');
    
    async function fetchData() {
      await userService.getBrowsedRoute(deviceId, paramDate).then(response => {
        const data = response.data;
        if (data && data.deviceInfo) {
          setDeviceInfo(data.deviceInfo);
          setDate(new Date(paramDate).toLocaleDateString('fa-IR'));
        }
        else{
          setDeviceErrorMessage( "اطلاعات دستگاه مورد نظر یافت نشد");
          setIsLoading(false);
          return;
        }
        if(data.browsedPoints !== null && data.browsedPoints.length > 0){
            setPoints(data.browsedPoints);
            setIsLoading(false);
        }
        else{
          setPointsErrorMessage("اطلاعات مسیر طی شده در تاریخ مورد نظر موجود نمی باشد");
          setIsLoading(false);
          return;
        }
      })
      .catch(error => {
        console.log("error", error);
        setServerErrorMessage("در حال حاضر امکان برقراری ارتباط با سرور وجود ندارد");
        setIsLoading(false);
      });
    }
    fetchData();
  }, [JSON.stringify(props.match.params)]);
  
  if(!isLoading){
    if(serverErrorMessage){
      return <ErrorPage errorMessage={serverErrorMessage}/>
    }
    let cardComponent = null;
    let mapComponent = null;
    let movingInfoComponent = null;
    if(!deviceErrorMessage){
      const fullName = deviceInfo.nickName !=="N/A"? deviceInfo.nickName: "نام و نام خانوادگی";
      cardComponent =<DeviceInfoCard fullName={fullName} 
                      imei={deviceInfo.imei} 
                      simNumber={deviceInfo.simNumber} 
                      date={date}
                      />
          if(!pointsErrorMessage){
            movingInfoComponent =<MovingInfoCard speed={props.speed}
                      time={Moment(props.time).format("HH:mm")}
                      />
            const position = [points[0].lat, points[0].lng];
            mapComponent = <div className="TrackPlayer">
            <Map center={position} zoom={15} style={{
                        position: "absolute",
                        bottom:0,
                        height: "93.64%",
                        width: "100%", zIndex:"0"}} >
              
              <LeafletReactTrackPlayer
                  autoplay={false}
                  track={points}
                  progressFormat="default"
                  customMarker={true}
                  defaultSpeed={10}
                  streamData={false}
                  changeCourseCustomMarker={true}
                  iconCustomMarker={require('../../images/Visitors.png').default}/>
              <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            </Map>
          </div>
        
            }else{
              mapComponent = <ErrorPage errorMessage={pointsErrorMessage}/>
              movingInfoComponent = null;
            }
        }else{
          cardComponent = <ErrorPage errorMessage={deviceErrorMessage}/>
        }
        return<React.Fragment>
          {cardComponent}
          {movingInfoComponent}
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

const mapStateToProps = state => {
  return {
    speed: state.speed,
    time: state.time
  };
};
export default connect(mapStateToProps)(TrackPlayer);
