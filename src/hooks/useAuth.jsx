import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

/**
 * 컴포넌트 외부에서 초기 인증 상태를 동기적으로 확인하는 함수
 * npm install jwt-decode 필요
 */
const getInitialAuthState = () => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            // 토큰 만료 시간 체크 (선택 사항이지만 권장)
            if (decodedToken.exp * 1000 < Date.now()) {
                localStorage.removeItem('accessToken');
                return { isLoggedIn: false, userRole: null };
            }
            return {
                isLoggedIn: true,
                userRole: decodedToken.role,
            };
        } catch (error) {
            localStorage.removeItem('accessToken');
            return { isLoggedIn: false, userRole: null };
        }
    }
    return { isLoggedIn: false, userRole: null };
};


export function useAuth() {
    // useState의 초기값으로 위에서 만든 함수를 호출하여,
    // 첫 렌더링부터 올바른 로그인 상태 반영
    const [auth, setAuth] = useState(getInitialAuthState);

    // 다른 탭에서 로그아웃 했을 때 상태를 동기화하는 등의 고급 기능을 위해 남겨둘 것
    useEffect(() => {
        // 예시: 스토리지 변경 감지
        const handleStorageChange = () => {
            setAuth(getInitialAuthState());
        };
        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return auth;
}