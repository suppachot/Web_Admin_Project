// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// login layout components
import CoverLayout from "layouts/login/components/CoverLayout";

// Images
import bgImage from "assets/images/TKS_lo.jpg";

import { useState } from "react";
// react-router-dom components
import { Link, useNavigate, useParams } from "react-router-dom";
import { Axios } from 'axios';
import { message } from 'antd';
import jwtDecode from "jwt-decode";
import axios from "axios";
import Swal from "sweetalert2";

function ResetPW() {

  const { resetToken } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      await Swal.fire('Password do not match');
      return;
    }

    try {
      const response = await axios.post(`http://103.253.73.66:5001/api/reset-password/`, { resetToken, password });
      console.log(response.data);
      if (response.data) {
        await Swal.fire('Password reset successfully');
        navigate('/login/sign-in');
      } else {
        const error = await response.json();
        alert(error.message);
        await Swal.fire(error.message);
      }
    } catch (error) {
      console.log(error);
      await Swal.fire('Error resetting password');
    }
  };
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  return (
    <CoverLayout coverHeight="50vh" image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          py={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h3" fontWeight="medium" color="white" mt={1}>
            Reset Password new
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={handleSubmit}>
            {/* <MDBox mb={4}>
              <MDInput
                type="text"
                label="ResetToken"
                value={resetToken}
                onChange={(event) => setResetToken(event.target.value)}
                variant="standard"
                fullWidth
              />
            </MDBox> */}
            <MDBox mb={4}>
              <MDInput
                type={showPassword ? "text" : "password"}
                label="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                variant="standard"
                fullWidth
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={handleShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                }} />
            </MDBox>
            <MDBox mb={4}>
              <MDInput
                type={showPassword ? "text" : "password"}
                label="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                variant="standard"
                fullWidth
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={handleShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                }} />
            </MDBox>
            <MDBox mt={6} mb={1}>
              <MDButton variant="gradient" color="info" type="submit" fullWidth>
                Reset Password
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default ResetPW;
