import { AxiosError, type AxiosResponse } from "axios";
import { ENDPOINTS } from "@shared/api/endpoints";

type options = {
  onSuccess?: VoidFunction;
  onReject?: (e: AxiosError) => void;
  setToken?: (token: string) => void;
}

const useRefresh = ({ onSuccess, onReject, setToken }: options ) => {
  const setRefresh = async () => {
    try {
      const { data } = await ENDPOINTS({ kind: "GET", endpoint: "auth/refresh" }) as AxiosResponse<{ accessToken: string }>;
      setToken?.(data.accessToken);
      onSuccess?.()
      return data;
    } catch (error) {
      if (error instanceof AxiosError) onReject?.(error)
      // eslint-disable-next-line no-console
      else console.error(error);
    };
  }
  return { setRefresh };
}

export default useRefresh;