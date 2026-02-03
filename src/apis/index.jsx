import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

const httpClient = axios.create({
    baseURL: API_BASE_URL,
});

// Axios 요청 인터셉터: 모든 요청에 인증 토큰이 포함되도록 설정
httpClient.interceptors.request.use(config => {
    const token = localStorage.getItem("accessToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// 401 Unauthorized 응답 인터셉터: 토큰 만료인 경우이므로 로그아웃처리
httpClient.interceptors.response.use(response => response, error => {
    if(error.response && error.response.status === 401) {
        localStorage.removeItem("accessToken");
        alert("세션이 만료되었습니다. 다시 로그인해주세요.");
        window.location.href = "/login"; // 강제 로그아웃 후 로그인 페이지로 이동
    }
    return Promise.reject(error);
});

export default httpClient;