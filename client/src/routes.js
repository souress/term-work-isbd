import {
    ADMIN_ROUTE,
    CONTACTS_ROUTE,
    CAB_ROUTE,
    LOGIN_ROUTE,
    REG_ROUTE,
    SCHEDULE_ROUTE, DEPARTMENT_ROUTE
} from "./utils/const";
import AuthPage from "./pages/AuthPage";
import ContactPage from "./pages/ContactPage";
import RegPage from "./pages/RegPage";
import AdminPanel from "./pages/AdminPanel";
import CabPage from "./pages/CabPage";
import SchedulePage from "./pages/SchedulePage";
import DepartmentPage from "./pages/DepartmentPage";

export const moderatorRoutes = [{
    path: LOGIN_ROUTE, Component: AuthPage
}, {
    path: REG_ROUTE, Component: RegPage
}, {
    path: DEPARTMENT_ROUTE, Component: DepartmentPage
}]

export const publicRoutes = [{
    path: LOGIN_ROUTE, Component: AuthPage
}, {
    path: REG_ROUTE, Component: RegPage
}, {
    path: CONTACTS_ROUTE, Component: ContactPage
}, {
    path: CAB_ROUTE, Component: CabPage
}, {
    path: SCHEDULE_ROUTE, Component: SchedulePage
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
}, {
    path: SCHEDULE_ROUTE, Component: SchedulePage
}]