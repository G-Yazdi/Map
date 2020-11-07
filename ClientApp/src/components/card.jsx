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
export default function OutlinedCard(props) {
  const classes = useStyles();
  console.log("propsssss", props)

  return (
    <Card className={classes.root} style={{
        display:"grid",
        position: "absolute",
        fontFamily: 'Vazir',
        right: "16px",
        width: "196px",
        textAlign: "center",
        marginTop: "74px",
        zIndex:"1"}} variant="outlined">
      <CardContent>
        <Typography style={{fontFamily:"Vazir"}}  component="p">
            {props.fullName}
        </Typography>
        <br/>
        <div>
          <img src={require("../images/11.png").default}  style={{height:"21px", display: "inline-block", marginLeft: "-8px",
            marginRight: "5px"}}/> 
          <Typography style={{fontFamily:"Vazir", display: "inline-block"}}  component="p">
              {props.simNumber}
          </Typography>
          <br/>
          <Typography style={{fontFamily:"Vazir", display: "inline-block", marginTop: "10px"}}  component="p">
              {props.date}
          </Typography>
        </div>
        
        
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