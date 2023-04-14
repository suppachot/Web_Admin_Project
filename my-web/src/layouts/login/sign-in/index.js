
import { useState } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";


// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// login layout components
import BasicLayout from "layouts/login/components/BasicLayout";

// Images backgrond
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import { Axios } from 'axios';
import { message } from 'antd';
import jwtDecode from "jwt-decode";
import axios from "axios";



function Basic() {
  const [rememberMe, setRememberMe] = useState(false);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const [Password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [loginStatus, setLoginStatus] = useState("");
  const navigate = useNavigate();

  const [employeeID, setEmployeeID] = useState('');
  const [pincode, setPincode] = useState('');
  const [error, setError] = useState(null);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post('http://localhost:5000/api/login', {
  //       employeeID,
  //       pincode,
  //     });

  //     const token = response.data.token;
  //     localStorage.setItem('jwt', token);
  //     setError(null);
  //     navigate("/dashboard");
  //   console.log(response);
    
  //   } catch (error) {
  //     setError('Invalid EmployeeID or Pincode.');
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        employeeID,
        pincode,
      });
  
      const { token, firstName, lastName, emp } = response.data;
      localStorage.setItem('jwt', token);
      localStorage.setItem('emp', emp);
      localStorage.setItem('firstName', firstName);
      localStorage.setItem('lastName', lastName);
      
      setError(null);
      navigate('/dashboard');
    } catch (error) {
      setError('Invalid EmployeeID or Pincode.');
    }
  };
  



  return (
    <BasicLayout image={bgImage}>
      <Card>

        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
        </MDBox>
        {/* <form onSubmit={handleSubmit}> */}

          <MDBox pt={4} pb={3} px={3}>
            <MDBox component="form" role="form" onSubmit={handleSubmit} >
              <MDBox mb={2}>
                <MDInput type="text" label="EmployeeID" value={employeeID} required onChange={(e) => setEmployeeID(e.target.value)} fullWidth />
              </MDBox>
              <MDBox mb={2}>
                <MDInput type="Password" label="Pincode" value={pincode} required onChange={(e) => setPincode(e.target.value)} fullWidth />
              </MDBox>
              {/* <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox> */}


              {error && <div className="error">{error}</div>}
              <MDBox mt={4} mb={1}>
                <MDButton variant="gradient"
                  color="info" fullWidth
                  // component={Link}
                  // to="dashboard"
                  type="submit"
                //onClick={handleLogin}
                >
                  Log in
                </MDButton>
              </MDBox>
            </MDBox>
          </MDBox>
        {/* </form> */}
      </Card>
    </BasicLayout>
  );
}

export default Basic;
