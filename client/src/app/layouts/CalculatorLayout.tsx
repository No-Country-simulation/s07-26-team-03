import { Outlet } from "react-router-dom";

export default function CalculatorLayout() {

    return (

        <div className="min-h-screen flex flex-col">

            <header>

                Calculator Header

            </header>

            <main className="flex-1">

                <Outlet />

            </main>

            <footer>

                Calculator Footer

            </footer>

        </div>

    );

}