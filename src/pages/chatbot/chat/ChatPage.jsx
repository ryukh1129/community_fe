import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getChatDialogs, postMessage } from "../../../apis/features/chatbot";

// 채팅방 생성 직후 이동하고, 첫 질문을 자동 전송해야 한다.
function ChatPage() {
    const { roomId } = useParams();
    const [formData, setFormData] = useState({
        message: ''
    });
    const [dialogs, setDialogs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation(); // 파라미터 전달 받은 데이터용
    const chatWindowRef = useRef(null); // 채팅창 스크롤용  
    const navigate = useNavigate();

    const roomTitle = location.state?.title || 'Dummy Title';
    const firstQuestion = location.state?.firstQuestion;

    const hasSentFirstQuestion = useRef(false); // 첫질문 중복 전송 방지용 플래그

    useEffect(() => {
        const fetchDialogs = async () => {
            setIsLoading(true);
            try {
                const response = await getChatDialogs(roomId);
                setDialogs(response.data);
            } catch (error) {
                console.error("대화 내역 조회 실패", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchDialogs();
    }, [roomId]);

    useEffect(() => {
        if (chatWindowRef.current) {
            chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
        }
    }, [dialogs]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const sendMessage = async (message) => {
        if (!message.trim()) return;

        setDialogs(prev => [...prev, { senderType: 'USER', contents: message }]);
        setIsLoading(true);
        console.log("Sending message:", message);

        try {
            const response = await postMessage(roomId, { message });
            console.log("Received response:", response.data);
            setDialogs(prev => [...prev, { senderType: 'ASSISTANT', contents: response.data.response }]);
        } catch (error) {
            console.error("메시지 전송 실패", error);
            setDialogs(prev => [...prev, { senderType: 'ASSISTANT', contents: '메시지 전송에 실패했습니다. 다시 시도해주세요.' }]); 
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (firstQuestion && !hasSentFirstQuestion.current) {
            hasSentFirstQuestion.current = true;
            sendMessage(firstQuestion);
        }
    }, [firstQuestion]);

    const handleSummit = async (e) => {
        e.preventDefault();
        
        const messageToSend = formData.message.trim();
        if (!messageToSend) return;

        setFormData(prev => ({ ...prev, message: '' }));
        await sendMessage(messageToSend);
    }

    return (
        <div className="flex flex-col h-[calc(90vh-90px)] max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl shadow-blue-900/10 overflow-hidden border border-gray-100 my-4">
            
            {/* 1. 헤더 영역 */}
            <div className="flex justify-between items-center px-6 py-4 bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-10">
                <div className="flex items-center gap-3">
                     <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                            </svg>
                        </div>
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                     </div>
                     <div>
                        <h2 className="text-lg font-bold text-gray-800 truncate max-w-[200px] sm:max-w-md">{roomTitle}</h2>
                        <p className="text-xs text-blue-500 font-medium">AI Assistant Online</p>
                     </div>
                </div>
                <button 
                    onClick={() => navigate('/chatbot')} 
                    className="group flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-600 rounded-xl hover:bg-gray-100 transition-all text-sm font-medium"
                >
                    <svg className="w-4 h-4 text-gray-500 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span className="hidden sm:inline">목록으로</span>
                </button>
            </div>

            {/* 2. 채팅창 영역 */}
            <div ref={chatWindowRef} className="flex-grow overflow-y-auto p-6 space-y-6 bg-slate-50 scroll-smooth">
                {dialogs.length === 0 && !isLoading && (
                    <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-60">
                        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </div>
                        <p className="text-gray-500 font-medium">대화 내역이 없습니다.<br/>첫 메시지를 보내보세요!</p>
                    </div>
                )}
                
                {dialogs.map((dialog, index) => (
                    <div 
                        key={index} 
                        className={`flex w-full ${dialog.senderType === 'USER' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`flex max-w-[85%] md:max-w-[75%] gap-3 ${dialog.senderType === 'USER' ? 'flex-row-reverse' : 'flex-row'}`}>
                            {/* 아바타 */}
                            <div className="flex-shrink-0 mt-auto">
                                {dialog.senderType === 'USER' ? (
                                    <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                                        <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                ) : (
                                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white shadow-md">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                )}
                            </div>

                            {/* 말풍선 */}
                            <div 
                                className={`px-5 py-3.5 text-sm leading-relaxed shadow-sm break-words whitespace-pre-wrap ${
                                    dialog.senderType === 'USER' 
                                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl rounded-tr-none shadow-blue-500/20' 
                                    : 'bg-white text-gray-700 border border-gray-100 rounded-2xl rounded-tl-none shadow-sm'
                                }`}
                            >
                                {dialog.contents}
                            </div>
                        </div>
                    </div>
                ))}
                
                {isLoading && (
                    <div className="flex justify-start w-full">
                        <div className="flex gap-3 max-w-[85%]">
                             <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white shadow-md flex-shrink-0 mt-auto">
                                <svg className="w-5 h-5 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                            </div>
                            <div className="bg-white px-5 py-4 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm flex items-center gap-1.5">
                                <span className="text-xs font-medium text-gray-500 mr-1">답변 생성 중</span>
                                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0s'}}></span>
                                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></span>
                                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* 3. 입력 폼 영역 */}
            <div className="p-4 bg-white border-t border-gray-100">
                <form onSubmit={handleSummit} className="relative flex items-center gap-3 max-w-4xl mx-auto">
                    <input 
                        type="text" 
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        className="flex-grow px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white transition-all text-sm placeholder-gray-400 shadow-inner" 
                        placeholder="메시지를 입력하세요..." 
                        autoComplete="off" 
                        required 
                        disabled={isLoading} 
                    />
                    <button 
                        type="submit" 
                        className={`p-4 rounded-xl transition-all shadow-md flex-shrink-0 ${
                            isLoading 
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                            : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 active:scale-95'
                        }`}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            <svg className="w-5 h-5 transform rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ChatPage;