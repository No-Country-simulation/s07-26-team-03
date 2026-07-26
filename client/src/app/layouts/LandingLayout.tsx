import { Outlet } from "react-router-dom";

export default function LandingLayout() {

    return (

        <div className="min-h-screen flex flex-col">

            {/* Header */}

            <header>

                Landing Header

            </header>

            <main className="flex-1">

                <Outlet />

            </main>

            <footer>

                Landing Footer

            </footer>

        </div>

    );

}