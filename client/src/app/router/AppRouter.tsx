import { BrowserRouter } from "react-router-dom";

import AppRoutes from "@/routes";
import { AuthProvider } from "@/shared/context/AuthContext";

export default function AppRouter() {

    return (
        <BrowserRouter>
            <AuthProvider>
                <AppRoutes />
            </AuthProvider>
        </BrowserRouter>
    );

}   