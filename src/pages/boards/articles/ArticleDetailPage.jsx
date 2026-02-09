import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getArticleDetail } from '../../../apis/features/articles';
// import { createComment } from '../../../apis/features/comments';

function ArticleDetailPage() {
    const { boardId, articleId } = useParams();
    const [article, setArticle] = useState(null);
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await getArticleDetail(boardId, articleId);
                setArticle(response.data);
            } catch (error) {
                console.error("게시글 상세 조회 실패", error);
                navigate(`/boards/${boardId}/articles`);
            }
        };
        fetchArticle();
    }, [boardId, articleId, navigate]);

    const handleCreateComment = async (e) => {
        e.preventDefault();
        const contents = e.target.commentcontents.value;
        if (!contents) return;
        try {
            await createComment(boardId, articleId, contents);
            e.target.reset();
            
            const response = await getArticleDetail(boardId, articleId);
            setArticle(response.data);

        } catch (error) {
            console.error("댓글 작성 실패", error);
            alert("댓글 작성에 실패했습니다.");
        }
    };

    if (!article) {
        return <div className="text-center p-10">로딩 중...</div>;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                 <h2 className="text-3xl font-bold truncate">{article.title}</h2>
                 <button 
                    onClick={() => navigate(`/boards/${boardId}/articles`)} 
                    className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 flex-shrink-0"
                 >
                    목록으로
                </button>
            </div>
            <div className="text-sm text-gray-500 border-b pb-3 mb-6">
                <strong className="font-semibold text-gray-700">작성자: {article.authorNickname}</strong> | <span>작성일: {new Date(article.createdAt).toLocaleString()}</span>
            </div>
            {article.files && article.files.length > 0 && (
                <div className="mb-6 p-4 bg-gray-100 border rounded-lg">
                    <strong className="font-semibold">첨부파일:</strong> {article.files[0].originalFileName}
                </div>
            )}
            <div className="prose max-w-none bg-white p-4 rounded-md">
                <pre className="whitespace-pre-wrap break-words font-sans">{article.contents}</pre>
            </div>
            <hr className="my-8" />
            <h3 className="text-2xl font-bold mb-4">댓글</h3>
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                <form onSubmit={handleCreateComment}>
                    <div className="mb-3">
                        <textarea 
                            name="commentcontents" 
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            rows="3" 
                            placeholder="댓글을 입력하세요..." 
                            required
                        ></textarea>
                    </div>
                    <button 
                        type="submit" 
                        className="px-4 py-2 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600"
                    >
                        댓글 등록
                    </button>
                </form>
            </div>
            <ul className="space-y-3">
                {article.comments && article.comments.length > 0 ? article.comments.map(comment => (
                    <li key={comment.id} className="p-4 bg-gray-50 border rounded-lg">
                        <strong className="font-semibold">익명:</strong> {comment.contents}
                    </li>
                )) : <li className="p-4 text-center text-gray-500 bg-gray-100 rounded-lg">댓글이 없습니다.</li>}
            </ul>
        </div>
    );
}

export default ArticleDetailPage;