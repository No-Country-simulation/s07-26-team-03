import { AxiosError } from "axios";
import { HTTP_ERROR_MESSAGES, type ApiError, type ApiErrorResponse } from "./types/api.types";


export function normalizeApiError(error: AxiosError<ApiErrorResponse>):ApiError{

        if(error.response){

            const responseData = error.response.data;

            return{

                message:
                    responseData?.message ??
                    HTTP_ERROR_MESSAGES[error.response.status] ??
                    "Unexpected server error.",
                statusCode:responseData?.status ?? 500,
                errorCode: responseData?.errorCode,
                timestamp: responseData?.timestamp ?? new Date().toISOString(),
                path: responseData?.path ?? error.config?.url ?? "unknown",
                details: responseData?.details

            };

        }

        if(error.request){

            return{

                message:"Unable to connect to the server.",
                statusCode: 0,
                errorCode: "NETWORK_ERROR",
                timestamp: new Date().toISOString(),
                path: error.config?.url ?? "unknown",

            };

        }

    return{

        message:"Unexpected error.",
        statusCode: -1,
        timestamp: new Date().toISOString(),
        path: error.config?.url ?? "unknown",

    };

}