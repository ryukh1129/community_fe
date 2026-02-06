import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createArticle } from '../../../apis/features/articles';

function ArticleCreatePage() {
    const { boardId } = useParams();
    const [formData, setFormData] = useState({
        title: '',
        contents: '',
        file: null
    });
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: files ? files[0] : value
        }));
    };

    const handleCreateArticle = async (e) => {
        e.preventDefault();
        setMessage('');
        setIsError(false);

        try {
            await createArticle(boardId, formData);
            alert('게시글이 성공적으로 등록되었습니다.');
            navigate(`/boards/${boardId}/articles`);
        } catch (err) {
            const errorMessage = err.response?.data || '게시글 작성에 실패했습니다.';
            setMessage(errorMessage);
            setIsError(true);
            console.error('Article creation failed:', err);
        }
    };

    return (
        <main className="p-6 max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
                <h1 className="text-2xl font-bold text-gray-800">새 게시글 작성</h1>
                <button 
                    onClick={() => navigate(-1)} 
                    className="text-sm px-4 py-2 bg-gray-100 text-gray-600 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                >
                    작성 취소(뒤로가기)
                </button>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
                <form onSubmit={handleCreateArticle} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            제목:
                        </label>
                        <input 
                            type="text" 
                            name="title" 
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
                            placeholder="제목을 입력하세요" 
                            required 
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            내용:
                        </label>
                        <textarea 
                            name="contents" 
                            value={formData.contents}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
                            rows="12" 
                            placeholder="내용을 상세히 입력하세요" 
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            첨부 파일:
                        </label>
                        <input 
                            type="file" 
                            name="file" 
                            onChange={handleChange}
                            className="w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all cursor-pointer" 
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all shadow-lg active:scale-[0.98]"
                    >
                        게시글 등록하기
                    </button>
                </form>

                {message && (
                    <div 
                        className={`mt-6 p-4 rounded-md text-center text-sm font-medium ${
                            isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                        }`} 
                        role="alert"
                    >
                        {message}
                    </div>
                )}
            </div>
        </main>
    );
}

export default ArticleCreatePage;