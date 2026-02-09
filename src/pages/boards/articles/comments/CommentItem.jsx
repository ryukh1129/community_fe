import { useState } from "react";

function CommentItem({ comment, onReplySubmit }) {
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
                <div>
                    <strong className="font-semibold text-gray-800">{comment.authorNickname}</strong>
                    <p className="text-gray-700 mt-1 whitespace-pre-wrap leading-relaxed">{comment.contents}</p>
                    <span className="text-xs text-gray-400 mt-2 block">
                        {new Date(comment.createdAt).toLocaleString()}
                    </span>
                </div>
                <button 
                    onClick={() => setShowReplyForm(!showReplyForm)}
                    className="text-sm text-blue-600 hover:text-blue-800 hover:underline flex-shrink-0 ml-4 font-medium transition-colors"
                >
                    {showReplyForm ? '취소' : '대댓글'}
                </button>
            </div>

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
                        />
                    ))}
                </div>
            )}
        </div>
    );       
}

export default CommentItem;