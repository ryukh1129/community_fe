import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBoards } from "../../../apis/features/boards";

function BoardManagementPage() {
    const [boards, setBoards] = useState([]);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchBoards = async () => {
            setMessage('');
            setIsError(false);

            try {
                const response = await getBoards();
                setBoards(response.data);
            } catch (err) {
                const errorMessage = err.response?.data || '게시판 조회 중 오류가 발생했습니다.';
                setMessage(`게시판 조회 실패: ${errorMessage}`);
                setIsError(true);
                console.error('Fetching boards list failed:', err);
            }
        };
        fetchBoards();
    }, []);

    return (
        <div className="p-6 max-w-6xl mx-auto">
            {/* 상단 헤더 영역 */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">게시판 관리</h1>
                <button 
                    onClick={() => navigate('/admin/boards/create-form')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                >
                    새 게시판 생성
                </button>
            </div>

            {/* 에러/알림 메시지 */}
            {message && (
                <div className={`mb-4 p-4 rounded-lg ${isError ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-blue-50 text-blue-600 border border-blue-200'}`}>
                    {message}
                </div>
            )}

            {/* 게시판 목록 테이블 */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-center text-m font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-3 text-center text-m font-medium text-gray-500 uppercase tracking-wider">게시판 이름</th>
                            <th className="px-6 py-3 text-center text-m font-medium text-gray-500 uppercase tracking-wider">관리</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {boards.length > 0 ? (
                            boards.map((board) => (
                                <tr key={board.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-m text-gray-500">{board.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-m font-semibold text-gray-900">{board.title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-m font-medium">
                                        <button 
                                            onClick={() => navigate(`/admin/boards/${board.id}/edit-form`)}
                                            className="text-indigo-600 hover:text-indigo-900 mr-4"
                                        >
                                        수정
                                        </button>
                                        <button className="text-red-600 hover:text-red-900">삭제</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="px-6 py-10 text-center text-gray-400">
                                    등록된 게시판이 없습니다.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default BoardManagementPage;