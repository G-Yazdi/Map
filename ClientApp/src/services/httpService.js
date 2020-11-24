import axios from "axios";

axios.interceptors.response.use(null, error => {
    const expectedError =
        error.response &&
            error.response.status >= 400 &&
            error.response.status < 500;

    if (!expectedError) {
        console.log(error);
    }

    return Promise.reject(error);
});
function setJwt(jwt) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
  }
axios.defaults.baseURL = "/";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.put["Content-Type"] = "application/json";

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    setJwy
};