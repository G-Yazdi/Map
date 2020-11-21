import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MyCheckbox from "./myCheckbox";
import makePure from 'recompose/pure';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    position: "absolute",
    right: 0,
    direction:'rtl',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    height: '92.64%',
    position: 'absolute',
    bottom: 0,
    
  },
  formControl: {
    margin: '17px',
    marginRight: '0px',
    marginLeft: '38px',
  },
}));

const CheckboxesGroup = ({state, visitors, onCheck})=> {
  const classes = useStyles();
  

  return (
    <div className={classes.root}>
          
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend" style={{fontFamily:'Vazir', lineHeight: '3',
    marginRight: '27px'}}>مشاهده مسیر طی شده</FormLabel>
        <FormGroup>
        {console.log("checkboxGroup",state)}
            {visitors.map((visitor)=>{
                return <FormControlLabel key={visitor.deviceId}
                control={<MyCheckbox checked={state?.[visitor.deviceId]?.checked || false} 
                onChange={onCheck} name={`${visitor.deviceId}`} color="primary" loading={state?.[visitor.deviceId]?.loading}/>}
                label={visitor.deviceNickname==="N/A"? visitor.deviceIMEI:visitor.deviceNickname}
              />;
            })}
        </FormGroup>
      </FormControl>
      </div>
  );
}

export default makePure(CheckboxesGroup);
