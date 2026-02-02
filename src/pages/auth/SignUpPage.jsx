import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../../apis/features/auth';

function SignUpPage() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        nickname: '',
        email: ''
    });
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setMessage('');
        setIsError(false);

        try {
            await signup(formData);
            alert('회원가입 성공! 로그인 페이지로 이동합니다.');
            navigate('/login');
            
        } catch (err) {
            const errorMessage = err.response?.data || '알 수 없는 오류가 발생했습니다.';
            setMessage(`회원가입 실패: ${errorMessage}`);
            setIsError(true);
            console.error('Signup failed:', err);
        }
    };

    return (
        <main className="flex items-center justify-center py-12 px-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
                <h1 className="text-3xl font-bold text-center mb-6">회원가입</h1>
                <form onSubmit={handleSignup} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">아이디:</label>
                        <input 
                            type="text" 
                            name="username" 
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">비밀번호:</label>
                        <input 
                            type="password" 
                            name="password" 
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">닉네임:</label>
                        <input 
                            type="text" 
                            name="nickname" 
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">이메일:</label>
                        <input 
                            type="email" 
                            name="email" 
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600"
                    >
                        회원가입
                    </button>
                </form>
                {message && (
                    <div className={`mt-4 p-4 rounded-md text-center ${isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`} role="alert">
                        {message}
                    </div>
                )}
            </div>
        </main>
    );
}

export default SignUpPage;