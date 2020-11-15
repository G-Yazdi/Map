import React from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import Typography from '@material-ui/core/Typography';
import {iconVisitor, iconMarket} from "../../components/icon";
import Moment from "moment";

export default function Cluster(props) {
  const {customers, devices} = props;
  return (
    <React.Fragment>
      <Map
        className="markercluster-map"
        center={[36.260464, 59.616756]}
        zoom={10}
        maxZoom={18}
        style={{height:"92.64%",
        position: "absolute",
        top: "65px",
        bottom: 0,
        width: "100%",
        zIndex: "-1",
        outline: "none"}}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {devices.map(item=>{
            if(item.locationLatitude && item.locationLongitude){
                console.log("item", item);
              return <Marker key={item.deviceId} position={[item.locationLatitude, item.locationLongitude]} icon={ iconVisitor }>
                      <Popup className="leaflet">
                        <Typography align="right" style={{fontFamily:"Vazir", fontSize: "13px",
                              lineHeight: "30px"}}>
                              نام: &nbsp; 
                              {item.deviceNickname === "N/A"? "نامشخص": item.deviceNickname}
                              <br/>
                              IMEI: 
                              {item.deviceIMEI}
                              <br/>
                              زمان: 
                              {` ${Moment(item.locationTime).format("HH:mm:ss")}`}
                        </Typography>
                </Popup>
              </Marker>;
            }
            else return null;
        })}
        <MarkerClusterGroup>
            {customers.map(item=>
            <Marker key={item.id} position={[item.locationLatitude, item.locationLongitude]} icon={ iconMarket }>
                <Popup className="leaflet">
                  <Typography align="right" style={{fontFamily:"Vazir", fontSize: "13px",
                        lineHeight: "30px"}}>
                        نام: &nbsp; 
                        {item.name}
                        <br/>
                        آدرس: &nbsp; 
                        {item.address}
                  </Typography>
                </Popup>
            </Marker>)}
        </MarkerClusterGroup>
      </Map>
    
    </React.Fragment>
    );
}
