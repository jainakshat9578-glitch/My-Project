import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://second-brain-backend-iba2.onrender.com/api",
  withCredentials:true
});


export default axiosInstance;
