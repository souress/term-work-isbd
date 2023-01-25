import {
    ADMIN_ROUTE,
    CONTACTS_ROUTE,
    CAB_ROUTE,
    LOGIN_ROUTE,
    REG_ROUTE
} from "./utils/const";
import AuthPage from "./pages/AuthPage";
import ContactPage from "./pages/ContactPage";
import RegPage from "./pages/RegPage";
import AdminPanel from "./pages/AdminPanel";
import CabPage from "./pages/CabPage";

export const publicRoutes = [{
    path: LOGIN_ROUTE, Component: AuthPage
}, {
    path: REG_ROUTE, Component: RegPage
}, {
    path: CONTACTS_ROUTE, Component: ContactPage
}, {
    path: CAB_ROUTE, Component: CabPage
}]

export const adminRoutes = [{
    path: LOGIN_ROUTE, Component: AuthPage
}, {
    path: REG_ROUTE, Component: RegPage
}, {
    path: CONTACTS_ROUTE, Component: ContactPage
}, {
    path: ADMIN_ROUTE, Component: AdminPanel
}, {
    path: CAB_ROUTE, Component: CabPage
}]