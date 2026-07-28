export const ROUTES = {

    ROOT:"/",

    LOGIN:"/login",

    CALCULATOR:"/calculator",

    DASHBOARD:"/dashboard",

    REPORTS:"/dashboard/reports",

    SETTINGS:"/dashboard/settings",

} as const;

export type RoutePath =
  (typeof ROUTES)[keyof typeof ROUTES];
