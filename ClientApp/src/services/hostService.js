import http from "./httpService";
import { Host } from "../config.json";

export function getHostAddress() {
    return http.get(Host.GetHostAddress);
}
export default {
    getHostAddress,
};