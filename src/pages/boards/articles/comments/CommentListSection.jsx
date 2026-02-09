import { useState } from "react";
import CommentItem from "./CommentItem";

function CommentListSection({ comments, onCommentSubmit }) {
    const [formData, setFormData] = useState({
        contents: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleRootCommentSubmit = (e) => {
        e.preventDefault();
        
        if (!formData.contents.trim()) return;
        
        const commentData = {
            contents: formData.contents,
            parentCommentId: null
        };
        
        onCommentSubmit(commentData);
        
        setFormData({ contents: '' });
    };

    const handleReplySubmit = (commentData) => {
        onCommentSubmit(commentData);
    }

    return (
        <div>
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6 border border-gray-200">
                <form onSubmit={handleRootCommentSubmit}>
                    <div className="mb-3">
                        <textarea 
                            name="contents"
                            value={formData.contents} 
                            onChange={handleChange} 
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none" 
                            rows="3" 
                            placeholder="댓글을 입력하세요..." 
                            required
                        ></textarea>
                    </div>
                    <div className="text-right">
                        <button 
                            type="submit" 
                            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            댓글 등록
                        </button>
                    </div>
                </form>
            </div>
            
            <div className="space-y-4">
                {comments && comments.length > 0 ? comments.map(comment => (
                    <CommentItem 
                        key={comment.id} 
                        comment={comment} 
                        onReplySubmit={handleReplySubmit} 
                    />
                )) : (
                    <div className="p-8 text-center text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                        아직 작성된 댓글이 없습니다.
                    </div>
                )}
            </div>
        </div>
    );
}

export default CommentListSection;