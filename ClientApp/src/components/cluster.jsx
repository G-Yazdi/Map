import React from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import Typography from '@material-ui/core/Typography';
import L from 'leaflet';
import {iconPerson} from "./icon"; 

export default function Cluster(props) {
  const {customers, devices} = props;
  console.log("devices:", devices)
  return (
    <Map
      className="markercluster-map"
      center={[36.260464, 59.616756]}
      zoom={12}
      maxZoom={18}
      style={{height:"100vh"}}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {devices.map(item=>{
          if(item.locationLatitude && item.locationLongitude){
              console.log("item", item);
            return <Marker key={item.deviceId} position={[item.locationLatitude, item.locationLongitude]} icon={ iconPerson }/>;
          }
          else return null;
      })}
      <MarkerClusterGroup>
          {customers.map(item=><Marker key={item.id} position={[item.locationLatitude, item.locationLongitude]}>
              <Popup>
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
  );
}
