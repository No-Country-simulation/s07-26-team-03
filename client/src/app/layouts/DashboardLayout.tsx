import { Outlet } from "react-router-dom";

export default function DashboardLayout() {

    return (

        <div className="min-h-screen flex">

            <aside className="w-72 border-r">

                Sidebar

            </aside>

            <div className="flex flex-1 flex-col">

                <header className="border-b">

                    Topbar

                </header>

                <main className="flex-1 p-6">

                    <Outlet />

                </main>

            </div>

        </div>

    );

}