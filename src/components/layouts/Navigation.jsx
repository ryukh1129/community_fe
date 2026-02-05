import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavLinks from "./NavLinks";
import { useAuth } from "../../hooks/useAuth"; // useAuth 경로를 실제 위치에 맞게 수정하세요

function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const { isLoggedIn, userRole } = useAuth();
    const navigate = useNavigate();

    // 로그아웃 핸들러
    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        alert('로그아웃 되었습니다.');
        setIsOpen(false); // 모바일 메뉴 닫기
        navigate('/');
        window.location.reload(); // 상태 초기화를 위해 새로고침
    };

    // 메뉴 닫기 핸들러 (Link 클릭 시)
    const handleClose = () => setIsOpen(false);

    return (
        <nav className="bg-gray-800 text-white shadow-md">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    {/* 로고 */}
                    <Link 
                        className="text-xl font-bold hover:text-gray-300" 
                        to="/" 
                        onClick={handleClose}
                    >
                        Logo
                    </Link>

                    {/* 데스크탑 메뉴 (md 이상에서 표시) */}
                    <ul className="hidden md:flex items-center space-x-4">
                        <NavLinks 
                            isLoggedIn={isLoggedIn} 
                            userRole={userRole} 
                            onLogout={handleLogout} 
                        />
                    </ul>

                    {/* 모바일 햄버거 버튼 (md 미만에서만 표시) */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-300 hover:text-white focus:outline-none"
                        >
                            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                                {isOpen ? (
                                    <path fillRule="evenodd" clipRule="evenodd" d="M18.278 16.864a1 1 0 01-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 01-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 011.414-1.414l4.829 4.828 4.828-4.828a1 1 0 111.414 1.414l-4.828 4.829 4.828 4.828z" />
                                ) : (
                                    <path fillRule="evenodd" d="M4 5h16a1 1 0 010 2H4a1 1 0 110-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2z" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* 모바일 드롭다운 메뉴 */}
                <div className={`${isOpen ? "block" : "hidden"} md:hidden pb-4 border-t border-gray-700 mt-2 pt-2`}>
                    <ul className="flex flex-col space-y-2">
                        {/* 모바일에서는 클릭 시 메뉴가 닫혀야 하므로 onClick 전달 */}
                        <NavLinks 
                            onClick={handleClose} 
                            isLoggedIn={isLoggedIn} 
                            userRole={userRole} 
                            onLogout={handleLogout} 
                        />
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navigation;