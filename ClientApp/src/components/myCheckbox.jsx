import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from "@material-ui/core/CircularProgress";

export default function MyCheckbox({ loading = false, children, ...rest }) {
  if(loading)
    return <CircularProgress size={21} style={{
      marginLeft: "9px",
      marginRight: "9px",
      marginTop: "10px",
      marginBottom: "10px"
  }}/>
  return (
  <Checkbox {...rest}>children</Checkbox>
  );
}