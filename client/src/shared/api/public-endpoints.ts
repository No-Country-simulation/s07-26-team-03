import type { AxiosResponse } from "axios";
import { publicRoutes } from "./axios";
import type { ICalculationRequest, ICalculationResponse } from "./types";

const controller = new AbortController();


export const signup = (): Promise<AxiosResponse> => {
    return publicRoutes.post(
        "/auth/signup",
        {},
        {
            signal: controller.signal,
        }
    ) ;
}

export const login = (data: object): Promise<AxiosResponse<{ accessToken: string }>> => {
    return publicRoutes.post<{ accessToken: string }>(
        "/auth/login",
        data,
        {
            signal: controller.signal,
        }
    ) ;
}

export const refreshSession = (): Promise<AxiosResponse<{ accessToken: string }>> => {
    return publicRoutes.get<{ accessToken: string }>(
        "/auth/refresh",
        { 
            withCredentials: true,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': 'true',
            }
        },
    ) ;
}

export const calculate = (data: ICalculationRequest): Promise<AxiosResponse> => {
    return publicRoutes.post<ICalculationResponse>(
        "calculator/calculate",
        data,
        {
            signal: controller.signal,
        }
    ) ;
}

export const getScenarios = (): Promise<AxiosResponse> => {
    return publicRoutes.get(
        "/calculator/scenarios",
    ) ;
}