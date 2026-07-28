import axios from "axios";

import { env } from "@/app/config/env";

export const publicRoutes = axios.create({

    baseURL: env.API_URL

});

export const protectedRoutes = axios.create({
  baseURL: env.API_URL,
  timeout: 30000,
  withCredentials: true,

  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-origin": "*",
    'Access-Control-Allow-Credentials': 'true',
  },
});