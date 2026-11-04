
import { create } from "axios";
import { getToken } from "@/utils/storage";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const api = create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const PUBLIC_ENDPOINTS = [
  "/auth/mobilelogin",
  "/auth/login",
  "/auth/register",
];

api.interceptors.request.use(
  async (config) => {
    const url = (config.url ?? "").split("?")[0];

    const isPublicEndpoint = PUBLIC_ENDPOINTS.includes(url);

    if (isPublicEndpoint) {
      delete config.headers.Authorization;
      return config;
    }

    const token = await getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);
