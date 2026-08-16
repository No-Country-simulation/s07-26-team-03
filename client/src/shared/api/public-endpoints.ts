import type { AxiosResponse } from "axios";
import { publicRoutes } from "./axios";
import type { IAssessmentData, IAssessmentRegisterData } from "./types/request.interfaces";
import type { IAssessmentRegisterResponse, IAssessmentResponse } from "./types/response.interface";

const controller = new AbortController();


export const assessmentRegister = (data: IAssessmentRegisterData): Promise<AxiosResponse<IAssessmentRegisterResponse>> => {
    return publicRoutes.post<IAssessmentRegisterResponse>(
        "/auth/request-opt",
        data,
        {
            signal: controller.signal,
        }
    ) ;
}

export const login = (): Promise<AxiosResponse<{ accessToken: string }>> => {
    return publicRoutes.post<{ accessToken: string }>(
        "/auth/request-opt",
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