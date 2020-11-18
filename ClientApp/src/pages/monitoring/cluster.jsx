import React from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import Typography from '@material-ui/core/Typography';
import { iconVisitor, iconMarket } from "../../components/icon";
import Moment from "moment-jalali";

export default function Cluster(props) {
    const { customers, devices } = props;

    return (
        <React.Fragment>
            <Map
                className="markercluster-map"
                center={[36.260464, 59.616756]}
                zoom={10}
                maxZoom={18}
                style={{
                    height: "92.64%",
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
            </Map>

        </React.Fragment>
    );
}
