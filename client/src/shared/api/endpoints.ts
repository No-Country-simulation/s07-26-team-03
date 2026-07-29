import type { AxiosResponse } from "axios";
import { protectedRoutes } from "./axios";
import type { EndpointOptions } from "./types/api.types";

const controller = new AbortController();

export const ENDPOINTS = (options: EndpointOptions): Promise<AxiosResponse> => {
    if (options.kind === "POST") {
        if (options.endpoint === "auth/login") {
            return protectedRoutes.post<AxiosResponse<{ accessToken: string }>>(
                "/auth/login",
                options.data,
                { signal: controller.signal },
            ) ;
        }

        if (options.endpoint === "auth/signup") {
            return protectedRoutes.post(
                "/auth/signup",
                options.data,
                { signal: controller.signal },
            );
        }

        if (options.endpoint === "calculator/calculate") {
            return protectedRoutes.post(
                "/calculator/calculate",
                options.data,
                { signal: controller.signal },
            );
        }

        if (options.endpoint === "calculator/scenarios") {
            return protectedRoutes.post(
                "/calculator/scenarios",
                options.data,
                { signal: controller.signal },
            );
        }
    }

    if (options.kind === "GET") {
        if (options.endpoint === "auth/refresh") {
            return protectedRoutes.get(
                "/auth/refresh",
                { signal: controller.signal },
            );
        }
    }

    throw new Error(
        `Endpoint not implemented: ${options.kind} ${options.endpoint}`,
    );
};
