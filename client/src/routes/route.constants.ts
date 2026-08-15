export const ROUTES = {

    ROOT: "/",

    LOGIN: "/login",
    REGISTER: "/register",
    VERIFY: "/verify",

    CALCULATOR: "/calculator",
    SHARED: "/sharedResult", 
    RESULTS: "/results/:id",
    
    DASHBOARD: "/dashboard",

    REPORTS: "/dashboard/reports",

    SETTINGS: "/dashboard/settings",

} as const;

export type RoutePath =
    (typeof ROUTES)[keyof typeof ROUTES];
