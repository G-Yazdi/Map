import http from "./httpService";
import { User } from "../config.json";

export function getLastLocations() {
    return http.get(User.GetLastLocations);
}
export function getBrowsedRoute (Id, LocationTime)
{
    return http.get(User.GetBrowsedRoute + "?deviceId=" + Id + "&locationTime=" + LocationTime);
}
export function getMonitoringMap() {
    console.log("1")
    return http.get(User.GetMonitoringMap);
}
export default {
    getLastLocations,
    getBrowsedRoute,
    getMonitoringMap

};
