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
import moment from "moment/moment";

function DetailRole() {

    const { RoleID } = useParams();
    const [roledata, roledatachange] = useState(null);

    useEffect(() => {
        fetch("http://103.253.73.66:5001/role/detail/" + RoleID)
            .then(res => res.json())
            .then((resp) => {
                roledatachange(resp);
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
                        <h2>Role Detail</h2>
                    </div>
                    <div className="card-body"></div>
                    {roledata && roledata.map(val => (
                        <div style={{ textAlign: "left", paddingLeft: "80px" }}>
                            <h2>RoleID : <b>{val.RoleID}</b></h2>
                            <h6>RoleName : {val.RoleName}</h6>
                            <h6>CreateDate : {moment(val.CreateDate).format('DD-MM-YYYY HH:mm:ss A')}</h6>
                            <h6>CreateBy : {val.CreateBy}</h6>
                            <h6>UpdateDate : {moment(val.UpdateDate).format('DD-MM-YYYY HH:mm:ss A')}</h6>
                            <h6>UpdateBy : {val.UpdateBy}</h6>
                            <br></br>


                        </div>
                    ))}
                    <Link className="btn btn-danger" to="/department" >Back to Title</Link>
                </div>
            </div>

        </DashboardLayout>
    );
}

export default DetailRole;