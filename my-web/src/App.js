
import React, { useState, useEffect, useMemo } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// Material Dashboard 2 React themes
import theme from "assets/theme";

// Material Dashboard 2 React Dark Mode themes
import themeDark from "assets/theme-dark";

// Material Dashboard 2 React routes
import routes from "routes";
import Emproutes from "Emproutes";

// Material Dashboard 2 React contexts
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";

// Images logo
import brandWhite from "assets/images/TKS.png";
import brandDark from "assets/images/TKS.png";
import Basic from "layouts/login/sign-in";
import SignIn from "layouts/login/sign-in";

import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

export default function App() {

  //useAutoLogout();
  const navigate = useNavigate();
  useEffect(() => {
    const checkTokenExpiration = () => {
      const token = localStorage.getItem('jwt');
      if (!token) return;

      try {
        const decoded = jwt_decode(token);
        const currentTime = Math.floor(Date.now() / 1000);

        if (decoded.exp < currentTime) {
          localStorage.removeItem('jwt');
          sessionStorage.removeItem('role');
          sessionStorage.removeItem('emp');
          sessionStorage.removeItem('firstName');
          sessionStorage.removeItem('lastName');
          navigate('/login/sign-in');
        }
      } catch (error) {
        console.error('Invalid JWT token:', error);
      }
    };

    const interval = setInterval(checkTokenExpiration, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [navigate]);

  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  // Check user role and set routes accordingly
  const userRole = sessionStorage.getItem('role');
  const authorizedRoutes = userRole === 'Administrator' ? routes : Emproutes;

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  return (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      {/* {/* อันแรก */}
      {/* {layout === "dashboard" && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
            brandName="TKS"
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          <Configurator />
        </>
      )}  */}

  
      {layout === "dashboard" && sessionStorage.getItem('role') === 'Administrator' && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
            brandName="TKS"
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          <Configurator />
        </>
      )}

      {layout === "dashboard" && sessionStorage.getItem('role') === 'Employee' && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
            brandName="TKS"
            routes={Emproutes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          <Configurator />
        </>
      )}

        {/* แยก sidenav อย่างเดียวไม่แยกสิทธ์เจ้าถึง */}
      {/* {layout === "dashboard" && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
            brandName="TKS"
            routes={routes.filter(route => {
              // ตรวจสอบสิทธ์การเข้าถึงของผู้ใช้
              if (sessionStorage.getItem('role') === 'Administrator') {
                if (route.name === 'จองห้องประชุม') {
                  return false; // ซ่อนเมนูสำหรับ Administrator
                }
                return true; // แสดงเมนูทั้งหมดสำหรับ Administrator ยกเว้น ....
              } else if (route.name === "จองห้องประชุม" || route.name === "ประวัติการจอง" || route.name === "Logout") {
                return true; // แสดงเมนู Logout และ test สำหรับผู้ใช้ทั่วไปtest
              } else {
                return false; // ซ่อนเมนูอื่นๆ สำหรับผู้ใช้ทั่วไป
              }
            })}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          <Configurator />
        </>
      )} */}

      {layout === "vr" && <Configurator />}
      <Routes>

        {/* {getRoutes(routes)} */}
        {getRoutes(authorizedRoutes)}

        <Route path="*" element={<Navigate to="/login/sign-in" />} />

      </Routes>
    </ThemeProvider>
  );
}
