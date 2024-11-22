import axios from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants.js";
import { auth } from "./utils/authorization.js";

export const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/",
});

export const APIToken = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/",
});

APIToken.interceptors.request.use(
  async (config) => {
    const token = await auth();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
