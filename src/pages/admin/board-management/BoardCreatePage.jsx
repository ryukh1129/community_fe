import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBoard } from "../../../apis/features/boards";

function BoardCreatePage() {
    const [formData, setFormData] = useState({
        title: '',
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

    const handleCreateBoard = async (e) => {
        e.preventDefault();
        setMessage('');
        setIsError(false);

        try {
            await createBoard(formData);
            alert(`새 게시판 "${formData.title}"이(가) 생성되었습니다!`);   
            navigate('/admin/boards');
            
        } catch (err) {
            const errorMessage = err.response?.data || '알 수 없는 오류가 발생했습니다.';
            setMessage(`게시판 생성 실패: ${errorMessage}`);
            setIsError(true);
            console.error('Board creation failed:', err);
        }
    };

    return (
        <main className="p-6 max-w-2xl mx-auto">
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
                <h1 className="text-2xl font-bold text-gray-800">새 게시판 생성</h1>
                <button 
                    onClick={() => navigate('/admin/boards')} 
                    className="text-sm px-4 py-2 bg-gray-100 text-gray-600 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                >
                    목록으로 돌아가기
                </button>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
                <form onSubmit={handleCreateBoard} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            게시판 이름:
                        </label>
                        <input 
                            type="text" 
                            name="title"
                            value={formData.title}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            onChange={handleChange} 
                            placeholder="게시판 제목을 입력하세요"
                            required 
                        />
                    </div>

                    {/* 추가 필드가 필요할 경우를 대비한 구조 (예: 설명) */}
                    {/* <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            게시판 설명:
                        </label>
                        <textarea 
                            name="description"
                            value={formData.description}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            onChange={handleChange} 
                            placeholder="게시판에 대한 간단한 설명을 입력하세요 (선택)"
                            rows="3"
                        />
                    </div> */}

                    <button 
                        type="submit" 
                        className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
                    >
                        게시판 생성하기
                    </button>
                </form>
                {message && (
                    <div className={`mt-6 p-4 rounded-md text-center ${isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`} role="alert">
                        {message}
                    </div>
                )}
            </div>
        </main>
    );
}

export default BoardCreatePage;