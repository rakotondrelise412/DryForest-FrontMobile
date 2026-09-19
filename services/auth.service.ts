import { LoginRequest, LoginResponse } from "@/types/auth";
import { api } from "./api";

export const login = async(
    credentials: LoginRequest
): Promise<LoginResponse> =>{
const response = await api.post<LoginResponse>(
    "/auth/mobilelogin",
    credentials
);
return response.data;
}