import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

const apiClient = axios.create({
    baseURL: API_BASE_URL
});

// Axios 요청 인터셉터: 모든 요청에 인증 토큰 추가
apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// 401 Unauthorized 오류 발생 시 자동으로 로그아웃 처리
apiClient.interceptors.response.use(response => response, error => {
    if (error.response && error.response.status === 401) {
        localStorage.removeItem('accessToken');
        if (window.location.pathname !== '/login') {
            alert('세션이 만료되었습니다. 다시 로그인해주세요.');
            window.location.href = '/login';
        }
    }
    return Promise.reject(error);
});

export default apiClient;