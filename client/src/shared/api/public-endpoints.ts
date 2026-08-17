import type { AxiosResponse } from "axios";
import { publicRoutes } from "./axios";
import type { IAssessmentData, IAssessmentRegisterData, IVerifyData } from "./types/request.interfaces";
import type { IAssessmentRegisterResponse, IAssessmentResponse, IVerifyResponse } from "./types/response.interface";

const controller = new AbortController();


export const assessmentRegister = (data: IAssessmentRegisterData): Promise<AxiosResponse<IAssessmentRegisterResponse>> => {
    return publicRoutes.post<IAssessmentRegisterResponse>(
        "auth/request-otp",
        data,
        {
            signal: controller.signal,
        }
    ) ;
}

export const verify = (data: IVerifyData): Promise<AxiosResponse<IVerifyResponse>> => {
    return publicRoutes.post<IVerifyResponse>(
        "auth/verify-otp",
        { email: data.email, code: data.code },
        {
            signal: controller.signal,
        }
    ) ;
}

export const refreshSession = async (): Promise<{ accessToken: string }> => {
    const response = await publicRoutes.get<{ accessToken: string }>(
        "auth/refresh",
        { 
            withCredentials: true,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': 'true',
            }
        },
    );

    return response.data;
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