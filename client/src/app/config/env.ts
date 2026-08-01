type RuntimeEnv = {
  VITE_APP_NAME?: string;
  VITE_API_URL?: string;
  VITE_APP_VERSION?: string;
};

declare global {
  interface Window {
    __ENV__?: RuntimeEnv;
  }
}

const envSource = import.meta.env.PROD
  ? window.__ENV__
  : import.meta.env;

if (!envSource) {
  throw new Error("Runtime configuration not found.");
}


function required(value: string | undefined, name: string): string {
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

export const env = {
  APP_NAME: required(envSource.VITE_APP_NAME, "VITE_APP_NAME"),
  API_URL: required(envSource.VITE_API_URL, "VITE_API_URL"),
  VERSION: required(envSource.VITE_APP_VERSION, "VITE_APP_VERSION"),
} as const;