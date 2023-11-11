import axios from "axios";

axios.defaults.baseURL = "https://twitter-ci-4eb0a43581b7.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
