import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createChatRoom, getChatRooms } from "../../apis/features/chatbot";

function ChatRoomListPage() {
    const [rooms, setRooms] = useState([]);
    const [formData, setFormData] = useState({
        title: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await getChatRooms();
                setRooms(response.data);
            } catch (error) {
                console.error("채팅방 목록 조회 실패", error);
            }
        };
        fetchRooms();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCreateRoom = async (e) => {
        e.preventDefault();

        try {
            const response = await createChatRoom(formData);
            const newRoom = response.data;  
            navigate(`/chatbot/${newRoom.id}`, {
                 state: { 
                    title: newRoom.title,
                    firstQuestion: formData.title // 첫 질문 전달
                 }
            });
        } catch (err) {
            console.error('Chat room creation failed:', err);
            alert('채팅방 생성에 실패했습니다. 다시 시도해주세요.');
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto space-y-10">
                
                {/* 1. 헤더 영역 */}
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-2xl mb-2">
                        {/* 로봇 아이콘 SVG */}
                        <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                        AI Assistant
                    </h2>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                        궁금한 점이 있으신가요? 새로운 대화를 시작하거나<br className="hidden sm:block" />
                        이전 대화 기록을 통해 끊김 없는 경험을 이어가세요.
                    </p>
                </div>
                
                {/* 2. 새 대화 생성 영역 (카드형) */}
                <div className="bg-white rounded-3xl shadow-xl shadow-blue-900/5 overflow-hidden border border-gray-100 relative">
                    {/* 장식용 배경 */}
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full opacity-10 blur-2xl"></div>
                    
                    <div className="p-8 md:p-10">
                        <h5 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <span className="w-2 h-8 bg-blue-500 rounded-full"></span>
                            새로운 주제로 대화하기
                        </h5>
                        
                        <form onSubmit={handleCreateRoom} className="relative flex flex-col sm:flex-row gap-4">
                            <div className="relative flex-grow">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                    </svg>
                                </div>
                                <input 
                                    type="text" 
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-gray-800 placeholder-gray-400 shadow-sm"
                                    placeholder="무엇을 도와드릴까요? (예: 스프링 시큐리티 설정 방법 알려줘)" 
                                    required 
                                    autoComplete="off"
                                />
                            </div>
                            <button 
                                type="submit" 
                                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/30 transform transition hover:-translate-y-0.5 active:scale-95 whitespace-nowrap flex items-center justify-center gap-2"
                            >
                                <span>대화 시작</span>
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </button>
                        </form>
                    </div>
                </div>

            {/* 3. 구분선 및 제목 */}
                <div className="flex items-center gap-4">
                    <div className="h-px bg-gray-200 flex-grow"></div>
                    <h4 className="text-gray-500 font-medium text-sm uppercase tracking-wider">History</h4>
                    <div className="h-px bg-gray-200 flex-grow"></div>
                </div>

            {/* 4. 이전 대화 목록 (Grid) */}
                {rooms.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {rooms.map(room => (
                            <button 
                                key={room.id} 
                                onClick={() => navigate(`/chatbot/${room.id}`, { state: { title: room.title } })} 
                                className="group relative flex flex-col p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 hover:-translate-y-1 text-left h-full"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                        </svg>
                                    </div>
                                    <span className="text-xs font-medium text-gray-400 bg-gray-50 px-2 py-1 rounded-md group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                                        대화 이어가기
                                    </span>
                                </div>
                                <h5 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 leading-snug group-hover:text-blue-700 transition-colors">
                                    {room.title}
                                </h5>
                                <p className="text-sm text-gray-500 mt-auto pt-2 border-t border-gray-50 group-hover:border-gray-100 transition-colors">
                                    클릭하여 대화 내용을 확인하세요.
                                </p>
                            </button>
                        ))}
                    </div>
                ) : (
                    // 데이터가 없을 때 표시할 Empty State
                    <div className="text-center py-16">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4 text-gray-400">
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </div>
                        <p className="text-gray-500 text-lg">아직 대화 기록이 없습니다.</p>
                        <p className="text-gray-400 text-sm">위 입력창에서 첫 대화를 시작해보세요!</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ChatRoomListPage;