
// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";
import { style } from "@mui/system/Stack/createStack";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Axios } from "axios";


function Dashboard() {
  const { sales, tasks } = reportsLineChartData;
  const [count_admindata, count_adminchange] = useState(null);
  const [count_employeedata, count_employeechange] = useState(null);
  const [acountdata, acountdatachange] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/account/user_app").then((res) => {
      return res.json();
    }).then((resp) => {
      acountdatachange(resp);
    }).catch((err) => {
      console.log(err.message);
    })
  }, [])
  useEffect(() => {
    fetch("http://localhost:5000/employee/emp_count").then((res) => {
      return res.json();
    }).then((resp) => {
      count_employeechange(resp);
    }).catch((err) => {
      console.log(err.message);
    })
  }, [])
  useEffect(() => {
    fetch("http://localhost:5000/employee/admin_count").then((res) => {
      return res.json();
    }).then((resp) => {
      count_adminchange(resp);
    }).catch((err) => {
      console.log(err.message);
    })
  }, [])

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              {acountdata && acountdata.map(val => (
                <ComplexStatisticsCard
                  color="success"
                  icon="weekend"
                  title={
                    <>
                      <h1>จำนวนผู้ใช้ระบบ</h1>
                    </>
                  }
                  count={
                    <h1>{val.Use_App}</h1>
                  }
                />
              ))}
            </MDBox>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              {count_employeedata && count_employeedata.map(val => (
                <ComplexStatisticsCard
                  icon="leaderboard"
                  title={
                    <>
                      <h1>Employee</h1>
                    </>
                  }
                  count={
                    <h1>{val.Employee}</h1>
                  }
                />
              ))}
            </MDBox>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              {count_admindata && count_admindata.map(val => (
                <ComplexStatisticsCard
                  color="primary"
                  icon="person_add"
                  title={
                    <>
                      <h1>Admin</h1>
                    </>
                  }
                  count={
                    <h1>{val.Admin}</h1>
                  }
                />
              ))}
            </MDBox>
          </Grid>



        </Grid>

        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={6}>
              <MDBox mb={5}>
                <ReportsBarChart
                  chart={reportsBarChartData}
                  color="info"
                  title={
                    <>
                      <h1><center>เข้างาน</center></h1>
                    </>
                  }
                  description={
                    <>
                      <center>ดูรายละเอียด</center>
                    </>
                  }
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={8} lg={6}>
              <MDBox mb={5}>
                <ReportsLineChart
                  chart={sales}
                  color="success"
                  title={
                    <>
                      <h1><center>ออกงาน</center></h1>
                    </>
                  }
                  description={
                    <>
                      <center>ดูรายละเอียด</center>
                    </>
                  }
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default Dashboard;
