
/**


  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.

  The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Test from "./pages/Test";
import Result from "./pages/Result";
import Register from "./pages/Register";


const routes = [
  {
    name: "Home",
    key: "home",
    route: "/home",
    component: <Home />,
  },
  {
    name: "Admin",
    key: "admin",
    route: "/admin",
    component: <Admin />,
  },
  {
    name: "Test",
    key: "test",
    route: "/test",
    component: <Test />,
  },
  {
    name: "Result",
    key: "result",
    route: "/result",
    component: <Result />,
  },
  {
    name: "Register",
    key: "register",
    route: "/register",
    component: <Register />,
  },

];

export default routes;
