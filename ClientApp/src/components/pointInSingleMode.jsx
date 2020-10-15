import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import React from "react";
import Moment from "moment";
import LeafLetMap from "./leafletMap";
import Grid from "@material-ui/core/Grid";
import LeafletDriftMarker from "./lefletDriftMarker";
import LeafletPolyLineMarker from "./leafletPolyLineMarker";


const StyledButton = withStyles({
  root: {
    background: "linear-gradient(45deg, #846bfe, #846bfe)",
    border: 0,
    color: "white",
    height: 30,
    size: "small",
    fontFamily:"vazir"
  },
})(Button);

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: "100%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    flexWrap: "wrap",
    height: "100%",
  },
  media: {
    paddingTop: "0.25%", // 16:9
  },
}));
const PostInSingleMode = (props) => {
  const classes = useStyles();
  const { point, onClickBackToList, polyLineData, polyLineMode } = props;
  console.log("dataaa:", polyLineData);
  let str = point.locationTime;
  let formatedDate = Moment(str).fromNow();
  const fullName = point.deviceNickname !=="N/A" ? point.deviceNickname : "نامشخص";
  const title = "IMEI:" + point.deviceIMEI;
  return (
    <React.Fragment>
      <StyledButton style={{zIndex:"1", bottom: "0",
        position: "absolute", borderBottomLeftRadius: "0",
        borderTopLeftRadius: "0"}} onClick={() => onClickBackToList()}>
          برگشت
        </StyledButton>
        
        <Typography  variant="body2" color="textSecondary" component="p" align="right" style={{fontFamily:"Vazir", fontSize:"20px", backgroundColor:"white", width:"fit-content", right:"5px", position:"absolute"}}>
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p" align="right" style={{fontFamily:"Vazir", fontSize:"20px", backgroundColor:"white" , width:"fit-content", right:"5px", position:"absolute", marginTop:"25px"}}>
          {formatedDate}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p" align="right" style={{fontFamily:"Vazir", fontSize:"20px", backgroundColor:"white" , width:"fit-content", right:"5px", position:"absolute", marginTop:"50px"}}>
          {fullName}
        </Typography>
        {polyLineData && !polyLineMode && polyLineData.length > 1 ? 
        <Grid position="relative" >
          <LeafletDriftMarker data={polyLineData}/>
        </Grid>
        : polyLineData && polyLineMode && polyLineData.length > 1 ?
        <Grid position="relative" >
          <LeafletPolyLineMarker data={polyLineData}/>
        </Grid>
        : <LeafLetMap 
          longitude={point.locationLongitude} 
          latitude= {point.locationLatitude} 
          singleMode={true}/> }
    </React.Fragment>
    
  );
};

export default PostInSingleMode;