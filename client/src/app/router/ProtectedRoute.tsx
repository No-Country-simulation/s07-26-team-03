import { Navigate, Outlet } from "react-router-dom";

import { ROUTES } from "@/routes/route.constants";

export default function ProtectedRoute() {

    const token = localStorage.getItem("access_token");

    if (token) {

        return (

            <Navigate

                replace

                to={ROUTES.LOGIN}

            />

        );

    }

    return <Outlet />;

}