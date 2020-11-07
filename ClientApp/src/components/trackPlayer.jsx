import React, { useState, useEffect } from "react";
import "./TrackPlayer.css";
import LeafletReactTrackPlayer from "leaflet-react-track-player";
import userService from "../services/userService";
import { Map, TileLayer } from "react-leaflet";


const TrackPlayer = (props)=>{
  const [isLoading, setIsLoading]=useState(true);
  const [points, setPoints]=useState('');


  useEffect(() => {
    console.log("trackPlayerProps", props.match.params)
    const {date, deviceId} = props.match.params;
    setIsLoading(true);
    setPoints('');
    async function fetchData() {
      await userService.getBrowsedRoute(deviceId, date).then(response => {
        const data = response.data;
        if(data.browsedPoints !== null && data.browsedPoints.length > 0){
            setPoints(data.browsedPoints);
            setIsLoading(false);
        }
      })
      .catch(error => {
        console.log("error", error);
      });
    }
    fetchData();
  }, [JSON.stringify(props.match.params)]);

  if(!isLoading){
      const position = [points[0].lat, points[0].lng];
      return (
        <div className="TrackPlayer">
          <Map center={position} zoom={15} style={{
                                        position: "absolute",
                                        top: "64px",
                                        height: "495px",
                                        zIndex:0
                                      }} >
            
              <LeafletReactTrackPlayer
                autoplay={false}
                track={points}
                progressFormat="default"
                customMarker={true}
                defaultSpeed={10}
                streamData={false}
                changeCourseCustomMarker={true}
                iconCustomMarker={require('../images/Visitors.png').default}
              />
            <TileLayer
              attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </Map>
        </div>
      );
    }
    else{
      return null;
    }
}

export default TrackPlayer;
