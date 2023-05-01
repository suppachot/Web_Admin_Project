import { useState } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// login layout components
import BasicLayout from "layouts/login/components/BasicLayout";

// Images backgrond
import bgImage from "assets/images/bg.jpg";
import axios from "axios";

function Basic() {

  const navigate = useNavigate();
  const [employeeID, setEmployeeID] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://103.253.73.66:5001/api/login', {
        employeeID,
        password,
      });

      const { token, firstName, lastName, emp ,role} = response.data;
      localStorage.setItem('jwt', token);
      sessionStorage.setItem('emp', emp);
      sessionStorage.setItem('firstName', firstName);
      sessionStorage.setItem('lastName', lastName);
      sessionStorage.setItem('role', role);

      setError(null);
      if (role === "Administrator") {
        navigate('/dashboard');
      } else {
        navigate('/reservemeeting');
      }
    } catch (error) {
      setError('Invalid EmployeeID or Password.');
    }
  };
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);
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

        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={handleSubmit} >
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="EmployeeID"
                value={employeeID}
                required
                onChange={(e) => setEmployeeID(e.target.value)}
                fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type={showPassword ? "text" : "password"}
                label="Password"
                value={password}
                required onChange={(e) => setPassword(e.target.value)}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={handleShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                }}
              />
            </MDBox>
            {error && <div className="error" style={{ color: 'red' }} >{error}</div>}

            <MDBox mt={3} mb={1} textAlign="right">
              <MDTypography variant="button" color="text">
                <MDTypography
                  component={Link}
                  to="/cover"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Forgotten password?
                </MDTypography>
              </MDTypography>
            </MDBox>

            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient"
                color="info" fullWidth
                type="submit"
              >
                Log in
              </MDButton>
            </MDBox>
          </MDBox>

          <MDBox mt={3} mb={1} textAlign="center">
            <MDTypography variant="button" color="text">
              You don't have an account yet? {" "}
              <MDTypography
                component={Link}
                to="/login/sign-up"
                variant="button"
                color="info"
                fontWeight="medium"
                textGradient
              >
                Sign up
              </MDTypography>
            </MDTypography>
          </MDBox>

        </MDBox>

      </Card>
    </BasicLayout>
  );
}

export default Basic;
