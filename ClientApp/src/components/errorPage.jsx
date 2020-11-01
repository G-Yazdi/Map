import React from 'react';

const ErrorPage = ({errorMessage}) =>{
  const defaultErrorMessage = "در حال حاضر امکان برقراری ارتباط با سرور وجود ندارد";
  return(<div style={{marginTop: "84px", textAlign: "end", marginRight: "19px",
  textAlign: "end",
  display: "inline-block",
  position: "absolute",
  right: "275px"}}>
    <h3>خطا</h3>
    <p>{errorMessage? errorMessage: defaultErrorMessage}</p>
  </div>);
  
}
  

export default ErrorPage;