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
//Employee
import AddEmployee from "layouts/employee/addemployee";
import HomeEmployee from "layouts/employee/homeemployee";
import DetailEmpolyee from "layouts/employee/detailemployee";
import EditEmp from "layouts/employee/editemployee";

import ExportEmp from "layouts/employee/exportemp";
//Department
import Department from "layouts/department/department";
import AddDepartment from "layouts/department/add_department";
import DetailDepartment from "layouts/department/detail_department";
import EditDepartment from "layouts/department/edit_department";
//Role
import Role from "layouts/role/role";
import DetailRole from "layouts/role/detail_role";
import AddRole from "layouts/role/add_role";
import EditRole from "layouts/role/edit_role";
//Title
import HomeTitle from "layouts/title/hometitle";
import AddTitle from "layouts/title/addtitle";
import DetailTitle from "layouts/title/detail_title";
import EditTitle from "layouts/title/edit_title";

//news
import News from "layouts/news/news";
import CreateNews from "layouts/news/createnews";
import DetailNews from "layouts/news/detailnews";
import EditsNews from "layouts/news/editnews";

//meetingroom
import Meeting from "layouts/meetingroom/meeting";
import AddMeetingRoom from "layouts/meetingroom/addmeeting";
import EditMeetingRoom from "layouts/meetingroom/editmeeting";
//BookingApprove
import BookingApprove from "layouts/bookingApprove/bookinghome";

//checkin checkout
import Checkin from "layouts/checkin";
import DayCheckin from "layouts/checkin/daycheckin";
import Checkout from "layouts/checkout";
import DayCheckout from "layouts/checkout/daycheckout";


import SignIn from "layouts/login/sign-in";
import SignUp from "layouts/login/sign-up";
import Logout from "layouts/logout/logout";

// @mui icons
import Icon from "@mui/material/Icon";
import { ImportExport, MeetingRoom } from "@mui/icons-material";
import { PeopleAltIcon } from '@mui/icons-material/PeopleAlt';


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
    icon: <Icon fontSize="small">groups</Icon>,
    route: "/employee",
    component: <HomeEmployee />, 
  },
  {
    type: "collapse",
    name: "Department",
    key: "department",
    icon: <Icon fontSize="small"></Icon>,
    route: "/department",
    component: <Department />,  
  },
  {
    type: "collapse",
    name: "Role",
    key: "role",
    icon: <Icon fontSize="small"></Icon>,
    route: "/role",
    component: <Role />,  
  },
  {
    type: "collapse",
    name: "Title",
    key: "title",
    icon: <Icon fontSize="small"></Icon>,
    route: "/title",
    component: <HomeTitle />,  
  },
  {
    type: "collapse",
    name: "Meetingroom",
    key: "meetingroom",
    icon: <Icon fontSize="small">meeting_room</Icon>,
    route: "/meetingroom",
    component: <Meeting />,  
  },
  {
    type: "collapse",
    name: "Bookingmeeting",
    key: "bookingmeeting",
    icon: <Icon fontSize="small"></Icon>,
    route: "/bookingmeeting",
    component: <BookingApprove />,  
  },
  {
    type: "collapse",
    name: "News",
    key: "news",
    icon: <Icon fontSize="small">feed</Icon>,
    route: "/news",
    component: <News />,  
  },
  {
    type: "collapse",
    name: "Checkin",
    key: "checkin",
    icon: <Icon fontSize="small">how_to_reg</Icon>,
    route: "/checkin",
    component: <Checkin />,  
  },
  {
    type: "collapse",
    name: "Checkout",
    key: "checkout",
    icon: <Icon fontSize="small">how_to_reg</Icon>,
    route: "/checkout",
    component: <Checkout />,  
  },
  {
    type: "collapse",
    name: "Logout",
    key: "logout",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/logout",
    component: <Logout />, 
  },
  // {
  //   type: "collapse",
  //   name: "homeR",
  //   key: "homeR",
  //   route: "/homeR",
  //   component: <SignUp />, 
  // },
  {
    name: "Login",
    key: "Login",
    route: "/login/sign-in",
    component: <SignIn />,
  },
  {
    name: "addtitle",
    key: "addtitle",
    route: "/addTitle",
    component: <AddTitle />,
  },
  {
    key: "detailtitle",
    icon: <Icon fontSize="small"></Icon>,
    route: "/title/detail/:TitleID",
    component: <DetailTitle />,  
  },
  {
    key: "edittile",
    icon: <Icon fontSize="small"></Icon>,
    route: "/title/edit/:titleID",
    component: <EditTitle />,  
  },
  {
    name: "addemployee",
    key: "notifications",
    route: "/addEmpolyee",
    component: <AddEmployee />,
  },
  {
    name: "ecportemployee",
    key: "ecportemployee",
    route: "/export-Empolyee",
    component: <ExportEmp />,
  },
  {
    key: "detailsemployee",
    icon: <Icon fontSize="small"></Icon>,
    route: "/employee/detail/:EmployeeID",
    component: <DetailEmpolyee />,  
  },
  {
    key: "editemployee",
    icon: <Icon fontSize="small"></Icon>,
    route: "/employee/edit/:employeeID",
    component: <EditEmp />,  
  },

  {
    key: "adddepartment",
    icon: <Icon fontSize="small"></Icon>,
    route: "/addDepartment",
    component: <AddDepartment />,
  },
  {
    key: "detaildepartment",
    icon: <Icon fontSize="small"></Icon>,
    route: "/department/detail/:DepartmentID",
    component: <DetailDepartment />,
  },
  {
    key: "editdepartment",
    icon: <Icon fontSize="small"></Icon>,
    route: "/department/edit/:departmentID",
    component: <EditDepartment />,  
  },
  {
    key: "addrole",
    icon: <Icon fontSize="small"></Icon>,
    route: "/addRole",
    component: <AddRole />,
  },
  {
    key: "detailrole",
    icon: <Icon fontSize="small"></Icon>,
    route: "/role/detail/:RoleID",
    component: <DetailRole />,
  },
  {
    key: "editrole",
    icon: <Icon fontSize="small"></Icon>,
    route: "/role/edit/:roleID",
    component: <EditRole />,  
  },

  {
    key: "createnews",
    icon: <Icon fontSize="small"></Icon>,
    route: "/createnews",
    component: <CreateNews />,  
  },
  {
    name: "editsnews",
    key: "news",
    icon: <Icon fontSize="small"></Icon>,
    route: "/news/edit/:newsNo",
    component: <EditsNews />,  
  },
  {
    key: "detailsenews",
    icon: <Icon fontSize="small"></Icon>,
    route: "/news/detail/:NewsNo",
    component: <DetailNews />,  
  },
  {
    key: "addmeetingroom",
    icon: <Icon fontSize="small"></Icon>,
    route: "/addmeetingroom",
    component: <AddMeetingRoom />,  
  },
  {
    key: "editmeetingroom",
    icon: <Icon fontSize="small"></Icon>,
    route: "/meetingroom/edit/:roomID",
    component: <EditMeetingRoom />,  
  },
  {
    key: "daycheckin",
    icon: <Icon fontSize="small"></Icon>,
    route: "/checkinday",
    component: <DayCheckin />,  
  },
  {
    key: "daycheckout",
    icon: <Icon fontSize="small"></Icon>,
    route: "/checkoutday",
    component: <DayCheckout />,  
  }

];

export default routes;
