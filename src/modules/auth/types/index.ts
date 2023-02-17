export interface IAuthRequest {
  user: string;
  password?: string;
  gtoken?: string;
}
export interface IAuthResponse {
  cupones: string;
  apellidos: string;
  miembroWow: boolean;
  entity: string;
  email: string;
  estado: {
    value: string;
    key: boolean;
  };
  nombres: string;
  miembroStarbucks: boolean;
  tipoEmpleado: string;
  sk: string;
  usuario: string;
  id: string;
  pk: string;
  pais: {
    value: string;
    key: string;
  };
  token: string;
  rol: string;
  telefono: string;
  ahorro: string;
  marcasFavoritas: any[];
}

export interface IRecoverRequest {
  email: string;
}

export interface INewPasswordRequest {
  newPassword: string;
}
