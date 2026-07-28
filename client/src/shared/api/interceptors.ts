import type {
    AxiosError,
    AxiosInstance,
    AxiosResponse,
    InternalAxiosRequestConfig
} from "axios";
import { normalizeApiError } from "./errors";
import { getAccessToken, removeAccessToken } from "./token";
import type { ApiErrorResponse } from "./types/api.types";


export function setupInterceptors(client: AxiosInstance){

    client.interceptors.request.use(
        onRequest
    );

    client.interceptors.response.use(
        onResponse,
        onResponseError,
    );

    function onRequest(
        config: InternalAxiosRequestConfig,
        ): InternalAxiosRequestConfig {
    
        const token = getAccessToken();

        if (token) {
            config.headers.set("Authorization", `Bearer ${token}`);
        }

        return config;

    }

    function onResponse(response:AxiosResponse){

        return response;

    }

    function onResponseError(error:AxiosError<ApiErrorResponse>){
        if (error.response?.status === 401) {
            removeAccessToken();
        // Más adelante:
        // refreshToken();
        // o redirigir al login.
        }   

        return Promise.reject(

            normalizeApiError(error)

        );

    }

}