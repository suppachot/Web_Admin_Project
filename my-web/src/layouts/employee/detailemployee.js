// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AddEmployee from './addemployee';
import { margin } from "@mui/system";
import { padding } from '@mui/system';
import moment from "moment/moment";
import TextField from '@mui/material/TextField';
import { Box } from "@mui/material";


function DetailEmpolyee() {

    const { EmployeeID } = useParams();
    const [employeedata, employeedatachange] = useState(null);

    useEffect(() => {
        fetch("http://103.253.73.66:5001/employee/detail/" + EmployeeID)
            .then(res => res.json())
            .then((resp) => {
                employeedatachange(resp);
            }).catch((err) => {
                console.log(err.message);
            })
    }, [EmployeeID]);
    return (
        <DashboardLayout>
            <DashboardNavbar />

            <div className="container">

                <div className="card row mb-3" style={{ "textAlign": "center" }}>
                    <div className="card-title">
                        <br></br>
                        <h2>Employee Detail</h2>
                    </div>
                    <div className="card-body" ></div>
                    {employeedata && employeedata.map(val => (
                        <div style={{ textAlign: "left", paddingLeft: "80px" }}>
                            <h4>EmployeeID : <b>{val.EmployeeID}</b></h4>
                            <h5 >
                                Name       : {val.TitleName}  {val.FirstName}  {val.LastName} <br></br>

                                Phone      : {val.PhoneNumber} <br></br>
                                Email      : {val.Email}<br></br>
                                Department : {val.DepartmentName}<br></br>
                                Role       : {val.RoleName}<br></br>
                                CreateDate : {moment(val.CreateDate).format('DD-MM-YYYY HH:mm:ss A')} <br></br>
                                CreateBy   : {val.CreateBy}<br></br>
                                UpdateDate : {moment(val.UpdateDate).format('DD-MM-YYYY HH:mm:ss A')}<br></br>
                                UpdateBy   : {val.UpdateBy}<br></br>
                            </h5>
                            <br></br>


                        </div>
                    ))}


                    <Link className="btn btn-danger" to="/employee" >Back to Employee</Link>
                </div>

            </div>

        </DashboardLayout>
    );
}
export default DetailEmpolyee;



