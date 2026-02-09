import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getArticleDetail } from '../../../apis/features/articles';
import { createComment } from '../../../apis/features/comments';
import { toggleArticleLike } from '../../../apis/features/likes';
import CommentSection from './comments/CommentSection';

function ArticleDetailPage() {
    const { boardId, articleId } = useParams();
    const [article, setArticle] = useState(null);
    const navigate = useNavigate();
    
    // useMemo() 훅 : 댓글 데이터를 트리 구조로 변환하여 Memoization(캐싱) 처리
    const nestedComments = useMemo(() => {
        // 1. 댓글 데이터가 없으면 빈 배열 반환
        if (!article?.comments) return [];

        const commentMap = new Map(); // 댓글을 ID로 빠르게 찾기 위한 저장소
        const rootComments = []; // 최상위(부모가 없는) 댓글을 담을 배열

        // [첫 번째 반복문] : 모든 댓글을 Map에 등록 (준비 단계)
        // "댓글 목록에서 하나씩(comment) 꺼내서 실행"
        article.comments.forEach((comment) => {
            // 기존 댓글 데이터(...comment)에 대댓글을 담을 빈 배열(childComments: [])을 추가해서
            // Map에 저장(Key: 댓글ID, Value: 댓글객체)
            commentMap.set(comment.id, { ...comment, childComments: [] });
        });

        // [두 번째 반복문] : 부모-자식 연결 (조립 단계)
        // "다시 댓글 목록에서 하나씩(comment) 꺼내서 확인"
        article.comments.forEach((comment) => {
            // 1. 이 댓글(comment)에게 부모가 있는가?
            if (comment.parentCommentId) {
                // 부모가 있다면, Map에서 부모 댓글 찾기
                const parentComment = commentMap.get(comment.parentCommentId);
                // 부모 댓글이 실제로 존재한다면?
                if (parentComment) {
                    // 부모 댓글의 'childComments' 목록에 '나(현재 댓글)'를 집어넣기 (연결)
                    // 여기서 들어가는 '나'는 위에서 childComments가 추가된 버전(commentMap.get(comment.id))
                    parentComment.childComments.push(commentMap.get(comment.id));
                }
            } 
            // 2. 부모가 없다면? (최상위 댓글)
            else {
                // 바로 화면에 보여질 최상위 목록에 넣기
                rootComments.push(commentMap.get(comment.id));
            }
        });
    // 정리가 끝난 최상위 댓글 목록(자식들을 품고 있음)을 반환
    return rootComments;

    }, [article]);

    const fetchArticle = async () => {
        try {
            const response = await getArticleDetail(boardId, articleId);
            setArticle(response.data);
        } catch (error) {
            console.error("게시글 상세 조회 실패", error);
            alert("게시글을 불러올 수 없습니다.");
            navigate(`/boards`);
        }
    };

    useEffect(() => {
        fetchArticle();
    }, [boardId, articleId, navigate]);

    const handleCreateComment = async (commentData) => {
        try {
            await createComment(boardId, articleId, commentData);
            await fetchArticle();
        } catch (error) {
            console.error("댓글 작성 실패", error);
            alert("댓글 작성에 실패했습니다.");
        }
    };

    if (!article) {
        return <div className="text-center p-10">로딩 중...</div>;
    }

    const handleArticleLike = async () => {
        try {
            await toggleArticleLike(boardId, articleId);
            await fetchArticle();
        } catch (error) {
            console.error("좋아요 요청 실패", error);
            if (error.response?.status === 401) {
                alert("로그인이 필요한 서비스입니다.");
            }
        }
    };
    
    return (
        <main className="p-6 max-w-3xl mx-auto">
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
                    <pre className="whitespace-pre-wrap break-words font-sans">{article.content || article.contents}</pre>
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
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className={`h-5 w-5 transition-colors ${article.liked ? 'fill-current' : 'fill-none stroke-current'}`} 
                            viewBox="0 0 24 24" 
                            strokeWidth="2" 
                            stroke="currentColor"
                        >
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
                />
            </div>
            </main>
    );
}

export default ArticleDetailPage;