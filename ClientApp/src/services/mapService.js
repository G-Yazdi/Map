import http from "./httpService";
import { Map } from "../config.json";
import auth from "./authService";

export function getLastLocations() {
    auth.setAuthHeader();
    return http.get(Map.GetLastLocations);
}
export function getBrowsedRoute (Id, LocationTime)
{
    auth.setAuthHeader();
    return http.get(Map.GetBrowsedRoute + "?deviceId=" + Id + "&locationTime=" + LocationTime);
}
export function getMonitoringMap() {
    auth.setAuthHeader();
    return http.get(Map.GetMonitoringMap);
}
export default {
    getLastLocations,
    getBrowsedRoute,
    getMonitoringMap

};
