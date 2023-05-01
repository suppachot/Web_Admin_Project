import SignIn from "layouts/login/sign-in";
import SignUp from "layouts/login/sign-up";
import Logout from "layouts/logout/logout";
import Cover from "layouts/login/reset-password/cover";
import ResetPW from "layouts/login/reset-password/cover/resetpassword";
// @mui icons
import Icon from "@mui/material/Icon";
import { PeopleAltIcon } from '@mui/icons-material/PeopleAlt';
import ReserveMeeting from "layoutsEmp/reserve_meeting";
import HistoryMeeting from "layoutsEmp/history_meeting";
import InsertMeeting from "layoutsEmp/Insertmeeting";

const Emproutes = [
  {
    type: "collapse",
    name: "จองห้องประชุม",
    key: "reservemeeting",
    icon: <Icon fontSize="small"></Icon>,
    route: "/reservemeeting",
    component: <ReserveMeeting />,  
  },
  {
    type: "collapse",
    name: "ประวัติการจองห้องประชุม",
    key: "historymeeting",
    icon: <Icon fontSize="small"></Icon>,
    route: "/historymeeting",
    component: <HistoryMeeting />,  
  },
  {
    type: "collapse",
    name: "Logout",
    key: "logout",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/logout",
    component: <Logout />, 
  },
  {
    name: "reserve",
    key: "reserve",
    route: "/reserve/:RoomID",
    component: <InsertMeeting />,
  },
  {
    name: "Login",
    key: "Login",
    route: "/login/sign-in",
    component: <SignIn />,
  },
  {
    key: "signup",
    icon: <Icon fontSize="small"></Icon>,
    route: "/login/sign-up",
    component: <SignUp />,  
  },
  {
    key: "cover",
    icon: <Icon fontSize="small"></Icon>,
    route: "/cover",
    component: <Cover />,  
  },
  {
    key: "resetpw",
    icon: <Icon fontSize="small"></Icon>,
    route: "/resetpassword/:resetToken",
    component: <ResetPW />,  
  }

];

export default Emproutes;


