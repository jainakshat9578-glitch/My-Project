import axios from "axios";

const axiosInstance = axios.create({
<<<<<<< HEAD
  baseURL: "https://second-brain-backend-iba2.onrender.com/api",
=======
  baseURL: "https://localhost:3000/api",
>>>>>>> 09f54a686805a91a26a99a76ab53423cbcdcdd11
  withCredentials:true
});


export default axiosInstance;
