import type { AxiosResponse } from "axios";
import { publicRoutes } from "./axios";
import type { IAssessmentData } from "./types/request.interfaces";
import type { IAssessmentResponse } from "./types/response.interface";

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

export const login = (): Promise<AxiosResponse<{ accessToken: string }>> => {
    return publicRoutes.post<{ accessToken: string }>(
        "/auth/login",
        {},
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

export const sendAssessmentRequest = (data: IAssessmentData): Promise<AxiosResponse<IAssessmentResponse>> => {
    return publicRoutes.post<IAssessmentResponse>(
        "assessments",
        data,
        {
            signal: controller.signal,
        }
    );
}

export const getAssessmentSavedResults = (id: string): Promise<AxiosResponse<IAssessmentResponse>> => {
    return publicRoutes.get<IAssessmentResponse>(`assessments/${id}`);
}