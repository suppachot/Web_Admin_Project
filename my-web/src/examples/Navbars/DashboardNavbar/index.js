import { useState, useEffect } from "react";

// react-router components
import { useLocation, Link } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @material-ui core components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
// Material Dashboard 2 React example components
import Breadcrumbs from "examples/Breadcrumbs";
import NotificationItem from "examples/Items/NotificationItem";

import Axios from "axios";
import jwtDecode from "jwt-decode";
import io from "socket.io-client";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Badge } from "@mui/material";
import Swal from "sweetalert2";

// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarMobileMenu,
} from "examples/Navbars/DashboardNavbar/styles";

// Material Dashboard 2 React context
import {
  useMaterialUIController,
  setTransparentNavbar,
  setMiniSidenav,
  setOpenConfigurator,
} from "context";

function DashboardNavbar({ absolute, light, isMini }) {
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator, darkMode } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  const route = useLocation().pathname.split("/").slice(1);

  const token = localStorage.getItem("jwt");
  const decodedToken = jwtDecode(token);
  const { emp, firstName, lastName } = decodedToken;

  // function to show a notification
  const [notificationCount, setNotificationCount] = useState(0);



  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    // Add notification count state
    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }

    /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
    window.addEventListener("scroll", handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);
  //const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  // const handleOpenMenu = (event) => {
  //   // Add notification count
  //   setNotificationCount(0);
  //   setOpenMenu(event.currentTarget);
  // };
  // const handleCloseMenu = () => setOpenMenu(false);

  const [initialNotificationCount, setInitialNotificationCount] = useState(0);
  useEffect(() => {
    const fetchInitialNotificationCount = async () => {
      try {
        const response = await Axios.get("http://localhost:5000/notificationCount");
        const count = response.data[0].count;
        setInitialNotificationCount(count);
        setNotificationCount(count);
      } catch (error) {
        console.error(error);
      }
    };
    fetchInitialNotificationCount();
    const intervalId = setInterval(fetchInitialNotificationCount, 3000);
    // Clear interval on cleanup
    return () => clearInterval(intervalId);
  }, []);
  // useEffect(() => {
  //   if (notificationCount < initialNotificationCount) {
  //     Swal.fire({
  //       icon: 'success',
  //       title: 'New Notification',
  //       text: `You have ${ initialNotificationCount- notificationCount} new meeting approve.`,
  //       timer: 5000, // แสดงข้อความ 5 วินาทีแล้วหายไป
  //       timerProgressBar: true 
  //     });
  //   }
  // }, [notificationCount, initialNotificationCount]);
  const handleCloseMenu = () => {
    // Set notification count to the initial count when closing the menu
    setNotificationCount(initialNotificationCount);
    setOpenMenu(false);
  };
  const handleOpenMenu = (event) => {
    setOpenMenu(event.currentTarget);
  };

  // Render the notifications menu
  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 2 }}
    >
      <Link to="/bookingmeeting">
        <NotificationItem icon={<Icon>email</Icon>} title={`Check new meeting approve (${notificationCount})`} />
      </Link>
    </Menu>
  );
  const handleNotificationClick = () => {
    // Add notification count
    setNotificationCount(notificationCount - 1);
  };

  // Styles for the navbar icons
  const iconsStyle = ({ palette: { dark, white, text }, functions: { rgba } }) => ({
    color: () => {
      let colorValue = light || darkMode ? white.main : dark.main;

      if (transparentNavbar && !light) {
        colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
      }

      return colorValue;
    },
  });

  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light, darkMode })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>

        <MDBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          <Link to="/dashboard">
            <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
          </Link>
        </MDBox>

        {/* <MDBox display="flex" alignItems="center" ml={1}>
          <MDTypography variant="body2" fontWeight="bold" color="text">
            EmployeeID: {emp}
            Name: {firstName} {lastName}
          </MDTypography>
        </MDBox> */}

        {isMini ? null : (
          <MDBox sx={(theme) => navbarRow(theme, { isMini })}>
            <MDBox color={light ? "white" : "inherit"}>
              <Link to="/employee">
                <IconButton sx={navbarIconButton} size="small" disableRipple>
                  <MDBox display="flex" alignItems="center" mr={2}>
                    <MDTypography variant="body2" fontWeight="bold" color="primary ">
                      {firstName} {lastName}
                    </MDTypography>
                  </MDBox>
                  <Icon sx={iconsStyle}>account_circle</Icon>
                </IconButton>
              </Link>
              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarMobileMenu}
                onClick={handleMiniSidenav}
              >
                <Icon sx={iconsStyle} fontSize="medium">
                  {miniSidenav ? "menu_open" : "menu"}
                </Icon>
              </IconButton>
              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarIconButton}
                onClick={handleConfiguratorOpen}
              >
                <Icon sx={iconsStyle}>settings</Icon>
              </IconButton>
              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarIconButton}
                aria-controls="notification-menu"
                aria-haspopup="true"
                variant="contained"
                onClick={handleOpenMenu}
              >
                <Badge badgeContent={notificationCount} color="error">
                  <Icon sx={iconsStyle}>notifications</Icon>
                </Badge>
              </IconButton>
              {renderMenu()}
              <ToastContainer />
            </MDBox>
          </MDBox>
        )}
      </Toolbar>
    </AppBar>
  );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;

