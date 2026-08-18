import axios from "axios";

import { env } from "@/app/config/env";

export const publicRoutes = axios.create({
    baseURL: env.API_URL,
    timeout: 10000,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    }
});

export const protectedRoutes = axios.create({
  baseURL: env.API_URL,
  timeout: 10000,
  withCredentials: true,

  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
  },
});