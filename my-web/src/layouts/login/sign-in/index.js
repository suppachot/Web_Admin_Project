
import { useState } from "react";

// react-router-dom components
import { Link , useNavigate} from "react-router-dom";

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

  const [EmployeeID, setEmployeeID] = useState("");
  const [Pincode, setPincode] = useState("");
  const [Password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const[loginStatus,setLoginStatus]= useState("");
  const navigate = useNavigate();
  
  // const handleLogin = (e) => {
  //    e.preventDefault();
  //   // Axios.post("http://localhost:5000/login",{
  //   //   EmployeeID : EmployeeID,
  //   //   Password : Password,
  //   // }).then((Response)=>{
  //   //   if(Response.data.message){
  //   //     setLoginStatus(Response.data.message);
  //   //   }else{
  //   //     setLoginStatus(Response.data[0].EmployeeID);
  //   //     navigate("/dashboard" );
  //   //   }
  //   // })
    
  //   // perform login validation here
  //   // if successful, redirect to dashboard page
  //    navigate("/dashboard" );
  // };

  // const handleSubmit  = async e =>{
  //   e.preventDefault();
  // }

  const handleSubmit1 = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api1/login', {
        EmployeeID,
        Pincode,
      });
      console.log(response);
      navigate("/dashboard" );
    } catch (error) {
      console.error(error);
      navigate("/dashboard" );
    }
  };

  // const [username, setUsername] = useState('');
  // //const [password, setPassword] = useState('');

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const response = await axios.post('/api/login', {
  //       username,
  //       password,
  //     });
  //     console.log(response.data);
  //     navigate("/dashboard" );
  //   } catch (error) {
  //     console.error(error);
  //     navigate("/dashboard" );
  //   }
  // };
 

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <from onSubmit={handleSubmit1}>
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
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput type="text" label="EmployeeID" value={EmployeeID}  onChange={(event) => setEmployeeID(event.target.value)} fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="Password" label="Password" value={Pincode} onChange={(event) => setPincode(event.target.value)}  fullWidth />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
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
            </MDBox>
            <h1>{loginStatus}</h1>
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
        </from>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
