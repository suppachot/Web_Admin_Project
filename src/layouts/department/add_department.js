import DataTable from 'react-data-table-component';
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AddDepartment() {
    // เก็บบันทึกค่าลง state
    const [DepartmentID, setDepartmentID] = useState("");
    const [DepartmentName, setDepartmentName] = useState("");
    const [CreateDate, setCreateDate] = useState("");
    const [CreateBy, setCreateBy] = useState("");
    const [UpdateDate, setUpdateDate] = useState("");
    const [UpdateBy, setUpdateBy] = useState("");
    const [validation, valchange] = useState(false);

    const navigate = useNavigate();
    // อ่านค่าจาก db
    const [departmentList, setdepartmentList] = useState([]);
    const getDepartment = () => {
        Axios.get('http://localhost:5000/deartment').then((response) => {
            setdepartmentList(response.data);
        });
    }

    // ส่งข้อมูล 
    const handlesubmit = (e) => {
        e.preventDefault();
        Axios.post('http://localhost:5000/department/add', {
            DepartmentID: DepartmentID,
            DepartmentName: DepartmentName,
            CreateDate: CreateDate,
            CreateBy: CreateBy,
            UpdateDate: UpdateDate,
            UpdateBy: UpdateBy
        }).then(() => {
            setdepartmentList([
                ...departmentList,
                {
                    DepartmentID: DepartmentID,
                    DepartmentName: DepartmentName,
                    CreateDate: CreateDate,
                    CreateBy: CreateBy,
                    UpdateDate: UpdateDate,
                    UpdateBy: UpdateBy
                }
            ])
        }).then((res) => {
            alert('Saved successfully.')
            navigate('/department');
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

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>DepartmentID</label>
                                            <input required value={DepartmentID}
                                                type="text"
                                                id='DepartmentID'
                                                onChange={e => setDepartmentID(e.target.value)}
                                                className="form-control">
                                            </input>
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>DepartmentName</label>
                                            <input required value={DepartmentName}
                                                type="text"
                                                id='DepartmentName'
                                                onChange={e => setDepartmentName(e.target.value)}
                                                className="form-control">
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

                                    <div className="col-lg-12">
                                        <div className="form-group ">
                                            <br></br>
                                            <Link to="/department" className="btn btn-danger">Back</Link>
                                            <button className="btn btn-success" type="submit">Save</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
}
export default AddDepartment;