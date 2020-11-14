import React from 'react';
import Fab from '@material-ui/core/Fab';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const FabBackButton = (props) => {
    return ( <Fab color="primary" aria-label="add" style={{zIndex:"1111", bottom: "18px",
    left: "18px", position: "absolute"}} onClick={()=>props.onClick()}>
       <ArrowBackIcon />
  </Fab> );
}
 
export default FabBackButton;