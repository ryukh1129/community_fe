import { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getArticleDetail } from '../../../apis/features/articles';
import { createComment } from '../../../apis/features/comments';
import { toggleArticleLike, toggleCommentLike } from '../../../apis/features/likes'; // API 임포트 확인
import CommentSection from './comments/CommentSection';

function ArticleDetailPage() {
    const { boardId, articleId } = useParams();
    const [article, setArticle] = useState(null);
    const navigate = useNavigate();
    
    // 1. 게시글 상세 조회
    const fetchArticle = useCallback(async () => {
        try {
            const response = await getArticleDetail(boardId, articleId);
            setArticle(response.data);
        } catch (error) {
            console.error("게시글 상세 조회 실패", error);
            alert("게시글을 불러올 수 없습니다.");
            navigate(`/boards/${boardId}`);
        }
    }, [boardId, articleId, navigate]);

    useEffect(() => {
        fetchArticle();
    }, [fetchArticle]);

    // 2. 게시글 좋아요 핸들러
    const handleArticleLike = async () => {
        try {
            await toggleArticleLike(boardId, articleId);
            await fetchArticle(); // 화면 갱신
        } catch (error) {
            console.error("게시글 좋아요 실패", error);
            if (error.response?.status === 401) alert("로그인이 필요합니다.");
        }
    };

    // 3. 댓글 좋아요 핸들러
    const handleCommentLike = async (commentId) => {
        try {
            await toggleCommentLike(boardId, articleId, commentId);
            await fetchArticle(); // 화면 갱신
        } catch (error) {
            console.error("댓글 좋아요 실패", error);
            if (error.response?.status === 401) alert("로그인이 필요합니다.");
        }
    };

    // 4. 댓글 작성 핸들러
    const handleCreateComment = async (commentData) => {
        try {
            await createComment(boardId, articleId, commentData);
            await fetchArticle();
        } catch (error) {
            console.error("댓글 작성 실패", error);
            alert("댓글 작성에 실패했습니다.");
        }
    };
    
    // 5. 트리 구조 변환 (JSON이 평탄화된 리스트로 오므로 필수)
    const nestedComments = useMemo(() => {
        if (!article?.comments) return [];
        
        const commentMap = new Map();
        const rootComments = [];
        
        // JSON 데이터의 필드들을 그대로 복사해서 Map에 저장
        article.comments.forEach(c => commentMap.set(c.id, { ...c, childComments: [] }));
        
        article.comments.forEach(c => {
            if (c.parentCommentId && commentMap.has(c.parentCommentId)) {
                commentMap.get(c.parentCommentId).childComments.push(commentMap.get(c.id));
            } else {
                rootComments.push(commentMap.get(c.id));
            }
        });
        return rootComments;
    }, [article]);

    if (!article) return <div className="text-center p-10">로딩 중...</div>;

    return (
        <main className="p-6 max-w-3xl mx-auto">
            {/* ... 헤더 및 본문 상단  ... */}
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
                <h1 className="text-2xl font-bold text-gray-800 truncate pr-4">{article.title}</h1>
                <button 
                    onClick={() => navigate(`/boards/${boardId}/articles`)} 
                    className="text-sm px-4 py-2 bg-gray-100 text-gray-600 font-medium rounded-lg hover:bg-gray-200 transition-colors flex-shrink-0"
                >
                    목록으로
                </button>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 mb-8">
                <div className="flex justify-between text-sm text-gray-500 border-b border-gray-100 pb-4 mb-6">
                    <div>
                        <span className="font-semibold text-gray-700 mr-2">작성자:</span>
                        {article.authorNickname}
                    </div>
                    <div>
                        <span className="font-semibold text-gray-700 mr-2">작성일:</span>
                        {new Date(article.createdAt || article.createAt).toLocaleString()}
                    </div>
                </div>

                {article.files && article.files.length > 0 && (
                    <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-lg text-sm text-blue-800">
                        <strong className="font-semibold mr-2">첨부파일:</strong> 
                        {article.files[0].originalFileName}
                    </div>
                )}

                <div className="prose max-w-none text-gray-800 mb-10">
                    <pre className="whitespace-pre-wrap break-words font-sans">{article.contents}</pre>
                </div>

                <div className="flex justify-center border-t border-gray-100 pt-6">
                    <button
                        onClick={handleArticleLike}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all shadow-sm border ${
                            article.liked 
                                ? 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100' 
                                : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
                        }`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${article.liked ? 'fill-current' : 'fill-none stroke-current'}`} viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <span>좋아요 {article.likesCount}</span>
                    </button>
                </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">
                    댓글 <span className="text-blue-600 ml-1">{article.comments ? article.comments.length : 0}</span>
                </h3>
                
                <CommentSection 
                    comments={nestedComments} 
                    onCommentSubmit={handleCreateComment}
                    onLike={handleCommentLike} // <- 핸들러 전달
                />
            </div>
            </main>
    );
}

export default ArticleDetailPage;