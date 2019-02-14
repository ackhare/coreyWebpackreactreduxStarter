import Dashboard from "../layouts/Dashboard/Dashboard.jsx";
import AboutPage from "../components/AboutPage";
import FuelSavingsPage from "../components/containers/FuelSavingsPage";
import NotFoundPage from "../components/NotFoundPage";
var indexRoutes = [{ path: "/", name: "Home", component: Dashboard },
{ path: "/fuel-savings", name: "Home", component: FuelSavingsPage },
{ path: "/about", name: "Home", component: AboutPage },
{ name: "Home", component: NotFoundPage  }

];

export default indexRoutes;
