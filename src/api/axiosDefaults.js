import axios from "axios";

axios.defaults.baseURL = "https://not-twitter-api-d529a3237774.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

// Axios instance to attach interceptors
export const axiosReq = axios.create();
export const axiosRes = axios.create()
