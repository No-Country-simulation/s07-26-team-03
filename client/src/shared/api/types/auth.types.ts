// Credenciales de login
export interface LoginRequest {
  email: string;
  password: string;
}

// Respuesta de login
export interface LoginResponse {
  user: {
    id: string;
    email: string;
    name: string;
    role: "operator" | "admin" | "viewer";
  };
  tokens: {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  };
}

// Perfil del usuario
export interface UserProfile {
  id: string;
  email: string;
  name: string;
  company?: string;
  role: string;
  preferences: {
    notifications: boolean;
    newsletter: boolean;
  };
}