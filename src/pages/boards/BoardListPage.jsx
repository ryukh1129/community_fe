import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ActionCard from '../../components/cards/ActionCard';
import { getBoards } from '../../apis/features/boards';

function BoardListPage() {
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
            } catch (error) {
                const errorMessage = error.response?.data || "게시판 목록을 불러오는 중 오류가 발생했습니다.";
                setMessage(errorMessage);
                setIsError(true);
                console.error("게시판 목록 조회 실패", error);
            }
        };
        fetchBoards();
    }, []);

    const handleBoardSelect = (board) => {
        navigate(`/boards/${board.id}/articles`, { state: { boardTitle: board.title } });
    };

    return (
        <main className="p-6 max-w-6xl mx-auto">
            {/* 상단 헤더 영역 */}
            <div className="mb-8 pb-4 border-b border-gray-200">
                <h1 className="text-2xl font-bold text-gray-800">게시판 목록</h1>
                <p className="mt-2 text-gray-500">관심 있는 게시판을 선택하여 자유롭게 소통해보세요.</p>
            </div>

            {/* 에러 메시지 처리 */}
            {message && (
                <div className={`mb-6 p-4 rounded-lg text-center ${isError ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-blue-50 text-blue-600 border border-blue-200'}`}>
                    {message}
                </div>
            )}

            {/* 게시판 카드 그리드 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {boards.length > 0 ? (
                    boards.map(board => (
                        <div key={board.id} className="transition-transform duration-200 hover:-translate-y-1">
                            <ActionCard
                                title={board.title}
                                text={board.description || `"${board.title}" 게시판에서 다양한 이야기를 나눠보세요.`}
                                buttonText="입장하기"
                                onButtonClick={() => handleBoardSelect(board)}
                            />
                        </div>
                    ))
                ) : (
                    !message && (
                        <div className="col-span-full py-20 text-center">
                            <p className="text-gray-400 text-lg">아직 생성된 게시판이 없습니다.</p>
                        </div>
                    )
                )}
            </div>
        </main>
    );
}

export default BoardListPage;