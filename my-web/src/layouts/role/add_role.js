import DataTable from 'react-data-table-component';
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { Box } from '@mui/material';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import jwtDecode from "jwt-decode";

function AddRole() {
    // เก็บบันทึกค่าลง state
   // const [RoleID, setRoleID] = useState("");
    const [RoleName, setRoleName] = useState("");
    const [CreateDate, setCreateDate] = useState("");
    const [CreateBy, setCreateBy] = useState("");
    const [UpdateDate, setUpdateDate] = useState("");
    const [UpdateBy, setUpdateBy] = useState("");
    const [validation, valchange] = useState(false);

    const navigate = useNavigate();
    // อ่านค่าจาก db
    const [RoleList, setRoleList] = useState([]);
    const getRole = () => {
        Axios.get('http://103.253.73.66:5001/role').then((response) => {
            setRoleList(response.data);
        });
    }

    const token = localStorage.getItem("jwt");
    const decodedToken = jwtDecode(token);
    const { emp, firstName, lastName } = decodedToken;

    useEffect(() => {
        const moment = require('moment-timezone');
        const date = new Date();
        const timezone = 'Asia/Bangkok'; // ตามที่ต้องการ
        const formattedDate = moment(date).tz(timezone).format('YYYY-MM-DDTHH:mm:ss');
        const username = emp; // แก้ไขเป็นชื่อผู้ใช้จริงที่ต้องการใช้งาน
        setCreateBy(username);
        setCreateDate(formattedDate);
        setUpdateDate(formattedDate);
        setUpdateBy(username);
    }, []);

    // ส่งข้อมูล 
    const handlesubmit = (e) => {
        e.preventDefault();
        Axios.post('http://103.253.73.66:5001/role/add', {
          //  RoleID: RoleID,
            RoleName: RoleName,
            CreateDate: CreateDate,
            CreateBy: CreateBy,
            UpdateDate: UpdateDate,
            UpdateBy: UpdateBy
        }).then(() => {
            setRoleList([
                ...RoleList,
                {
                   // RoleID: RoleID,
                    RoleName: RoleName,
                    CreateDate: CreateDate,
                    CreateBy: CreateBy,
                    UpdateDate: UpdateDate,
                    UpdateBy: UpdateBy
                }
            ]);
            Swal.fire({
                title: 'Saved successfully.',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                navigate('/role');
            });
        }).catch((err) => {
            console.log(err.message)
        })
    }

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <div className="row">
                <div className="offset-lg-3 col-lg-6">
                    <form className="container" onSubmit={handlesubmit}>
                        <div className="card" style={{ "textAlign": "left" }}>
                            <div className="card-body">
                                <div className="row">

                                    {/* <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>RoleID</label>
                                            <input required value={RoleID}
                                                type="text"
                                                id='RoleID'
                                                onChange={e => setRoleID(e.target.value)}
                                                className="form-control">
                                            </input>
                                        </div>
                                    </div> */}

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>RoleName</label>
                                            <input
                                                id='RoleName'
                                                value={RoleName}
                                                onChange={e => setRoleName(e.target.value)}
                                                className="form-control"
                                            >
                                            </input>
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>CreateDate</label>
                                            <input value={CreateDate} type="datetime-local"
                                                id='CreateDate'
                                                onChange={e => setCreateDate(e.target.value)}
                                                className="form-control">

                                            </input>
                                            {CreateDate.length == 0 && validation && <span className="text-danger">Enter the date</span>}
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>CreateBy</label>
                                            <input value={CreateBy} type="text"
                                                id='CreateBy'
                                                onChange={e => setCreateBy(e.target.value)}
                                                className="form-control"></input>
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>UpdateDate</label>
                                            <input value={UpdateDate} type="datetime-local"
                                                id='UpdateDate'
                                                onChange={e => setUpdateDate(e.target.value)}
                                                className="form-control"></input>
                                            {UpdateDate.length == 0 && validation && <span className="text-danger">Enter the date</span>}
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>UpdateBy</label>
                                            <input value={UpdateBy} type="text"
                                                id='UpdateBy'
                                                onChange={e => setUpdateBy(e.target.value)}
                                                className="form-control">
                                            </input>
                                        </div>
                                    </div>

                                    <Box display="flex">
                                        <Box sx={{ flexGrow: 4 }}>
                                            <div className="card-body col-lg-4" >
                                                <Link to="/role" className="btn btn-danger">Back</Link>
                                            </div>
                                        </Box>
                                        <Box>
                                            <div className="card-body col-lg-4" >
                                                <button className="btn btn-success" type="submit">Save</button>
                                            </div>
                                        </Box>
                                    </Box>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
}
export default AddRole;