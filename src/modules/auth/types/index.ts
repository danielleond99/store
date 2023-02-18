export interface IAuthRequest {
  user_name: string;
  password: string;
}
export interface IAuthResponse {
  id: string;
  user_name: string;
  password: string;
  token: string;
}

export interface IRegisterRequest {
  user_name: string;
  password: string;
  fullName: string;
}
export interface IRegisterResponse {
  user_name: string;
  fullName: string;
  id: string;
  isActive: boolean;
  roles: string[];
  token: string;
}
