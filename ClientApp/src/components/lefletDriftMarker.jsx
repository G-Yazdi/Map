import React, { Component } from 'react';
import { Map, TileLayer} from 'react-leaflet';
import { DriftMarker } from "leaflet-drift-marker";
 
class LeafletDriftMarker extends Component {
    _isMounted = false;
    index = 0;
    constructor(props) {
        super(props)
    }
    state = {
        latlng: this.get_position()
      };
 
      componentDidMount() {
        this.repeat();
      }
    
      repeat = () => {
          console.log("length", this.props.data.length);
          console.log("index", this.index);

          this.index++;
          if(this.index < this.props.data.length){
            setTimeout(() => {
                // updates position every 5 sec
                this.setState({ latlng: this.get_position() }, this.repeat);
              }, 2000);
          }
        
      };
    
      get_position() {
        return {
          lat: this.props.data[this.index].latitude,
          lng: this.props.data[this.index].longitude
        };
      }
    render() {
        return <Map 
                center={[this.props.data[this.index].latitude, this.props.data[this.index].longitude]} zoom={15}
                style={{
                    position: "absolute",
                    top: "65px",
                    bottom: 0,
                    width: "100%", zIndex:"-1"}} 
                >
                    <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
         
        <DriftMarker
            // if position changes, marker will drift its way to new position
            position={this.state.latlng}
            // time in ms that marker will take to reach its destination
            duration={2000}>
        </DriftMarker>
    </Map>
    }
}
export default LeafletDriftMarker;