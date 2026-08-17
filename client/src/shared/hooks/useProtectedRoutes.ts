import { useContext, useEffect } from "react";
import { AxiosError } from "axios";
import { protectedRoutes, refreshSession } from "../api";
import AuthContext from "../context/AuthContext";


const useProtectedRoutes = () => {
    const { accessToken, setAccessToken } = useContext(AuthContext);

    useEffect(() => {

        const requestIntercept = protectedRoutes.interceptors.request.use(
            config => {
                if (!config.headers["Authorization"]) {
                    config.headers["Authorization"] = `Bearer ${accessToken}`
                }
                return config;
            }, (error) => Promise.reject(error),
        );

        const responseIntercept = protectedRoutes.interceptors.response.use(
            response => response,
            async (error: AxiosError) => {
                const prevRequest = error.config;
                if (!prevRequest) return
                else if (error.response?.status === 401) {
                    const data = await refreshSession();
                    if (data) {
                      const { accessToken: newAccessToken } = data;
                      setAccessToken(newAccessToken);
                      prevRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                      return protectedRoutes(prevRequest);
                    }
                };
                return Promise.reject(error)
            }
        );

        return () => {
            protectedRoutes.interceptors.request.eject(requestIntercept)
            protectedRoutes.interceptors.response.eject(responseIntercept)
        }
        
    }, [])

    return { protectedRoutes };

}

export default useProtectedRoutes;