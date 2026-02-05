import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/home/HomePage";
import BoardListPage from "../pages/boards/BoardListPage";
import AdminPage from "../pages/admin/AdminPage";
import BoardManagementPage from "../pages/admin/board-management/BoardManagementPage";
import BoardCreatePage from "../pages/admin/board-management/BoardCreatePage";
import LoginPage from "../pages/auth/LoginPage";
import SignUpPage from "../pages/auth/SignUpPage";
import ArticleListPage from "../pages/boards/articles/ArticleListPage";
import ArticleCreatePage from "../pages/boards/articles/ArticleCreatePage";
import ArticleDetailPage from "../pages/boards/articles/ArticleDetailPage";
import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
    return (
        <Routes>
            {/* Home */}
            <Route path="/" element={<HomePage />} />

            {/* Auth */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />

            {/* Admin */}
            <Route element={<ProtectedRoute />}>
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/admin/boards" element={<BoardManagementPage />} />
                <Route path="/admin/boards/create-form" element={<BoardCreatePage />} />
            </Route>

            {/* Boards */}
            <Route element={<ProtectedRoute />}>
                <Route path="/boards" element={<BoardListPage />} />
                <Route path="/boards/:boardId/articles" element={<ArticleListPage />} />
                <Route path="/boards/:boardId/articles/create-form" element={<ArticleCreatePage />} />
                <Route path="/boards/:boardId/articles/:articleId" element={<ArticleDetailPage />} />
            </Route>
        </Routes>
    )
}

export default AppRoutes;