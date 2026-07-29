export type EndpointBuilder<F extends string, E extends string> = `${F}/${E}`;

type PostEndpoints = 
  | EndpointBuilder<"auth", "login" | "signup">
  | EndpointBuilder<"calculator", "calculate" | "scenarios">

type GetEndpoints = 
  | EndpointBuilder<"auth", "refresh">
  | EndpointBuilder<"report", "generate">


type ParamOptions = 
  | {
    kind: "params";
    param: string;
    query?: [];
  }
  | {
    kind: "query";
    param?: string;
    query: [];
  }

export type EndpointOptions =
  | {
      kind: "POST";
      endpoint: PostEndpoints;
      param?: ParamOptions;
      data: object;
    }
  | {
      kind: "GET";
      endpoint: GetEndpoints;
      param?: ParamOptions;
      data?: object;
    }
  | {
      kind: "PUT";
      endpoint: "auth" | "signup" | "refresh";
      param?: ParamOptions;
      data: object;
    }
  | {
      kind: "PATCH";
      endpoint: "auth" | "signup" | "refresh";
      param?: ParamOptions;
      data: object;
    }
  | {
      kind: "DELETE";
      endpoint: "auth" | "signup" | "refresh";
      param?: ParamOptions;
      data?: object;
    };



export interface ApiResponse<TData = unknown> {
  data: TData;
  message: string;
  statusCode: number;
  timestamp: string;
}

// Estructura para respuestas paginadas
export interface PaginatedResponse<TData> extends ApiResponse<TData[]> {
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

// Estructura estandarizada de error
export interface ApiError {
  message: string;
  statusCode: number;
  errorCode?: string;
  details?: Record<string, string[]>;
  timestamp: string;
  path: string;
}

export interface ApiErrorResponse {
  message: string;
  status: number;
  errorCode?: string;
  timestamp: string;
  path: string;
  details?: Record<string, string[]>;
}

// Configuración para peticiones
export interface RequestConfig {
  params?: Record<string, string | number | boolean | undefined>;
  headers?: Record<string, string>;
  signal?: AbortSignal;
}

// Tipo para el token de autenticación
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export const HTTP_ERROR_MESSAGES: Record<number, string> = {
  400: "Solicitud inválida. Verifica los datos enviados.",
  401: "Sesión expirada. Por favor, inicia sesión nuevamente.",
  403: "No tienes permisos para realizar esta acción.",
  404: "El recurso solicitado no fue encontrado.",
  409: "Conflicto. El recurso ya existe o hay datos duplicados.",
  422: "Datos inválidos. Revisa la información proporcionada.",
  429: "Demasiadas peticiones. Espera un momento e intenta de nuevo.",
  500: "Error interno del servidor. Intenta más tarde.",
  502: "Servicio no disponible temporalmente.",
  503: "Servicio en mantenimiento. Vuelve pronto.",
};