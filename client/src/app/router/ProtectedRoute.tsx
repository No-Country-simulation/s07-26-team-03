import { Navigate, Outlet } from "react-router-dom";

import { ROUTES } from "@/routes/route.constants";
import { useContext } from "react";
import AuthContext from "@/shared/context/AuthContext";

export default function ProtectedRoute() {
    const { accessToken } = useContext(AuthContext)

    if (!accessToken) {

        return (

            <Navigate

                replace

                to={ROUTES.LOGIN}

            />

        );

    }

    return <Outlet />;

}