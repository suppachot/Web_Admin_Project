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


function DetailEmpolyee() {

    const {EmployeeID} = useParams();
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
                        <h2>Employee Detail</h2>
                    </div>
                    <div className="card-body"></div>
                   { employeedata&& employeedata.map(val => (
                        <div>
                            <h2>EmployeeID : <b>{val.EmployeeID}</b></h2>
                            <h4>Detail list</h4>
                            <h6>Name : {val.TitleName}  {val.FirstName}  {val.LastName}</h6>
                            <h6>PhoneNumber: {val.PhoneNumber}</h6>
                            <h6>Email : {val.Email}</h6>
                            <h6>Department : {val.DepartmentName}</h6>
                            <h6>Role : {val.RoleName}</h6>
                            <h6>CreateDate : {val.CreateDate}</h6>
                            <h6>CreateBy : {val.CreateBy}</h6>
                            <h6>UpdateDate : {val.UpdateDate}</h6>
                            <h6>UpdateBy : {val.UpdateBy}</h6>
                            <br></br>
                            <Link className="btn btn-danger" to="/employee" >Back to Listing</Link>

                        </div>
                    ))}
                </div>
            </div>

        </DashboardLayout>
    );
}
export default DetailEmpolyee;

