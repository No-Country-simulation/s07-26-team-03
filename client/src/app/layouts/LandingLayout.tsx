
import { GradientSection } from "@/features/landing/components/gradient-section/GradientSection";
import { Navbar } from "@/features/landing/components/navbar";
import { Hero } from "@/features/landing/components/sections/hero/Hero";
import { Outlet } from "react-router-dom";

export default function LandingLayout() {

    return (

        <div className="min-h-screen flex flex-col">

            {/* Header */}
            <GradientSection>
                <Navbar />
                <Hero />
            </GradientSection>
            

            <main className="flex-1">

                <Outlet />

            </main>

            <footer>

                Landing Footer

            </footer>

        </div>

    );

}