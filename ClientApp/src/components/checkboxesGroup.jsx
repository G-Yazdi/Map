import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MyCheckbox from "./myCheckbox";
import makePure from 'recompose/pure';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    position: "absolute",
    right: 0,
    top: "61px",
    direction:'rtl'
  },
  formControl: {
    margin: theme.spacing(3)
  },
}));

const CheckboxesGroup = ({state, visitors, onCheck})=> {
  const classes = useStyles();
  

  return (
    <div className={classes.root} style={{outline: "dotted",
        outlineColor: "gray"}}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend" style={{fontFamily:'Vazir'}}>مشاهده مسیر طی شده</FormLabel>
        <FormGroup>
            {visitors.map((visitor)=>{
                return <FormControlLabel key={visitor.deviceId}
                control={<MyCheckbox checked={state?.[`visitor${visitor.deviceId}`]} 
                onChange={onCheck} name={`visitor${visitor.deviceId}`} color="primary"/>}
                label={visitor.deviceNickname==="N/A"? visitor.deviceIMEI:visitor.deviceNickname}
              />;
            })}
        </FormGroup>
      </FormControl>
      </div>
  );
}

export default makePure(CheckboxesGroup);
