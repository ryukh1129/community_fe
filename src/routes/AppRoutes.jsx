import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/home/HomePage";
import BoardListPage from "../pages/boards/BoardListPage";
import LoginPage from "../pages/auth/LoginPage";
import SignUpPage from "../pages/auth/SignUpPage";

function AppRoutes() {
    return (
        <Routes>
            {/* Home */}
            <Route path="/" element={<HomePage />} />
            {/* Auth */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            {/* Boards */}
            <Route path="/boards" element={<BoardListPage />} />
        </Routes>
    )
}

export default AppRoutes;