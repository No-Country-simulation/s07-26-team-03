import { Outlet } from "react-router-dom";
import Sidebar from "@/shared/components/nav/Sidebar";

export default function DashboardLayout() {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex flex-1 flex-col mt-[6vh]">
                <header className="border-b border-border">
                </header>

                <main className="flex-1 p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}