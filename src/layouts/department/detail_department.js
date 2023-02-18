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


function DetailDepartment() {

    const { DepartmentID } = useParams();
    const [departmentdata, departmentdatachange] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5000/department/detail/" + DepartmentID)
            .then(res => res.json())
            .then((resp) => {
                departmentdatachange(resp);
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
                        <h2>Department Detail</h2>
                    </div>
                    <div className="card-body"></div>
                    {departmentdata && departmentdata.map(val => (
                        <div style={{textAlign: "left" , paddingLeft: "80px"}}>
                            <h2>DepartmentID : <b>{val.DepartmentID}</b></h2>
                            <h4>Detail list</h4>
                            <h6>DepartmentName : {val.DepartmentName}</h6>
                            <h6>CreateDate : {val.CreateDate}</h6>
                            <h6>CreateBy : {val.CreateBy}</h6>
                            <h6>UpdateDate : {val.UpdateDate}</h6>
                            <h6>UpdateBy : {val.UpdateBy}</h6>
                            <br></br>
                            <Link className="btn btn-danger" to="/department" >Back to Title</Link>

                        </div>
                    ))}

                </div>
            </div>

        </DashboardLayout>
    );
}

export default DetailDepartment;