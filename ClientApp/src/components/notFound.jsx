import React from 'react';

const NotFound = ({errorMessage}) =>

  <div style={{marginTop: "84px", textAlign: "end", marginRight: "19px",
  textAlign: "end",
  display: "inline-block",
  position: "absolute",
  right: "275px"}}>
    <h3>خطا</h3>
    <p>{errorMessage}</p>
  </div>

export default NotFound;