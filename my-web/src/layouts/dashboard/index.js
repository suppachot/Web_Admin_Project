
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
import { PieChart, Pie, Cell, LabelList, Legend, ResponsiveContainer, Label } from 'recharts';

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";
import React, { Component } from 'react';
import { style } from "@mui/system/Stack/createStack";
import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Axios } from "axios";
import axios from "axios";
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { Button } from "@mui/material";
import link from './../../assets/theme/components/link';

// rechart v.1 figData
const dataFin = [
  { name: 'Group A', value: 10 },
  { name: 'Group B', value: 90 }

];
const dataFout = [
  { name: 'Group A', value: 0 },
  { name: 'Group B', value: 100 }

];

const COLORS = ["#00C49F", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

//api v.1
// const renderCustomizedLabel1 = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
//   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//   const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
//   const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

//   return (
//     <text x={x} y={y} fill="#fff" textAnchor="middle" dominantBaseline="central">
//       {`${data1[index].label} (${(percent * 100).toFixed(0)}%)`}
//     </text>
//   );
// };





function Dashboard() {
  const { sales, tasks } = reportsLineChartData;
  const [count_admindata, count_adminchange] = useState(null);
  const [count_employeedata, count_employeechange] = useState(null);
  const [acountdata, acountdatachange] = useState(null);
  const [data2, setData1] = useState([]);
  //------------Count---------------------------------------//
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
  //-----------------------------------------------------------------------//
  //-----------Dachboard--------------------------------------------------//
  // useEffect(() => {
  //   fetch("http://localhost:5000/dashboard/check-in").then((res) => {
  //     return res.json();
  //   }).then((resp) => {
  //     setData1(resp);
  //   }).catch((err) => {
  //     console.log(err.message);
  //   })
  // }, [])

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://localhost:5000/dashboard/check-in');
      setData(result.data);
    };
    fetchData();
  }, []);
  //----------------------------------------------------------------------//
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
                  icon="recent_actors"
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
                  icon="supervisor_account"
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
                  icon="manage_accounts"
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
                {/* <ReportsBarChart
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
                /> */}
                <Paper>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart width={1000} height={1000}>
                      <Pie
                        data={dataFin}
                        cx={350}
                        cy={170}
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {dataFin.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <Typography variant="h3" align="center">เข้างาน</Typography>
                  <div align={"center"}>
                    <Button href="/checkin" color="secondary" size="medium" align='center' ><h5>ดูรายละเอียด</h5></Button>
                  </div>
                </Paper>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={8} lg={6}>
              <MDBox mb={5}>
                {/* <ReportsLineChart
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
                /> */}
                {/* <Paper sx={{ p: 25 }}> */}
                <Paper >

                  <ResponsiveContainer width="100%" height={300} >
                    <PieChart width={400} height={400}>
                      <Pie
                        data={dataFout}
                        cx={350}
                        cy={170}
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"


                      >
                        {dataFout.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>

                  <Typography variant="h3" align="center">ออกงาน</Typography>
                  <div align={"center"}>
                    <Button href="/checkout" color="secondary" size="medium" align='center' ><h5>ดูรายละเอียด</h5></Button>
                  </div>

                  {/* <Link to="/checkout" className="btn btn-success">ดูรายละเอียด</Link> */}
                </Paper>


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

const styles = theme => ({
  title: {
    flexGrow: 1,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing.unit * 2,
  },
});