import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    backgroundColor: "rgba(255, 255, 255, 0.7)"
  },
  title: {
    fontSize: 14,
    fontFamily: "Vazir"
  },
  pos: {
    marginBottom: 12,
  },
});
export default function MonitoringInfoCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root} style={{
        display:"grid",
        position: "absolute",
        fontFamily: 'Vazir',
        right: "16px",
        width: "196px",
        textAlign: "center",
        marginTop: "282px",
        zIndex:"1"}} variant="outlined">
      <CardContent>
        <div>
            <img src={require("../images/speed.png").default}  style={{height:"21px", display: "inline-block", marginLeft: "-8px",
            marginRight: "5px"}}/> 
            <Typography style={{fontFamily:"Vazir", display: "inline-block"}}  component="p">
                {props.speed}
            </Typography>
        </div>
        <br/>
        <div>
        <img src={require("../images/time.png").default}  style={{height:"21px", display: "inline-block", marginLeft: "-8px",
            marginRight: "5px"}}/> 
          <Typography style={{fontFamily:"Vazir", display: "inline-block"}}  component="p">
              {props.time}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}