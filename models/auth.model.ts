
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  id_user: number;
  username: string;
  id_person: number;
  role: string;
  token: string;
  expires_at: string;
}
