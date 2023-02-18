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


function DetailEmpolyee() {

    const { EmployeeID } = useParams();
    const [employeedata, employeedatachange] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5000/empolyee/detail/" + EmployeeID)
            .then(res => res.json())
            .then((resp) => {
                employeedatachange(resp);
            }).catch((err) => {
                console.log(err.message);
            })
    }, []);


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
                        <div style={{textAlign: "left" , paddingLeft: "80px"}}>
                            <h3>EmployeeID : <b>{val.EmployeeID}</b></h3>
                            <h5 >
                                Name       : {val.TitleName}  {val.FirstName}  {val.LastName} <br></br>
                                PhoneNumber: {val.PhoneNumber} <br></br>
                                Email      : {val.Email}<br></br>
                                Department : {val.DepartmentName}<br></br>
                                Role       : {val.RoleName}<br></br>
                                CreateDate : {val.CreateDate}<br></br>
                                CreateBy   : {val.CreateBy}<br></br>
                                UpdateDate : {val.UpdateDate}<br></br>
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


