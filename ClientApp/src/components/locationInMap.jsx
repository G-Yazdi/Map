import React, { Component } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import LeafletDriftMarker from "./lefletDriftMarker";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});
const useStyles = (theme) => ({
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
    map: {
        height: "100%"
      }
  });
  
class LocationInMap extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { classes } = this.props;
        const {polyLineData} = this.props;
            return(
                <Grid position="relative" >
                    <LeafletDriftMarker data={polyLineData}/>
                </Grid>
                );
                    
        }
 }
 export default withStyles(useStyles)(LocationInMap);

 