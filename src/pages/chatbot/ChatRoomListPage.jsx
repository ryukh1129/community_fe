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
            // 생성 -> 생성된 채팅방 자동 이동 -> 첫 채팅 전달
            navigate(`/chatbot/rooms/${response.data.id}`, {
                 state: { 
                    title: newRoom.title,
                    firstQuestion: formData.title
                 }
            });
        } catch (err) {
            console.error('Chat room creation failed:', err);
            alert('채팅방 생성에 실패했습니다. 다시 시도해주세요.');
        }
    };

    return (
        <div>
            {/* 페이지 헤더 영역 */}
            <div className="text-center pb-2 border-b">
                <h2 className="text-3xl font-bold">AI 챗봇</h2>
                <p className="mt-2 text-gray-500">새로운 대화를 시작하거나 이전 대화를 선택하세요.</p>
            </div>
            
            {/* 새 대화방 생성 폼 영역 */}
            <div className="my-6 p-6 bg-white rounded-lg shadow-md">
                <h5 className="text-xl font-bold mb-4">새 대화 시작</h5>
                <form onSubmit={handleCreateRoom} className="flex gap-2">
                    <input 
                        type="text" 
                        name="title" // handleChange에서 식별할 키 값
                        value={formData.title} // 상태와 UI 동기화
                        onChange={handleChange}
                        className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        placeholder="새 대화방 제목 (첫 질문으로 전송됩니다)" 
                        required 
                    />
                    <button 
                        type="submit" 
                        className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 whitespace-nowrap"
                    >
                        생성 및 입장
                    </button>
                </form>
            </div>

            <hr />

            {/* 기존 대화방 목록 영역 */}
            <h4 className="text-2xl font-bold mt-6">이전 대화 목록</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                {rooms.map(room => (
                    <button 
                        key={room.id} 
                        // 목록 클릭 시 해당 방으로 이동 (제목 정보 전달)
                        onClick={() => navigate(`/chatbot/${room.id}`, { state: { title: room.title } })} 
                        className="p-6 bg-white rounded-lg shadow-md text-left hover:shadow-lg transition-shadow"
                    >
                        <h5 className="text-lg font-bold">{room.title}</h5>
                        <p className="text-sm text-gray-500 mt-2">이전 대화를 계속합니다.</p>
                    </button>
                ))}
            </div>
        </div>
    );
}

export default ChatRoomListPage;