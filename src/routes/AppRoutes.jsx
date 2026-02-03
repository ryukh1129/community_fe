import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/home/HomePage";
import BoardListPage from "../pages/boards/BoardListPage";
import AdminPage from "../pages/admin/AdminPage";
import BoardManagementPage from "../pages/admin/board-management/BoardManagementPage";
import BoardCreatePage from "../pages/admin/board-management/BoardCreatePage";
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

            {/* admin */}
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin/boards" element={<BoardManagementPage />} />
            <Route path="/admin/boards/create" element={<BoardCreatePage />} />
            
            {/* Boards */}
            <Route path="/boards" element={<BoardListPage />} />
        </Routes>
    )
}

export default AppRoutes;