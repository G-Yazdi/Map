import React, {useEffect, useState, useRef} from "react";
import userService from "../../services/userService";
import Cluster from "./cluster";
import { HubConnectionBuilder } from '@microsoft/signalr';

const Monitoring = ()=>{
  const [isLoading, setIsLoading] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [devices, setDevices] = useState([]);
  const [ connection, setConnection ] = useState(null);
  const latestDevices = useRef(null);

  latestDevices.current = devices;

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
        .withUrl("http://notifier.dm1.com/Hubs/RealTimeHub", {
          Headers:{'AppToken': 'RealTimeHubToken'}   
        })
        .withAutomaticReconnect()
        .build();

    setConnection(newConnection);
}, []);

useEffect(() => {
  if (connection) {
      connection.start()
          .then(result => {
              console.log('Connected!');

              connection.on('NotifyAsync', message => {
                  const updatedDevices = [...latestDevices.current];
                  console.log('message', message);
                  updatedDevices.push(message);
              
                  setDevices(updatedDevices);
              });
          })
          .catch(e => console.log('Connection failed: ', e));
  }
}, [connection]);
  // useEffect(() => {

  //   async function fetchData() {
  //     await userService.getMonitoringMap().then(response => {
  //       const data = response.data;
  //       console.log("data:", data)
  //       if (data !== null) {
  //         setCustomers(data.customers);
  //         setDevices(data.devices);
  //         setIsLoading(false);
  //       }
  //     })
  //     .catch(error => {
  //       console.log("error", error);
  //     });
  //   }
  //   fetchData();
  // }, []);

 

  // if(!isLoading){
  //   return (
  //     <Cluster customers={customers} devices={devices}/>
  //   );
  // }
  return null;
}
export default Monitoring;
