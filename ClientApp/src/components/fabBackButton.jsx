import React from 'react';
import Fab from '@material-ui/core/Fab';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const FabBackButton = (props) => {
    return ( <Fab color="primary" aria-label="add" style={{zIndex:"1111", bottom: "5px",
    left: "5px", position: "absolute"}} onClick={()=>props.onClick()}>
       <ArrowBackIcon />
  </Fab> );
}
 
export default FabBackButton;