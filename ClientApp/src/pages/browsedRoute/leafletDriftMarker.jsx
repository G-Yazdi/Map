import React, { Component, useEffect, useState, useRef } from 'react';
import { Map, TileLayer, Polyline, Popup} from 'react-leaflet';
import { DriftMarker } from "leaflet-drift-marker";
import userService from "../../services/userService";
import Typography from "@material-ui/core/Typography";
import Card from "../../components/card";
import Moment from "moment";
import ErrorPage from "../../components/errorPage";
import {iconVisitor} from "../../components/icon";
 


// class LeafletDriftMarker extends Component {
//     _index = 0;
//     _isMounted = false;
//     constructor(props) {
//       super(props);
//       console.log("driftconstructor")
//       this.state = {
//         isLoading: true,
//         points: '',
//         deviceInfo:'', 
//         pointInfo: {lat:'', lng:'', speed:'', time:''},
//         date:'',
//         pointsErrorMessage: '',
//         deviceErrorMessage: '',
//         serverErrorMessage:''
//       };
//     }
    
 
//     async componentDidMount() {
//       console.log("driftcomponentDidMount1")
//       this._isMounted = true;
//       const {date, deviceId} = this.props.match.params;
//       await userService.getBrowsedRoute(deviceId, date).then(response => {
//           const data = response.data;
          
//           if (data && data.deviceInfo) {
//             if(this._isMounted)
//               this.setState({ deviceInfo: data.deviceInfo, date: new Date(date).toLocaleDateString('fa-IR')});
//           }
//           else{
//             if(this._isMounted)
//               this.setState({deviceErrorMessage: "اطلاعات دستگاه مورد نظر یافت نشد", isLoading:false});
//               // this.setState({deviceErrorMessage: "اطلاعات دستگاه مورد نظر یافت نشد"}, ()=>this.props.handler());
            
//             return;
//           }
//           if(data.browsedPoints !== null && data.browsedPoints.length > 0 && this._isMounted){
//             this.setState({ points: data.browsedPoints});
//             this.setState(() => ({ pointInfo: this.get_position()}));
//             this.setState({isLoading:false})
//           }
//           else{
//             if(this._isMounted)
//               this.setState({pointsErrorMessage: "اطلاعات مسیر طی شده در تاریخ مورد نظر موجود نمی باشد", isLoading:false});
//             return;
//           }

//       })
//       .catch(error => {
//         console.log("error", error);
//         if(this._isMounted)
//           this.setState({serverErrorMessage: "در حال حاضر امکان برقراری ارتباط با سرور وجود ندارد", isLoading:false});
//         return;
//       });
//       if(this.state.points){
//         this.repeat();
//       }
          
//     }

//      async componentDidUpdate(prevProps) {
//        console.log("[drift] componentDidUpdate")
//         if(this.props.match.params.date !== prevProps.match.params.date) {
//           console.log("[drift] componentDidUpdate1")
//           this._isMounted = true;
//           this._index = 0;
//           const {date, deviceId} = this.props.match.params;
//           this.setState({isLoading: true});
//           this.setState({pointsErrorMessage: '', deviceErrorMessage: '', serverErrorMessage: '', points:''});
//           await userService.getBrowsedRoute(deviceId, date).then(response => {
//               const data = response.data;
//               console.log("[drift] componentDidUpdate2")
//               if (data  && data.deviceInfo ) {
//                 if(this._isMounted)
//                   this.setState({ deviceInfo: data.deviceInfo, date: new Date(date).toLocaleDateString('fa-IR')});
//               }
//               else{
//                 if(this._isMounted)
//                   this.setState({deviceErrorMessage: "اطلاعات دستگاه مورد نظر یافت نشد", isLoading:false});
//                   // this.setState({deviceErrorMessage: "اطلاعات دستگاه مورد نظر یافت نشد"}, ()=>this.props.handler());
//                 return;
//               }
//               if(data.browsedPoints && data.browsedPoints.length > 0){
//                 if(this._isMounted)
//                 {
//                   this.setState({ points: data.browsedPoints});
//                   this.setState(() => ({ pointInfo: this.get_position()}));
//                   this.setState({isLoading:false})
//                 }
//               }
//               else{
//                 if(this._isMounted)
//                   this.setState({pointsErrorMessage: "اطلاعات مسیر طی شده در تاریخ مورد نظر موجود نمی باشد", isLoading:false});
//               return;
//               }
//           })
//           .catch(error => {
//             console.log("error", error);
//             if(this._isMounted)
//               this.setState({serverErrorMessage: "در حال حاضر امکان برقراری ارتباط با سرور وجود ندارد", isLoading:false});
//             return;
//         });
//           if(this.state.points){
//             this.repeat();
//           }
//         }
//       }
//       componentWillUnmount() {
//         this._isMounted = false;
//         console.log("driftcomponentWillUnmount")
//       }
//       repeat = () => {
//           if(this._index < this.state.points.length-1){
//             this._index++;
//             setTimeout(() => {
//               if(this._isMounted){
//                 this.setState({ pointInfo: this.get_position() }, this.repeat);
//               }
//             }, 2000);
//           }
        
//       };
    
//       get_position = () =>{
//       if(this.state.points){
//           return {
//             lat: this.state.points[this._index].latitude,
//             lng: this.state.points[this._index].longitude,
//             speed: this.state.points[this._index].speed,
//             time: this.state.points[this._index].time
//           };
//         }
//       }
      
//     render() {
//       if (!this.state.isLoading) {
//         if(this.state.serverErrorMessage){
//           return <ErrorPage errorMessage={this.state.serverErrorMessage}/>
//         }
//         let cardComponent = null;
//         let mapComponent = null;
//         if(!this.state.deviceErrorMessage){
//           const fullName = this.state.deviceInfo.nickName !=="N/A"? this.state.deviceInfo.nickName: "نام و نام خانوادگی";
//           cardComponent = <Card fullName={fullName} 
//                   imei={this.state.deviceInfo.imei} 
//                   simNumber={this.state.deviceInfo.simNumber} 
//                   date={this.state.date}
//               />
//           if(!this.state.pointsErrorMessage){
//             mapComponent = <Map center={[this.state.points[0].latitude, this.state.points[0].longitude]} zoom={15}
//                                 style={{
//                                         position: "absolute",
//                                         top: "65px",
//                                         bottom: 0,
//                                         width: "100%", z_index:"-1"
//                                       }} 
//                             >
//                                 <TileLayer
//                                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                                 />
//                                 {this.state.points.map((item, _index) => {
//                                           let prevItem = _index > 0 ? this.state.points[_index - 1] : item;
//                                           return <Polyline key={_index} positions={[
//                                                   [prevItem.latitude, prevItem.longitude], [item.latitude, item.longitude],
//                                                   ]} color={'red'} />
//                                 })}
//                                 <DriftMarker
//                                   // if position changes, marker will drift its way to new position
//                                   position={[this.state.pointInfo.lat, this.state.pointInfo.lng]}
//                                   // time in ms that marker will take to reach its destination
//                                   duration={1000}
//                                   icon={iconVisitor}>
//                                     <Popup>
//                                       <Typography align="right" style={{fontFamily:"Vazir"}}>
//                                           سرعت: 
//                                           {` ${this.state.pointInfo.speed}` }
//                                           <br/>
//                                           زمان: 
//                                           {` ${Moment(this.state.pointInfo.time).format("HH:mm:ss")}`}
//                                       </Typography>
                                    
//                                     </Popup>
//                                 </DriftMarker>
//                             </Map>
//             }else{
//               mapComponent = <ErrorPage errorMessage={this.state.pointsErrorMessage}/>
//             }
//         }else{
//           cardComponent = <ErrorPage errorMessage={this.state.deviceErrorMessage}/>
//         }
//         return<React.Fragment>
//           {cardComponent}
//           {mapComponent}
//         </React.Fragment>
//       }else {
//          return (
//           <React.Fragment>
//               <div className="alert text-center  mt-5 rtl" role="alert">
//                 <h5 style={{position: "absolute", top: "70px"}}>Loading...</h5>
//               </div>
//             </React.Fragment>
//           ); 
//       }
//   }
// }
// export default LeafletDriftMarker;

const LeafletDriftMarker = (props)=>{
  let _index = 0;
  let _isMounted = true;
  const unmounted = useRef(false);
  const [isLoading, setIsLoading]=useState(true);
  const [points, setPoints]=useState('');
  const [pointInfo, setPointInfo]=useState({lat:'', lng:'', speed:'', time:''});
  const [deviceInfo, setDeviceInfo]=useState('');
  const [date, setDate]=useState("");
  const [pointsErrorMessage, setPointsErrorMessage]=useState('');
  const [deviceErrorMessage, setDeviceErrorMessage]=useState('');
  const [serverErrorMessage, setServerErrorMessage]=useState('');



  const repeat = () => {
    if(_index < points.length-1){
      _index++;
      setTimeout(() => {
        if(_isMounted){
          setPointInfo(get_position());
          repeat();
        }
      }, 2000);
    }
  };

  const get_position = () =>{
    if(points){
        return {
          lat: points[_index].lat,
          lng: points[_index].lng,
          speed: points[_index].speed,
          time: points[_index].time
        };
    }
  };

  useEffect(() => {
    _isMounted = true;
    console.log("heyyyyyyyyyyyyyyy1")
    const {date:paramDate, deviceId} = props.match.params;
    setIsLoading(true);
    setPoints('');
    setPointsErrorMessage('');
    setDeviceErrorMessage('');
    setServerErrorMessage('');

    async function fetchData() {
      await userService.getBrowsedRoute(deviceId, paramDate)
      .then(response => {
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
          console.log("point1", data)
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
    console.log("points:", points)
    if(points){
      console.log("yess", points)
      repeat();
    }
    return () => {
       _isMounted = false;
       console.log("heyyyyyyyyyyyyyyy")
     }
  }, [JSON.stringify(props.match.params)]);
 
  if (!isLoading) {
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
        mapComponent = <Map center={[points[0].lat, points[0].lng]} zoom={15}
        style={{
          position: "absolute",
          top: "64px",
          height: "495px",
          zIndex:0
        }}>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            {points.map((item, _index) => {
                                      let prevItem = _index > 0 ? points[_index - 1] : item;
                                      return <Polyline key={_index} positions={[
                                              [prevItem.lat, prevItem.lng], [item.lat, item.lng],
                                              ]} color={'red'} />
                            })}
                            <DriftMarker
                              // if position changes, marker will drift its way to new position
                              position={[pointInfo.lat, pointInfo.lng]}
                              // time in ms that marker will take to reach its destination
                              duration={1000}
                              icon={iconVisitor}>
                                <Popup>
                                  <Typography align="right" style={{fontFamily:"Vazir"}}>
                                      سرعت: 
                                      {` ${pointInfo.speed}` }
                                      <br/>
                                      زمان: 
                                      {` ${Moment(pointInfo.time).format("HH:mm:ss")}`}
                                  </Typography>
                                
                                </Popup>
                            </DriftMarker>
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
export default LeafletDriftMarker;