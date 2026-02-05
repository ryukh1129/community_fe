import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getArticlesByBoard } from '../../../apis/features/articles';

function ArticleListPage() {
    const { boardId } = useParams();
    const location = useLocation();
    const boardTitle = location.state?.boardTitle || '게시글 목록';
    const [pageData, setPageData] = useState({
        content: [],
        page: { totalPages: 0, number: 0, totalElements: 0 },
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchArticles = async (page = 0) => {
            try {
                const response = await getArticlesByBoard(boardId, page);
                setPageData(response.data);
            } catch (error) {
                console.error("게시글 목록 조회 실패", error);
            }
        };
        fetchArticles(0);
    }, [boardId]);

    const handlePageChange = async (pageNumber) => {
        try {
            const response = await getArticlesByBoard(boardId, pageNumber);
            setPageData(response.data);
        } catch (error) {
            console.error("게시글 목록 조회 실패", error);
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-7">
            {/* 상단 헤더 섹션 */}
            <div className="flex justify-between items-end pb-6 border-b-2 border-gray-100">
                <div>
                    <h2 className="text-4xl font-extrabold text-gray-800 tracking-tight">{boardTitle}</h2>
                    <p className="mt-2 text-sm text-gray-500">총 {pageData.totalElements}개의 게시글이 있습니다.</p>
                </div>
                <button
                    onClick={() => navigate('/boards')}
                    className="px-5 py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-all duration-200 focus:ring-4 focus:ring-gray-100"
                >
                    게시판 목록으로
                </button>
            </div>

            {/* 테이블 UI */}
            <div className="mt-8 overflow-hidden shadow-sm border border-gray-200 rounded-xl">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-500 uppercase bg-gray-50/80 border-b border-gray-200">
                        <tr>
                            <th scope="col" className="px-6 py-4 w-1/12 text-center font-semibold">번호</th>
                            <th scope="col" className="px-6 py-4 w-7/12 font-semibold">제목</th>
                            <th scope="col" className="px-6 py-4 w-2/12 text-center font-semibold">작성자</th>
                            <th scope="col" className="px-6 py-4 w-2/12 text-center font-semibold">작성일</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white">
                        {pageData.content.length > 0 ? pageData.content.map((article, index) => (
                            <tr
                                key={article.id}
                                onClick={() => navigate(`/boards/${boardId}/articles/${article.id}`)}
                                className="hover:bg-blue-50/30 transition-colors duration-150 cursor-pointer group"
                            >
                                <td className="px-6 py-4 text-center text-gray-400">
                                    {pageData.totalElements - (pageData.number * 10) - index}
                                </td>
                                <th scope="row" className="px-6 py-4 font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                                    {article.title}
                                </th>
                                <td className="px-6 py-4 text-center text-gray-600">{article.authorNickname}</td>
                                <td className="px-6 py-4 text-center text-gray-500">
                                    {new Date(article.createdAt).toLocaleDateString('ko-KR', {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit'
                                    })}
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="4" className="text-center py-20 text-gray-400">
                                    <div className="flex flex-col items-center">
                                        <span className="text-lg font-medium">작성된 게시글이 없습니다.</span>
                                        <p className="text-sm">첫 번째 주인공이 되어보세요!</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* 하단 섹션 (페이징 & 글쓰기) */}
            <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                {/* 왼쪽 공백 처리 (중앙 정렬을 위해) */}
                <div className="hidden sm:block w-32"></div>

                {/* 페이징 UI */}
                {pageData.totalPages > 1 && (
                    <nav aria-label="Page navigation">
                        <ul className="inline-flex items-center -space-x-px shadow-sm rounded-md">
                            {Array.from({ length: pageData.totalPages }, (_, i) => (
                                <li key={i}>
                                    <button
                                        onClick={() => handlePageChange(i)}
                                        className={`px-4 py-2 border transition-colors ${
                                            pageData.number === i
                                            ? 'z-10 bg-blue-600 border-blue-600 text-white font-bold'
                                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                        } ${i === 0 ? 'rounded-l-md' : ''} ${i === pageData.totalPages - 1 ? 'rounded-r-md' : ''}`}
                                    >
                                        {i + 1}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                )}
                
                {/* 글쓰기 버튼 */}
                <button
                    onClick={() => navigate(`/boards/${boardId}/articles/create`)}
                    className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-200 active:scale-95"
                >
                    새 글 작성
                </button>
            </div>
        </div>
    );
}

export default ArticleListPage;