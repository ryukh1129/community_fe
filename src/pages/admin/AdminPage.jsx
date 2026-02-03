import { useNavigate } from "react-router-dom";
import ActionCard from "../../components/cards/ActionCard";

function AdminPage() {
    const navigate = useNavigate();

    return (
        <div>
            <div className="board-b mb-6">
                <h2 className="text-3xl font-bold">관리자 대시보드</h2>
                <p className="mt-2 text-gray-500">해당 웹 서비스의 여러 기능을 관리 할 수 있습니다.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ActionCard 
                    title="게시판 관리"
                    text="새로운 게시판을 생성하거나 기존 게시판을 관리합니다."
                    buttonText="게시판 관리"
                    buttonVariant="primary"
                    onButtonClick={() => { navigate('/admin/boards'); alert('게시판 관리 페이지로 이동'); }}
                />
                <ActionCard 
                    title="사용자 관리"
                    text="사용자 계정을 검토하고 관리합니다."
                    buttonText="사용자 관리"
                    buttonVariant="secondary"
                    onButtonClick={() => { alert('사용자 관리 페이지로 이동(구현예정)'); }}
                />
                <ActionCard 
                    title="사이트 관리"
                    text="웹 사이트 설정을 관리합니다."
                    buttonText="사이트 관리"
                    buttonVariant="secondary"
                    onButtonClick={() => { alert('사이트 관리 페이지로 이동(구현예정)'); }}
                />
            </div>
        </div>
    )
}

export default AdminPage;