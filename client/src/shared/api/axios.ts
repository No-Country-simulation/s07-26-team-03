import axios from "axios";

import { env } from "@/app/config/env";

export const publicApi = axios.create({

    baseURL: env.API_URL

});

export const api = axios.create({
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