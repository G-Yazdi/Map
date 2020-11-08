import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import React from "react";
import LeafLetMap from "./leafletMap";
import Moment from "moment";



const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 300,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    height: "100%",
  },
  media: {
    height: 200,
    paddingTop: "0.25%",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const PointInMultipleMode = (props) => {
  const classes = useStyles();
  const { point, onClickBrowsRoute, onClickDisplayTraveledDistance} = props;
  let str = point.locationTime;
  console.log("str", str)
  let formatedDate = str? Moment(str).fromNow(): " تاریخ در دسترس نیست";
  const title = "IMEI:" + point.deviceIMEI;
  const fullName = point.deviceNickname !=="N/A" ? point.deviceNickname : "نام و نام خانوادگی";

  return (
    <Card className={classes.card}>
      <CardHeader style={{fontFamily:"Vazir", fontSize:"15px", direction: "rtl",
    textAlign: "center"}}
        title={title}
        subheader={formatedDate}
      />
      <CardMedia
        className={classes.media}>
          <LeafLetMap longitude={point.locationLongitude} latitude= {point.locationLatitude} singleMode={false}/> 
        </CardMedia>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p" align="right" style={{fontFamily:"Vazir"}}>
          {fullName}
        </Typography>
      </CardContent>
      <CardActions style={{align:"right"}}>
        <Button
          onClick={() => onClickBrowsRoute(point)}
          size="small"
          color="primary"
          style={{fontFamily:"vazir", align:"right", border: "1px solid"}}
        >
          مرور مسیر
        </Button>
        <Button
          onClick={() => onClickDisplayTraveledDistance(point)}
          size="small"
          color="primary"
          style={{fontFamily:"vazir", align:"right", border: "1px solid"}}
        >
          مسافت پیموده شده
        </Button>
      </CardActions>
    </Card>
  );
};

export default PointInMultipleMode;
