import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/core/styles";
import userService from "../services/userService";
import PointInMultipleMode from "./pointInMultipleMode";
import NavBar from "./navBar";

const useStyles = (theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
});

class PointList extends Component {
    state = {
        isLoading: false,
        points: [],
        singleMode: false,
        point: null,
        polyLineData: [], 
        polyLineMode: false
  };

  componentDidMount() {
      
        userService.getLastLocations().then(response => {
            const points = response.data;

            if (points !== null) {
                this.setState({ points, isLoading: false });
            } else {
                this.setState({ isLoading: true });
            }
        })
        .catch(error => {
            console.log("error", error);
        });

       
  }
  handleBrowsRoute = (point) => {
        if(point.locationTime !==null){
            this.props.history.push(`/pointList/${point.deviceId}/browsedRoute`)
        }
    }
    
    handleDisplayTraveledDistance = (point) => {
        if(point.locationTime !==null){
            this.props.history.push(`/pointList/${point.deviceId}/traveledDistance`)
        }
    }
  handleBackToList = () => {
        this.setState({ point: null, singleMode: false, polyLineData: [],  polyLineMode: false, isMounted: false});
  };
  render() {
      const { classes } = this.props;
      if (!this.state.isLoading) {
              return (
                <React.Fragment>
                <NavBar />
                  <Container className={classes.cardGrid} maxWidth="md">
                      <Grid container spacing={4}>
                          {this.state.points.map((point) => (
                              <Grid item key={point.deviceId} xs={12} sm={6} md={4}>
                                  <PointInMultipleMode
                                      point={point}
                                      onClickBrowsRoute={this.handleBrowsRoute}
                                      onClickDisplayTraveledDistance={this.handleDisplayTraveledDistance}
                                  />
                              </Grid>
                          ))}
                      </Grid>
                  </Container>
                  </React.Fragment>
              );
      } else {
          return (
              <React.Fragment>
                  <NavBar />
                  <div
                      className="alert text-center  mt-5 rtl"
                      role="alert"
                  >
                      <h5>Loading...</h5>
                  </div>
              </React.Fragment>
          );

      }
    
  }
}

export default withStyles(useStyles)(PointList);
