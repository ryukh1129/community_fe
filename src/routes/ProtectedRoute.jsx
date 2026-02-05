import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function ProtectedRoute() {
    const { isLoggedIn } = useAuth();

    useEffect(() => {
        if (!isLoggedIn) {
            alert('로그인이 필요합니다.');
        }
    }, [isLoggedIn]);

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    // React Router v6 이상에서는 아래와 같이 Outlet을 반환하도록 해야함
    return <Outlet />;
}

export default ProtectedRoute;