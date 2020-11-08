import React, {Component} from "react";
import userService from "../../services/userService";
import Cluster from "./cluster";


class Monitoring extends Component {
  state = {
    isLoading: true,
    customers: [],
    devices:[]
};

  componentDidMount() {
    userService.getMonitoringMap().then(response => {
      const data = response.data;
      console.log("data:", data)
      if (data !== null) {
        this.setState({ customers: data.customers, devices: data.devices});
        this.setState({isLoading:false})
      }
    })
    .catch(error => {
      console.log("error", error);
    });
  }
  handleBackToList = () => {
    this.props.history.replace("/");
  };
  render(){
    if(!this.state.isLoading){
      return (
        <Cluster customers={this.state.customers} devices={this.state.devices} onClick={this.handleBackToList}/>
      );
    }
    return null;
  }
}

export default Monitoring;
