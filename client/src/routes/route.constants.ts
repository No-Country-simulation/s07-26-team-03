export const ROUTES = {

    ROOT: "/",

    LOGIN: "/login",
    REGISTER: "/register",
    VERIFY: "/verify",

    CALCULATOR: "/calculator",
    SHARED: "/sharedResult", //Este es el que deberia utilizar el boton del calculator, no el otro.

    DASHBOARD: "/dashboard",

    REPORTS: "/dashboard/reports",

    SETTINGS: "/dashboard/settings",

} as const;

export type RoutePath =
    (typeof ROUTES)[keyof typeof ROUTES];
