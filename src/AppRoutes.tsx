import { Routes, Route, Navigate } from "react-router-dom"
import Layout from "./layouts/Layout";
import HomePage from "./pages/HomePage";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import UserProfilePage from "./pages/UserProfilePage";
import ProtectedRoute from "./auth/ProtectedRoute";
import MenuPage from "./pages/MenuPage";
import AboutUsPage from "./pages/AboutUsPage";
import LocationsPage from "./pages/LocationsPage";
import MenuItemDetailPage from "./pages/MenuItemDetailPage";
import CreateYourOwnMenuItemPage from "./pages/CreateYourOwnMenuItemPage";
import CustomizeMenuItemPage from "./pages/CustomizeMenuItemPage";

const AppRoutes = () => {
    return(
        <Routes>
            <Route path="/" element={<Layout><HomePage /></Layout>}></Route>
            <Route path="/auth-callback" element={<AuthCallbackPage/>}></Route>
            <Route path="/menu" element={<Layout><MenuPage /></Layout>}></Route>
            <Route path="/menu/:menuItemID" element={<Layout><MenuItemDetailPage /></Layout>}></Route>
            <Route path="/menu/custom" element={<Layout><CreateYourOwnMenuItemPage /></Layout>}></Route>
            <Route path="/menu/:menuItemID/custom/" element={<Layout><CustomizeMenuItemPage /></Layout>}></Route>
            <Route path="/about-us" element={<Layout><AboutUsPage /></Layout>}></Route>
            <Route path="/locations" element={<Layout><LocationsPage /></Layout>}></Route>
            <Route element={<ProtectedRoute />}><Route path="/profile" element={<Layout><UserProfilePage /></Layout>}></Route></Route>
            <Route path="*" element={<Navigate to="/"/>}></Route>
        </Routes>
    )
}

export default AppRoutes;