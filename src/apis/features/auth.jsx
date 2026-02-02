import apiClient from "../api-client";

export const signup = (userData) => {
    return apiClient.post("/auth/signup", userData);
}