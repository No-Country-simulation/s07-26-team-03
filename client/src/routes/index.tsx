import {
    lazy,
    Suspense,
} from "react";

import {
    Route,
    Routes,
} from "react-router-dom";

import BlankLayout from "@/app/layouts/BlankLayout";
import CalculatorLayout from "@/app/layouts/CalculatorLayout";
import DashboardLayout from "@/app/layouts/DashboardLayout";
import LandingLayout from "@/app/layouts/LandingLayout";

import ProtectedRoute from "@/app/router/ProtectedRoute";
import PublicRoute from "@/app/router/PublicRoute";

import { ROUTES } from "./route.constants";

/*
|--------------------------------------------------------------------------
| Pages
|--------------------------------------------------------------------------
|
| 
|
*/

    import LandingPage from "@/pages/landing/LandingPage";
    import CalculatorPage from "@/pages/calculator/CalculatorPage";
    import NotFoundPage from "@/pages/errors/NotFoundPage";

/*
|--------------------------------------------------------------------------
| Lazy Pages
|--------------------------------------------------------------------------
*/

const LoginPage = lazy(
    () => import("@/pages/auth/LoginPage"),
);

const DashboardPage = lazy(
    () => import("@/pages/dashboard/DashboardPage"),
);

export default function AppRoutes() {

    return (

        <Suspense fallback={<>Loading...</>}>

            <Routes>

                {/* ==========================
                    LANDING
                =========================== */}

                <Route element={<LandingLayout />}>

                    <Route

                        path={ROUTES.ROOT}

                        element={<LandingPage />}

                    />

                </Route>

                {/* ==========================
                    CALCULATOR
                =========================== */}

                <Route element={<CalculatorLayout />}>

                    <Route

                        path={ROUTES.CALCULATOR}

                        element={<CalculatorPage />}

                    />

                </Route>

                {/* ==========================
                    PUBLIC
                =========================== */}

                <Route element={<PublicRoute />}>

                    <Route element={<BlankLayout />}>

                        <Route

                            path={ROUTES.LOGIN}

                            element={<LoginPage />}

                        />

                    </Route>

                </Route>

                {/* ==========================
                    PRIVATE
                =========================== */}

                <Route element={<ProtectedRoute />}>

                    <Route element={<DashboardLayout />}>

                        <Route

                            path={ROUTES.DASHBOARD}

                            element={<DashboardPage />}

                        />

                    </Route>

                </Route>

                {/* ==========================
                    404
                =========================== */}

                <Route

                    path="*"

                    element={<NotFoundPage />}

                />

            </Routes>

        </Suspense>

    );

}