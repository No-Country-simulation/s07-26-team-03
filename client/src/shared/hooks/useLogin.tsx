import { useState, useContext } from "react";
import { AxiosError } from "axios";
import { login } from "@/shared/api";
import AuthContext from "@/shared/context/AuthContext"

type options = {
  onSuccess?: VoidFunction;
  onReject?: (e: AxiosError) => void;
}

const useLogin = ({ onSuccess, onReject }: options ) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { setAccessToken } = useContext(AuthContext);
  
  const setLogin = (formData: object) => {
    setLoading(true);

    login(formData)
      .then(({ data }) => {
        setAccessToken(data.accessToken);
      })
      .then(() => {
        onSuccess?.();
      })
      .catch((error: AxiosError) => {
        onReject?.(error)
      })
      .finally(() => {
        setLoading(false);
      })
  }

  return { setLogin, loading };

}

export default useLogin;