import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

function OAuth2SuccessPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = searchParams.get('accessToken');

        if (accessToken) {
            // 로그인 성공 시, JWT 토큰을 로컬 스토리지에 저장하고 홈으로 이동
            localStorage.setItem('accessToken', accessToken);
            navigate('/', { replace: true });
            window.location.reload();
        } else {
            alert('로그인에 실패했습니다.');
            navigate('/login', { replace: true });
        }
    }, [searchParams, navigate]);

    return <div className="text-center mt-10">로그인 처리 중...</div>;
}

export default OAuth2SuccessPage;