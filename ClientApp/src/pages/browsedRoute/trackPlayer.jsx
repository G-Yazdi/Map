import React, { useState, useEffect } from "react";
import "./TrackPlayer.css";
import LeafletReactTrackPlayer from "leaflet-react-track-player";
import userService from "../../services/userService";
import { Map, TileLayer } from "react-leaflet";
import Card from "../../components/card";
import ErrorPage from "../../components/errorPage";


const TrackPlayer = (props)=>{
  const [isLoading, setIsLoading]=useState(true);
  const [points, setPoints]=useState('');
  const [deviceInfo, setDeviceInfo]=useState('');
  const [date, setDate]=useState("");
  const [pointsErrorMessage, setPointsErrorMessage]=useState('');
  const [deviceErrorMessage, setDeviceErrorMessage]=useState('');
  const [serverErrorMessage, setServerErrorMessage]=useState('');


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
            console.log("trackPlayerPoints2", points.length)
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
    if(!deviceErrorMessage){
      const fullName = deviceInfo.nickName !=="N/A"? deviceInfo.nickName: "نام و نام خانوادگی";
      cardComponent = <Card fullName={fullName} 
                      imei={deviceInfo.imei} 
                      simNumber={deviceInfo.simNumber} 
                      date={date}
                      />
          if(!pointsErrorMessage){
            const position = [points[0].lat, points[0].lng];
            mapComponent = <div className="TrackPlayer">
            <Map center={position} zoom={15} style={{
                        position: "absolute",
                        top: "65px",
                        height: "811px",
                        width: "100%", zIndex:"0"}} >
              
              <LeafletReactTrackPlayer
                  autoplay={false}
                  track={points}
                  progressFormat="default"
                  customMarker={true}
                  defaultSpeed={10}
                  streamData={false}
                  changeCourseCustomMarker={true}
                  iconCustomMarker={require('../../images/Visitors.png').default}
              />
              <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            </Map>
          </div>
        
            }else{
              mapComponent = <ErrorPage errorMessage={pointsErrorMessage}/>
            }
        }else{
          cardComponent = <ErrorPage errorMessage={deviceErrorMessage}/>
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

export default TrackPlayer;
