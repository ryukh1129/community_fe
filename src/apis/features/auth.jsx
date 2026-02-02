import apiClient from "../api-client";

export const signup = (userData) => {
    return apiClient.post("/auth/signup", userData);
}

export const login = (userData) => {
    return apiClient.post("/auth/login", userData);
}