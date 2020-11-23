import React from "react";
import { Redirect, Route } from "react-router-dom";

function ProtectedRoute({ component: Component, token, ...rest}) {
    
  return (
      <React.Fragment>
          {console.log("protectedRoute")}
          <Route
            {...rest}
            render={props =>
                localStorage.getItem("token")? <Component {...props} /> : <Redirect to="/login" />
            }
    />
      </React.Fragment>
    
      
  );
}
export default ProtectedRoute;