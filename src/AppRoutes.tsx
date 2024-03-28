import { Routes, Route, Navigate } from "react-router-dom"
import Layout from "./layouts/Layout";
import HomePage from "./pages/HomePage";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import UserProfilePage from "./pages/UserProfilePage";
import ProtectedRoute from "./auth/ProtectedRoute";
import MenuPage from "./pages/menu/MenuPage";
import AboutUsPage from "./pages/AboutUsPage";
import LocationsPage from "./pages/LocationsPage";
import MenuItemDetailPage from "./pages/menu/MenuItemDetailPage";
import CreateYourOwnMenuItemPage from "./pages/menu/CreateYourOwnMenuItemPage";
import CustomizeMenuItemPage from "./pages/menu/CustomizeMenuItemPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderPage from "./pages/order/OrderPage";

const AppRoutes = () => {
    return(
        <Routes>
            <Route path="/" element={<Layout><HomePage /></Layout>}></Route>
            <Route path="/auth-callback" element={<AuthCallbackPage/>}></Route>

            <Route path="/menu" element={<Layout><MenuPage /></Layout>}></Route>
            <Route path="/menu/:menuItemID" element={<Layout hideMobileFooter={true}><MenuItemDetailPage /></Layout>}></Route>
            <Route path="/menu/custom" element={<Layout hideMobileFooter={true}><CreateYourOwnMenuItemPage /></Layout>}></Route>
            <Route path="/menu/:menuItemID/custom/" element={<Layout hideMobileFooter={true}><CustomizeMenuItemPage /></Layout>}></Route>
            <Route path="/about-us" element={<Layout fullPage={true}><AboutUsPage /></Layout>}></Route>
            <Route path="/locations" element={<Layout><LocationsPage /></Layout>}></Route>

            <Route element={<ProtectedRoute />}>
                <Route path="/profile" element={<Layout><UserProfilePage /></Layout>}></Route>
                <Route path="/checkout" element={<Layout><CheckoutPage /></Layout>}></Route>
               
                
                <Route path="/order/status" element={<Layout><OrderPage /></Layout>}></Route>

            </Route>

            <Route path="*" element={<Navigate to="/"/>}></Route>
        </Routes>
    )
}

export default AppRoutes;