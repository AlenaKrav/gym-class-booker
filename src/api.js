import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const apiClient = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    "Content-Type": "application/json",
    "Accept-Language": "es",
  },
});

export function setToken(token) {
  apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export default apiClient;
