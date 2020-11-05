import React, { Component } from "react";
import "./TrackPlayer.css";
import LeafletReactTrackPlayer from "leaflet-react-track-player";
import demo from "../services/demo";
import { Map, TileLayer } from "react-leaflet";

class TrackPlayer extends Component {
  state = {
    lat: 47.445745,
    lng: 40.272891666666666,
    zoom: 14,
    type: "distance",
    demo: demo,
    show: true
  };
  render() {
    const position = [demo[demo.length - 1].lat, demo[demo.length - 1].lng];
    return (
      <div className="TrackPlayer">
        <button onClick={() => this.setState({show: !this.state.show})}>ss</button>
        <Map center={position} zoom={this.state.zoom}>
          {this.state.show ? (
            <LeafletReactTrackPlayer
              autoplay={false}
              track={this.state.demo}
              optionMultyIdxFn={function(p) {
                return p.status;
              }}
              optionsMulty={[
                { color: "#b1b1b1" },
                { color: "#06a9f5" },
                { color: "#202020" },
                { color: "#D10B41" },
                { color: "#78c800" }
              ]}
              useControl={true}
              progressFormat={this.state.type}
              customMarker={true}
              defaultSpeed={10}
              streamData={false}
              changeCourseCustomMarker={true}
              iconCustomMarker={require('../images/Visitors.png').default}
            />
          ) : null}
          <TileLayer
            attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </Map>
      </div>
    );
  }
}

export default TrackPlayer;
