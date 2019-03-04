import Dashboard from "../views/Dashboard/DashboardView";
import UserProfile from "../views/UserProfile/UserProfile";
import TableList from "../views/TableList/TableList";
import Typography from "../views/Typography/Typography";
import Icons from "../views/Icons/Icons";
import Maps from "../views/Maps/Maps";
import Notifications from "../views/Notifications/Notifications";
import Upgrade from "../views/Upgrade/Upgrade";

const dashboardRoutes = [
  {
    path: "/admin/dashboard",
    name: "Dashboard",
    icon: "pe-7s-graph",
    component: Dashboard
  },
  {
    path: "/admin/user",
    name: "User Profile",
    icon: "pe-7s-user",
    component: UserProfile
  },
  {
    path: "/admin/table",
    name: "Table List",
    icon: "pe-7s-note2",
    component: TableList
  },
  {
    path: "/admin/typography",
    name: "Typography",
    icon: "pe-7s-news-paper",
    component: Typography
  },
  { path: "/admin/icons", name: "Icons", icon: "pe-7s-science", component: Icons },
  { path: "/admin/maps", name: "Maps", icon: "pe-7s-map-marker", component: Maps },
  {
    path: "/admin/notifications",
    name: "Notifications",
    icon: "pe-7s-bell",
    component: Notifications
  },
  {

    path: "/admin/blogArunya",
    name: "Update Arunya Blog",
    icon: "pe-7s-rocket",
    component: Upgrade
  },
    // { redirect: true, path: "/admin", to: "/admin/dashboard", name: "Dashboard" }
];

export default dashboardRoutes;
