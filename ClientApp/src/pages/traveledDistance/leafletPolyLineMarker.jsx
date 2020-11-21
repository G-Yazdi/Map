import React, { useEffect, useState } from 'react';
import { Map, TileLayer, Polyline, Marker} from 'react-leaflet';
import userService from "../../services/userService";
import Card from "../../components/deviceInfoCard";
import {iconVisitor} from "../../components/icon";
import ErrorPage from "../../components/errorPage";


const LeafletPolyLineMarker = (props)=>{
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
      console.log("date", paramDate)
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
            const length = points.length;
            mapComponent = <Map 
                      center={[points[length-1].lat, points[length-1].lng]} zoom={15}
                      style={{
                        position: "absolute",
                        top: "65px",
                        height:"92.64%",
                        width: "100%", zIndex:"0"}}
                      >
                      <TileLayer
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      <Marker position={[points[length - 1].lat, points[length - 1].lng]} icon={ iconVisitor }/>
                      {points.map((item, index) => {
                          let prevItem = index > 0 ? points[index - 1] : item;
                          return <Polyline key={index} positions={[
                                  [prevItem.lat, prevItem.lng], [item.lat, item.lng],
                                  ]} color={'red'} />
                      })}
                  </Map>
          
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

export default LeafletPolyLineMarker;