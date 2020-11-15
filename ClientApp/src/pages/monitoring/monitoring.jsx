import React, {useEffect, useState, useRef} from "react";
import userService from "../../services/userService";
import Cluster from "./cluster";
import { HubConnectionBuilder } from '@microsoft/signalr';

const Monitoring = ()=>{
  
  const [isLoading, setIsLoading] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [devices, setDevices] = useState([]);
  const [ connection, setConnection ] = useState(null);

  const latestDivicesState = useRef(null);

  latestDivicesState.current = devices;
  

useEffect(() => {
  console.log("error2");

  async function fetchData() {
    await userService.getMonitoringMap().then(response => {
      const data = response.data;
      if (data !== null) {
        setCustomers(data.customers);
        setDevices(data.devices);
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
              console.log('Connected!');
              connection.invoke("JoinToGroupAsync", "Golriz.Gps").catch(err => console.error("error",err));
              connection.on('NotifyAsync', handler);
          })
          .catch(e => console.log('Connection failed: ', e));
  }
    return ()=>connection?.off('NotifyAsync', handler);
}, [connection]);
  

 

  if(!isLoading){
    return (
      <Cluster customers={customers} devices={devices}/>
    );
  }
  return null;
}
export default Monitoring;
