import http from "./httpService";

const tokenKey = "token";

export function login(token) {
    return Promise.resolve().then(()=> {
        localStorage.setItem(tokenKey, token);
    });
    
}
export function logout() {
    return Promise.resolve().then(()=> {
        localStorage.removeItem(tokenKey);
    });
}

export function getJwt(){
    return localStorage.getItem(tokenKey);
}

export function setAuthHeader(){
    http.setJwy(getJwt());
}

export default {
    login,
    logout,
    setAuthHeader
};