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
    
        .withUrl('http://10.10.1.34:4054/Hubs/RealTimeHub' 
        )
        .withAutomaticReconnect()
        .build();
        
    setConnection(newConnection);
}, []);

useEffect(() => {
  if (connection) {
      connection.start()
          .then(result => {
              console.log('Connected!');
              connection.invoke("JoinToGroupAsync", "Golriz.Gps").catch(err => console.error("error",err));
              connection.on('NotifyAsync', message => {
                console.log('message', message);
                // const receivedDevices = message.devices;
                // if(receivedDevices){
                //   let updatedDevices = [...devices];
                //   receivedDevices.map((receivedDevice) =>{
                //     let deviceIndex = devices.findIndex(device => device.id == receivedDevice.id );
                //     if(deviceIndex)
                //       updatedDevices[deviceIndex] = receivedDevice;
                //     else{
                //       updatedDevices.push(receivedDevice);
                //     }
                //   }
                        
                //   );
                //   setDevices(updatedDevices);
                //}
                
                // console.log('message');
                //   const updatedDevices = [...latestDevices.current];
                //   console.log('message', message);
                //   updatedDevices.push(message);
                //   console.log('message1', updatedDevices);
              });
          })
          .catch(e => console.log('Connection failed: ', e));
  }
}, [connection]);
  useEffect(() => {

    async function fetchData() {
      await userService.getMonitoringMap().then(response => {
        const data = response.data;
        if (data !== null) {
          setCustomers(data.customers);
          setDevices(data.devices);
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.log("error", error);
      });
    }
    fetchData();
  }, []);

 

  if(!isLoading){
    return (
      <Cluster customers={customers} devices={devices}/>
    );
  }
  return null;
}
export default Monitoring;
