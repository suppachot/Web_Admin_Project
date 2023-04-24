// react-router-dom components
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Typography from "antd/es/typography/Typography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import axios from "axios";

// login layout components
import CoverLayout from "layouts/login/components/CoverLayout";
// Images backgrond
import bgImage from "assets/images/TKS_lo.jpg";


function SignUp() {
  const [employeeID, setEmployeeID] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState("");

  const [showError, setShowError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleShowPassword = () => setShowPassword(!showPassword);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://103.253.73.66:5001/api/register", {
        employeeID,
        email,
        password,
      });
      setError(null);
      navigate('/login/sign-in');
    } catch (error) {
      setError('Invalid EmployeeID or Pincode.');
    }
    if (password.length < 6 || !/(?=.*[a-zA-Z])(?=.*[0-9])/.test(password)) {
      setShowError(true);
      return;
    }
  };


  return (
    <CoverLayout image={bgImage} >
      <Card>

        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign up
          </MDTypography>

        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={handleSubmit}>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="EmployeeID"
                variant="standard"
                value={employeeID} required
                onChange={(e) => setEmployeeID(e.target.value)}
                fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                variant="standard"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type={showPassword ? "text" : "password"}
                label="Password"
                variant="standard"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                inputProps={{
                  minLength: 6, // เพิ่มเงื่อนไขความยาวของรหัสผ่านเป็น 8 ตัวอักษรขึ้นไป
                  // pattern: "^(?=.*[a-zA-Z])(?=.*[0-9])", // เพิ่มเงื่อนไขให้มีตัวเลขและตัวอักษรอย่างน้อย 1 ตัว
                }}
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={handleShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                }}
              />
              {password.length < 6 && (
                <Typography color="error" style={{ color: "red", fontSize: "1.3rem" }}>
                  กรุณาตั้งรหัสอย่างน้อย 6 ตัวอักษรขึ้นไป
                </Typography>
              )}
            </MDBox>
            <Typography color="error" style={{ color: "blue" }}> ** รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร
              <br></br>[ ประกอบไปด้วยอักษร (a-z, A-Z , 0-9) อย่างน้อย 1 ตัว ]
            </Typography>

            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient"
                color="info" fullWidth
                //component={Link}
                // to="/login/sign-in"
                type="submit"
              >
                sign Up
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Already have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/login/sign-in"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign In
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default SignUp;
