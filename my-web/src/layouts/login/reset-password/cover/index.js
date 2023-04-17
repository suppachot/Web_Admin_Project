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
import { Link, useNavigate } from "react-router-dom";
import { Axios } from 'axios';
import { message } from 'antd';
import jwtDecode from "jwt-decode";
import axios from "axios";
import Swal from "sweetalert2";

function Cover() {

  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });
  
      if (response.ok) {
        await Swal.fire('Reset password email sent');
      } else {
        const error = await response.json();
        await Swal.fire('Error', error.message, 'error');
      }
    } catch (error) {
      console.log(error);
      await Swal.fire('Error sending reset password email');
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
            Reset Password
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={handleSubmit}>
            <MDBox mb={4}>
              <MDInput type="email" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} required  variant="standard" fullWidth />
            </MDBox>
            <MDBox mt={6} mb={1}>
              <MDButton variant="gradient" color="info" type="submit" fullWidth>
              Send Reset Password Email
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
