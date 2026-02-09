import { useState } from "react";

function CommentItem({ comment, onReplySubmit, onLike }) { // onLike 받기
    const [showReplyForm, setShowReplyForm] = useState(false);
    
    const [formData, setFormData] = useState({
        replycontents: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleReplySubmit = (e) => {
        e.preventDefault();
        if (!formData.replycontents.trim()) return;

        const commentData = {
            contents: formData.replycontents,
            parentCommentId: comment.id
        };
        
        onReplySubmit(commentData);
        setFormData({ replycontents: '' });
        setShowReplyForm(false);
    };
    
    return (
         <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-start">
                <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-1">
                        <strong className="font-semibold text-gray-800">{comment.authorNickname}</strong>
                        <span className="text-xs text-gray-400">
                            {new Date(comment.createdAt).toLocaleString()}
                        </span>
                    </div>
                    
                    {/* 댓글 본문 (JSON 필드명: contents) */}
                    <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{comment.contents}</p>
                    
                    {/* 액션 버튼 영역 (답글 + 좋아요) */}
                    <div className="flex items-center gap-3 mt-2">
                        {/* 1. 답글 버튼 */}
                        <button 
                            onClick={() => setShowReplyForm(!showReplyForm)}
                            className="text-sm text-blue-600 hover:text-blue-800 hover:underline flex-shrink-0 ml-4 font-medium transition-colors"
                        >
                            {showReplyForm ? '취소' : '대댓글'}
                        </button>
                        
                        {/* 2. 좋아요 버튼 (JSON의 liked, likesCount 사용) */}
                        <button 
                            onClick={() => onLike(comment.id)} // 클릭 시 상위 핸들러 호출
                            className={`flex items-center gap-1 text-xs font-medium transition-colors ${
                                comment.liked 
                                ? 'text-red-500' // 좋아요 누른 상태 (빨강)
                                : 'text-gray-400 hover:text-red-400' // 안 누른 상태 (회색 -> 호버시 연한 빨강)
                            }`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-3.5 w-3.5 ${comment.liked ? 'fill-current' : 'fill-none stroke-current'}`} viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            
                            {/* 좋아요 숫자 (0보다 클 때만 표시) */}
                            {comment.likesCount > 0 && <span>{comment.likesCount}</span>}
                        </button>
                    </div>
                </div>
            </div>

            {/* 대댓글 작성 폼 */}
            {showReplyForm && (
                <form onSubmit={handleReplySubmit} className="mt-4 ml-2 p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
                    <textarea 
                        name="replycontents" 
                        value={formData.replycontents}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none" 
                        rows="2" 
                        placeholder="대댓글 내용을 입력하세요..."
                        autoFocus
                        required
                    ></textarea>
                    <div className="text-right mt-2">
                        <button 
                            type="submit" 
                            className="px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-md hover:bg-blue-700 transition-colors"
                        >
                            등록
                        </button>
                    </div>
                </form>
            )}

            {comment.childComments && comment.childComments.length > 0 && (
                <div className="mt-4 ml-4 pl-4 border-l-2 border-gray-200 space-y-4">
                    {comment.childComments.map(child => (
                        <CommentItem 
                            key={child.id} 
                            comment={child} 
                            onReplySubmit={onReplySubmit}
                            onLike={onLike} // <- 재귀 호출 시에도 onLike 전달!
                        />
                    ))}
                </div>
            )}
        </div>
    );       
}

export default CommentItem;