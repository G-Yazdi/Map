import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from "@material-ui/core/CardHeader";
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
export default function OutlinedCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root} style={{
        display:"grid",
        position: "absolute",
        fontFamily: 'Vazir',
        right: "16px",
        width: "196px",
        textAlign: "center",}} variant="outlined">
      <CardContent>
        <Typography style={{fontFamily:"Vazir"}}  component="p">
            {props.fullName}
        </Typography>
        <br/>
            <img src={require("../images/mobile.png").default} style={{height:"512px"}} />  
        
        <Typography style={{fontFamily:"Vazir"}}  component="p">
            
            {props.simNumber}
        </Typography>
        <br/>
      </CardContent>
      <CardContent style={{backgroundColor: "rgba(148, 179, 239, 0.5)", paddingTop: "10px", height: "5px", marginTop: "-20px"}}>
      <Typography style={{fontFamily:"Vazir"}}  component="p">
          {props.imei}
        </Typography>
      </CardContent>
    </Card>
  );
}