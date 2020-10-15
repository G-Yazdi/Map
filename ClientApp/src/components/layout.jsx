import React from "react";
import NavBar from "./navBar";
import PointList from "./pointList";
import CssBaseline from "@material-ui/core/CssBaseline";

const Layout = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <NavBar />
      <PointList />
    </React.Fragment>
  );
};

export default Layout;
