import axios from "axios";
import { isDev } from "../utils/util.js";
import { API_BASE_URL, DEV_API_BASE_URL } from "../constants/config.js";

const baseURL = isDev() ? DEV_API_BASE_URL : API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
