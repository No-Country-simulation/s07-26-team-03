import { useState } from "react";
import { Outlet } from "react-router-dom";
import DashboardSidebar from "@/shared/components/nav/DashboardSidebar";
import TopBar from "@/shared/components/nav/TopBar";

import type { DashboardTab } from "@/shared/interfaces/sidebar.interface";

export default function DashboardLayout() {
    const [activeTab, setActiveTab] = useState<DashboardTab>("layer-breakdown");

    return (
        <div className="flex min-h-screen w-full bg-background m-0 p-0 overflow-x-hidden">
            <DashboardSidebar
                activeTab={activeTab}
                onSelectTab={(tab) => setActiveTab(tab)}
            />

            <div className="flex flex-1 flex-col ml-[233px] w-[calc(100%-233px)] min-h-screen">
                <TopBar />

                <main className="flex-1 p-8 overflow-y-auto">
                    <Outlet context={{ activeTab, setActiveTab }} />
                </main>
            </div>
        </div>
    );
}