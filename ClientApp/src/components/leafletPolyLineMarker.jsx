import React, { Component } from 'react';
import { Map, TileLayer, Polyline, Marker} from 'react-leaflet';

class LeafletPolyLineMarker extends Component {
   
    render() {
        const {data} = this.props;
        const length = data.length;
        return <Map 
                center={[data[length - 1].latitude, data[length - 1].longitude]} zoom={15}
                style={{
                    position: "absolute",
                    top: "65px",
                    bottom: 0,
                    width: "100%", zIndex:"-1"}} 
                >
                    <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
         <Marker position={[data[length - 1].latitude, data[length - 1].longitude]}/>
        {data.map((item, index) => {
            let prevItem = index > 0 ? data[index - 1] : item;
            return <Polyline key={index} positions={[
                    [prevItem.latitude, prevItem.longitude], [item.latitude, item.longitude],
                    ]} color={'red'} />
        })}
    </Map>
    }
}
export default LeafletPolyLineMarker;