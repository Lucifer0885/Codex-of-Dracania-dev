import axios from "axios";
import config from "dotenv";
import { isDev } from "../utils/util.js";
config.config();

const baseURL = isDev() ? process.env.DEV_API_BASE_URL! : process.env.API_BASE_URL!;

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
