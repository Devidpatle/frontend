import axios from "axios";

const API = axios.create({
  baseURL: "https://backend-opo8.onrender.com/api"
});

export default API;
