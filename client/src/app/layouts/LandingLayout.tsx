
import { Footer } from "@/features/landing/components/footer/Footer";
import { GradientSection } from "@/features/landing/components/gradient-section/GradientSection";
import { Navbar } from "@/features/landing/components/navbar";
import { Outlet } from "react-router-dom";

export default function LandingLayout() {

    return (

        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
                <Outlet />
            </main>
            <GradientSection>
                <Footer />
            </GradientSection>

        </div>

    );

}