import { Link } from "react-router-dom";

function NavLinks({ onClick, isLoggedIn, userRole, onLogout }) {
    const baseStyle = "px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 block transition-colors duration-200";
    
    return (
        <>
            {/* 공통 메뉴 */}
            <li>
                <Link className={baseStyle} to="/boards" onClick={onClick}>게시판</Link>
            </li>
            <li>
                <Link className={baseStyle} to="/chatbot" onClick={onClick}>AI 챗봇</Link>
            </li>

            {/* 관리자 전용 메뉴 */}
            {isLoggedIn && userRole === 'ROLE_ADMIN' && (
                <li>
                    <Link className={`${baseStyle} text-yellow-400 hover:text-yellow-300`} to="/admin" onClick={onClick}>
                        관리자
                    </Link>
                </li>
            )}

            {/* 로그인 여부에 따른 분기 */}
            {isLoggedIn ? (
                <li>
                    <button 
                        onClick={onLogout} 
                        className={`${baseStyle} w-full text-left border border-gray-600 hover:border-gray-500`}
                    >
                        로그아웃
                    </button>
                </li>
            ) : (
                <>
                    <li>
                        <Link className={baseStyle} to="/login" onClick={onClick}>로그인</Link>
                    </li>
                    <li>
                        <Link className={`${baseStyle} bg-blue-600 hover:bg-blue-700 text-white`} to="/signup" onClick={onClick}>
                            회원가입
                        </Link>
                    </li>
                </>
            )}
        </>
    );
}

export default NavLinks;