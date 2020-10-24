import React, { Component } from 'react';
import { Map, TileLayer, Marker} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Image from "../images/unavailable.png";
import { withStyles } from "@material-ui/core/styles";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png').default,
    iconUrl: require('leaflet/dist/images/marker-icon.png').default,
    shadowUrl: require('leaflet/dist/images/marker-shadow.png').default
});
const useStyles = (theme) => ({
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
    singleMap: {
        position: "absolute",
        top: 0,
        bottom: 0,
        width: "100%", 
        zIndex:"-1"
      },
      multipleMap: {
        height: '200px'
      }
  });

  class LeafLetMap extends Component {

    render() {
        const {longitude, latitude, singleMode, classes} = this.props;
        if(longitude && latitude){
            return (
                <Map 
                center={[latitude, longitude]} 
                zoom={15} 
                className={singleMode? classes.singleMap : classes.multipleMap}
                zoomControl={false}
                doubleClickZoom= {false}
                closePopupOnClick= {false}
                dragging= {false}
                zoomSnap= {false}
                zoomDelta= {false}
                trackResize= {false}
                touchZoom= {false}
                scrollWheelZoom= {false}
                attributionControl={false}
                >
                    <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[latitude, longitude]}/>
                
                </Map>
            );
        }
        else{
            return <img src={Image} alt="unavailable" style={{height: '200px', width:"300px"}}/>;
        }
            

     }
 }
 export default withStyles(useStyles)(LeafLetMap);