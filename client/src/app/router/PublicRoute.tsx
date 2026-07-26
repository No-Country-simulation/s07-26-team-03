import { Navigate, Outlet } from "react-router-dom";

import { ROUTES } from "@/routes/route.constants";

export default function PublicRoute() {

    const token = localStorage.getItem("access_token");

    if (token) {

        return (

            <Navigate

                replace

                to={ROUTES.DASHBOARD}

            />

        );

    }

    return <Outlet />;

}