import http from "./httpService";
import { User } from "../config.json";

export function getLastLocations() {
    return http.get(User.GetLastLocations);
}
export function getBrowsedRoute (Id, LocationTime)
{
    return http.get(User.GetBrowsedRoute + "?deviceId=" + Id + "&locationTime=" + LocationTime);
}
export default {
    getLastLocations,
    getBrowsedRoute

};
