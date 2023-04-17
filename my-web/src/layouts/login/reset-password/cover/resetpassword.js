// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// login layout components
import CoverLayout from "layouts/login/components/CoverLayout";

// Images
import bgImage from "assets/images/TKS_lo.jpg";

import { useState } from "react";
// react-router-dom components
import { Link, useNavigate , useParams } from "react-router-dom";
import { Axios } from 'axios';
import { message } from 'antd';
import jwtDecode from "jwt-decode";
import axios from "axios";

function ResetPW() {

  const { resetToken } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      alert('New password and confirm password do not match');
      return;
    }

    try {
      const response = await fetch('/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ resetToken, newPassword })
      });

      if (response.ok) {
        alert('Password reset successfully');
      } else {
        const error = await response.json();
        alert(error.message);
      }
    } catch (error) {
      console.log(error);
      alert('Error resetting password');
    }
  };

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
            <MDBox mb={4}>
              <MDInput type="emahiddenil" label="ResetToken" value={resetToken} o  variant="standard" fullWidth />
            </MDBox>
            <MDBox mb={4}>
              <MDInput type="password" label="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required  variant="standard" fullWidth />
            </MDBox>
            <MDBox mb={4}>
              <MDInput type="password" label="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required  variant="standard" fullWidth />
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
