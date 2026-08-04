import { createContext, useState, type Dispatch, type SetStateAction, type ReactNode, useRef, useEffect } from "react";
import useRefresh from "../hooks/useRefresh";
import { useLocation, useNavigate } from "react-router-dom";

export interface IAuthContext {
  accessToken: string | null;
  setAccessToken: Dispatch<SetStateAction<string | null>>
};

const defaultState: IAuthContext = {
  accessToken: null,
  setAccessToken: () => {},
};

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<IAuthContext>(defaultState);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [accessToken, setAccessToken] = useState<string | null>(null)

  const navigate = useNavigate();
  const location = useLocation();
  const hasFetched = useRef(false);

  const from = location.state?.from?.pathname;

  const { setRefresh } = useRefresh({
    onSuccess: () => {
      navigate(from, { replace: true });
    },
    onReject: () => {},
    setToken: (token: string) => setAccessToken(token),
  })

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      setRefresh();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <AuthContext.Provider 
      value={{
        accessToken,
        setAccessToken,
      }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;