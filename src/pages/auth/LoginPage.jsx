import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../apis/features/auth';

function LoginPage() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        if (error) setError('');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
    
        try {
            const response = await login(formData);
            // Store JWT in localStorage
            localStorage.setItem('accessToken', response.data.accessToken);
            
            alert('로그인 성공!');
            navigate('/');
            window.location.reload();

        } catch (err) {
            setError('아이디 또는 비밀번호를 확인해주세요.');
            console.error('Login failed:', err);
        }
    };

    return (
        <main className="flex items-center justify-center py-12 px-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
                <h1 className="text-3xl font-bold text-center mb-6">로그인</h1>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label 
                            htmlFor="login-username" 
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            아이디:
                        </label>
                        <input
                            type="text"
                            id="login-username"
                            name="username"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label 
                            htmlFor="login-password" 
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            비밀번호:
                        </label>
                        <input
                            type="password"
                            id="login-password"
                            name="password" // name 속성 필수
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600"
                    >
                        로그인
                    </button>
                </form>
                {error && (
                    <div className="mt-4 p-4 rounded-md text-center bg-red-100 text-red-700" role="alert">
                        {error}
                    </div>
                )}
            </div>
        </main>
    );
}

export default LoginPage;