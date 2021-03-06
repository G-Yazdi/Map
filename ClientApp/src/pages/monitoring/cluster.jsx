import React, {useState, useEffect} from "react";
import { Map, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import Typography from '@material-ui/core/Typography';
import { iconVisitor, iconMarket, iconFlag } from "../../components/icon";
import Moment from "moment-jalali";
import makePure from 'recompose/pure';
import userService from "../../services/mapService";
import Color from "../../components/utils/color";

function Cluster(props) {
    const { customers, devices, checkedDevice, onReciveData, onNoData } = props;

    const[points, setPoints] = useState([]);
    
    const selectColor = () =>{
        let notSelected = Color.filter( item=>{
            return item.selected === false
          });
          if(notSelected){
            notSelected[0].selected = true;
            return notSelected[0].value;
          }
          else return null;
      }

    useEffect(() => {
        const array = Object.entries(checkedDevice);
        const date = new Date();
        const time = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getUTCDate());
        let deviceId = null;
        if(array[0]){
            if(array[0][1]){
                deviceId = array[0][0];
            }
            else{
                let item = Color.find(item=>item.value === points[`${array[0][0]}`].color);
                item.selected = false;
                setPoints({...points, [`${array[0][0]}`]:''});
                onReciveData(array[0][0]);
            }
        }

    async function fetchData() {
      await userService.getBrowsedRoute(deviceId, time).then(response => {
        const data = response.data;

        if(data.browsedPoints !== null && data.browsedPoints.length > 0){
            setPoints({...points, [`${deviceId}`]:{data:data.browsedPoints, color:selectColor()}});
            onReciveData(deviceId);
        }
        else{
            onNoData(deviceId);
        }
      })
      .catch(error => {
        console.log("error", error);
      });
    }
    if(deviceId)
        fetchData();
  
      }, [checkedDevice]);

    return (
        <React.Fragment>
            <Map
                className="markercluster-map"
                center={[36.260464, 59.616756]}
                zoom={10}
                maxZoom={18}
                style={{
                    height: "93.64%",
                    position: "absolute",
                    bottom: 0,
                    width: "100%",
                    zIndex: "-1",
                    outline: "none"
                }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {devices.map(item => {
                    if (item.locationLatitude && item.locationLongitude) {
                        return <Marker key={item.deviceId} position={[item.locationLatitude, item.locationLongitude]} icon={iconVisitor}>
                            <Popup className="myLeaflet">
                                <Typography align="center" style={{
                                    fontFamily: "Vazir", fontSize: "13px",
                                    lineHeight: "30px", width:"124px"
                                }}>
                                    نام: &nbsp;
                              {item.deviceNickname === "N/A" ? "نامشخص" : item.deviceNickname}
                                    <br />
                              IMEI:
                              {item.deviceIMEI}
                                </Typography>
                                <Typography align="left" style={{
                                    fontFamily: "Vazir", fontSize: "11px", fontWeight:"bold",
                                    lineHeight: "20px", width:"100px"}}>
                                    <img src={require("../../images/time.png").default}  style={{height:"13px", display: "inline-block", marginLeft: "-8px",
                                        marginRight: "5px", marginBottom: "-1px"}}/> 
                                    {` ${new Date(item.locationTime).toLocaleDateString('fa-IR') ==
                                        new Date().toLocaleDateString('fa-IR') ? "" : new Date(item.locationTime).toLocaleDateString('fa-IR') + "-"}`}
                                    {` ${Moment(item.locationTime).format("HH:mm")}`}
                                </Typography>
                            </Popup>
                        </Marker>;
                    }
                    else return null;
                })}
                <MarkerClusterGroup>
                    {customers.map(item =>
                        <Marker key={item.id} position={[item.locationLatitude, item.locationLongitude]} icon={iconMarket}>
                            <Popup className="myLeaflet1">
                                <Typography align="right" style={{
                                    fontFamily: "Vazir", fontSize: "13px",
                                    lineHeight: "30px", width:"190px"
                                }}>
                                    نام: &nbsp;
                        {item.name}
                                    <br />
                        آدرس: &nbsp;
                        {item.address}
                                </Typography>
                            </Popup>
                        </Marker>)}
                </MarkerClusterGroup>
                {
                Object.values(points)?.map((point, index)=>{
                    if(point===""){
                        return;
                    }
                    return <React.Fragment key={index}>
                        <Marker position={[point.data[0].lat, point.data[0].lng]} icon={iconFlag} style={{width:"100px"}}></Marker>
                        {point.data.map((item, index) => {
                                                let prevItem = index > 0 ? point.data[index - 1] : item;
                                                return <Polyline key={index} positions={[
                                                        [prevItem.lat, prevItem.lng], [item.lat, item.lng],
                                                        ]} color={point.color} />
                                            })}
                    </React.Fragment>
                    
                                            
                })}
            </Map>

        </React.Fragment>
    );
}
export default makePure(Cluster);
