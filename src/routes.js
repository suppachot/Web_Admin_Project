/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Meetingroom from "layouts/meetingroom";
import Employee from "layouts/employee";
import Department from "layouts/department";
import News from "layouts/news";
import Checkin from "layouts/checkin";
import Checkout from "layouts/checkout";
import Notifications from "layouts/notifications";
import SignIn from "layouts/login/sign-in";
import SignUp from "layouts/login/sign-up";

// @mui icons
import Icon from "@mui/material/Icon";
import { MeetingRoom } from "@mui/icons-material";


const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Employee",
    key: "employee",
    icon: <Icon fontSize="small"></Icon>,
    route: "/employee",
    component: <Employee />, //edit
  },
  {
    type: "collapse",
    name: "Department",
    key: "department",
    icon: <Icon fontSize="small"></Icon>,
    route: "/department",
    component: <Department />,  //edit
  },
  {
    type: "collapse",
    name: "Meetingroom",
    key: "Meeting-room",
    icon: <Icon fontSize="small"></Icon>,
    route: "/meetingroom",
    component: <Meetingroom />,  //edit
  },
  {
    type: "collapse",
    name: "News",
    key: "news",
    icon: <Icon fontSize="small"></Icon>,
    route: "/news",
    component: <News />,  //edit
  },
  {
    type: "collapse",
    name: "Checkin",
    key: "checkin",
    icon: <Icon fontSize="small"></Icon>,
    route: "/checkin",
    component: <Checkin />,  //edit
  },
  {
    type: "collapse",
    name: "Checkout",
    key: "checkout",
    icon: <Icon fontSize="small"></Icon>,
    route: "/checkout",
    component: <Checkout />,  //edit
  },
  {
    type: "collapse",
    name: "Logout",
    key: "logout",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/login/sign-in",
    component: <SignIn />, 
  },
  {
    type: "collapse",
    name: "Tables",
    key: "tables",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/tables",
    component: <Tables />,
  },
  {
    type: "collapse",
    name: "Notifications",
    key: "notifications",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/notifications",
    component: <Notifications />,
  },
 
];

export default routes;