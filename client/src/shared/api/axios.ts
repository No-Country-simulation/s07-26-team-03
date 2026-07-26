import axios from "axios";

import { env } from "@/app/config/env";
import { setupInterceptors } from "./interceptors";

export const api = axios.create({
  baseURL: env.API_URL,
  timeout: 30000,

  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});


setupInterceptors(api);

export const publicApi = axios.create({

    baseURL: env.API_URL

});