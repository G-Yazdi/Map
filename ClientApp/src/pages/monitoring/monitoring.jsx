import React, {useEffect, useState, useRef} from "react";
import userService from "../../services/userService";
import Cluster from "./cluster";
import { HubConnectionBuilder } from '@microsoft/signalr';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import MyDrawer from './../../components/utils/drawer';

const Monitoring = ()=>{
  
  const [isLoading, setIsLoading] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [devices, setDevices] = useState([]);
  const [visitors, setVisitors] = useState([]);
  const [ connection, setConnection ] = useState(null);
  const [state, setState] = useState({});
  const [checkedDevice, setCheckedDevice] = useState({}); 

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: {checked: event.target.checked, loading: true} });
    setCheckedDevice({[event.target.name]: event.target.checked});
  };

  const handleRecieve = (deviceId) => {
    setState({ ...state, [`${deviceId}`]: {checked: state[`${deviceId}`].checked, loading: false} });
  };

  const handleNoData = (deviceId) => {
    setState({ ...state, [`${deviceId}`]: {checked: false, loading: false} });
    //notification
    NotificationManager.warning('اطلاعات مورد نظر یافت نشد', '', 3000);
  };
  const latestDivicesState = useRef(null);

  latestDivicesState.current = devices;
  

useEffect(() => {

  async function fetchData() {
    await userService.getMonitoringMap().then(response => {
      const data = response.data;
      if (data !== null) {
        setCustomers(data.customers);
        setDevices(data.devices);
        setVisitors(data.devices);
        setIsLoading(false);
        const newConnection = new HubConnectionBuilder().withUrl('http://10.10.1.34:4054/Hubs/RealTimeHub')
        .withAutomaticReconnect()
        .build();
        setConnection(newConnection);
      }
    })
    .catch(error => {
      console.log("error", error);
    });
  }
  fetchData();
}, []);


const handler = (message) => { 
  if(message.TYPE == "LAST_LOCATION"){
    const updatedDevices = [...latestDivicesState.current];
    const receivedDevice = JSON.parse(message.BODY);
    
    let deviceIndex = updatedDevices.findIndex(device => device.deviceId == receivedDevice.Device.ID );
    if(deviceIndex >= 0){
      updatedDevices[deviceIndex] = {...updatedDevices[deviceIndex], locationTime: receivedDevice.Location.Time, 
      locationLongitude: receivedDevice.Location.Longitude, locationLatitude: receivedDevice.Location.Latitude};
      
      setDevices(updatedDevices);
    }
  }
}
useEffect(() => {
  
  if (connection) {
      connection.start()
          .then(result => {
              connection.invoke("JoinToGroupAsync", "Golriz.Gps").catch(err => console.error("error",err));
              connection.on('NotifyAsync', handler);
          })
          .catch(e => console.log('Connection failed: ', e));
  }
    return ()=>connection?.off('NotifyAsync', handler);
}, [connection]);
  

 

  if(!isLoading){
    return (
      <React.Fragment>
        <MyDrawer visitors={visitors} onCheck={handleChange} state={state}/>
        <Cluster customers={customers} devices={devices} checkedDevice={checkedDevice} onReciveData={handleRecieve} onNoData={handleNoData}/>
        <NotificationContainer/>
      </React.Fragment>
    );
  }
  return null;
}
export default Monitoring;
