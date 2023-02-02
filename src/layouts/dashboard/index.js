
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


function Dashboard() {
  const { sales, tasks } = reportsLineChartData;
  
   return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title={ 
                  <>
                   <h1>จำนวนผู้ใช้ระบบ</h1>
                  </>
                }
                count="2"
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title={ 
                  <>
                   <h1>พนักงาน</h1>
                  </>
                }
                count="45"
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title={ 
                  <>
                   <h1>Admin</h1>
                  </>
                }
                count="2"
              />
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
