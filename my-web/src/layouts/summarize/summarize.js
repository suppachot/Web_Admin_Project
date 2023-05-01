
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDBadge from "components/MDBadge";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import Axios from "axios";
import axios from "axios";
import { useState, useEffect } from "react";
import DataTable from 'react-data-table-component';
import moment from "moment/moment";
import csvToJson from "csvtojson";
import Papa from 'papaparse';
import { Link, useNavigate } from 'react-router-dom';
import { CSVLink, CSVDownload } from "react-csv";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap/dist/css/bootstrap.css";
import { useMemo } from "react";
import * as React from 'react';
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from '@mui/material/Paper';
import { message } from "antd";
import Swal from "sweetalert2";
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { CSVReader } from 'react-papaparse';
import Icon from "@mui/material/Icon";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


function Summarize() {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const navigate = useNavigate();

    //Fitter Search------------------------------------------------------//
    const [filterMonth, setFilterMonth] = useState("");
    const [filterYears, setFilterYears] = useState("");
    const [filterDepartment, setFilterDepartment] = useState("");
    const [filterRole, setFilterRole] = useState("");
    const filteredData = items.filter((item) => {
        const matchMonth = item.Month.toLowerCase().includes(filterMonth.toLowerCase());
        const matchYear = item.Years.includes(filterYears.toLowerCase());
        const matchDepartment = item.DepartmentName.toLowerCase().includes(filterDepartment.toLowerCase());
        const matchRole = item.RoleName.toLowerCase().includes(filterRole.toLowerCase());
        return matchMonth && matchYear && matchDepartment && matchRole;
    });
    const currentYear = new Date().getFullYear();
    const yearOptions = [];
    for (let i = currentYear; i >= currentYear - 4; i--) {
        yearOptions.push(
            <option key={i} value={i}>
                {i}
            </option>
        );
    }
    const handleFilterMonth = (e) => {
        setFilterMonth(e.target.value);
    };
    const handleFilterYears = (e) => {
        setFilterYears(e.target.value);
    };

    const handleFilterDepartment = (e) => {
        setFilterDepartment(e.target.value);
    };
    const handleFilterRole = (e) => {
        setFilterRole(e.target.value);
    };
    const handleClearFilter = () => {
        setFilterMonth("");
        setFilterYears("");
        setFilterDepartment("");
        setFilterRole("");
    };

    const columns = [
        {
            id: 'employeeid',
            name: 'EmployeeID',
            selector: row => row.EmployeeID,
            sortable: true,
            width: '120px',
            
        },
        {
            id: 'name',
            name: 'Name',
            selector: row => row.Name,
            sortable: true,
            width: '250px'
        },
        {

            id: 'department',
            name: 'Department',
            selector: row => row.DepartmentName,
            sortable: true,
            width: '130px'
        },
        {
            id: 'role',
            name: 'Role',
            width: '150px',
            sortable: true,
            selector: row =>
                <div>
                    <MDBadge badgeContent={row.RoleName} color="success" variant="gradient" size="sm" />
                </div>
        },
        {

            id: 'month',
            name: 'Month',
            selector: row => row.Month,
            sortable: true,
            width: '150px'
        },
        {

            id: 'years',
            name: 'Years',
            selector: row => row.Years,
            sortable: true,
            width: '100px',
        },
        {

            id: 'totalcheckin',
            name: 'Logged',
            cell: row => row.จำนวนการเข้างาน,
            sortable: true,
            width: '150px'
        },
        {

            id: 'latechackin',
            name: 'Late',
            selector: row => row.จำนวนการมาสาย,
            sortable: true,
            width: '150px'
        }
    ];

    useEffect(() => {
        fetch("http://103.253.73.66:5001/summarize/checkin")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                    console.log(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            ).catch((err) => {
                console.log(err.message);
            })

    }, []);
    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {

        return (
            <DashboardLayout>
                <DashboardNavbar />

                <div className="LayoutContainer"  >
                    <div className="card-body">
                        <Box display="flex" alignItems="center" justifyContent="center" >
                            <Box sx={{ flexGrow: 2 }} mr={1}>
                                <div class="input-group ">
                                    <label for="customFile" style={{marginLeft: "30px" }}>เลือกเดือน </label>
                                    <select
                                        className="form-control"
                                        style={{ maxWidth: "200px",marginLeft: "30px", marginRight: "30px" }}
                                        value={filterMonth}
                                        onChange={handleFilterMonth}
                                    >
                                        <option value="">Select month</option>
                                        <option value="January">January</option>
                                        <option value="February">February</option>
                                        <option value="March">March</option>
                                        <option value="April">April</option>
                                        <option value="May">May</option>
                                        <option value="June">June</option>
                                        <option value="July">July</option>
                                        <option value="August">August</option>
                                        <option value="September">September</option>
                                        <option value="October">October</option>
                                        <option value="November">November</option>
                                        <option value="December">December</option>
                                    </select>
                                    <label for="customFile">เลือกปี </label>
                                    <select
                                        style={{ maxWidth: "200px",marginLeft: "20px", marginRight: "30px" }}
                                        value={filterYears}
                                        onChange={handleFilterYears}
                                    >
                                        {yearOptions}
                                    </select>
                                    <label for="customFile">แผนกงาน </label>
                                    <select
                                        className="btn btn-info me-4"
                                        value={filterDepartment}
                                        style={{ marginLeft: "12px" }}
                                        onChange={handleFilterDepartment}
                                    >
                                        <option value="">Department all</option>
                                        <option value="ฝ่ายบุคคล">ฝ่ายบุคคล</option>
                                        <option value="ฝ่ายบัญชี">ฝ่ายบัญชี</option>
                                        <option value="พนักงานทั่วไป">พนักงานทั่วไป</option>
                                    </select>
                                    <label for="customFile">ตำแหน่งงาน </label>
                                    <select
                                        className="btn btn-info me-4"
                                        value={filterRole}
                                        style={{ marginLeft: "12px" }}
                                        onChange={handleFilterRole}
                                    >
                                        <option value="">Role all</option>
                                        <option value="Administrator">Administrator</option>
                                        <option value="Employee">Employee</option>
                                    </select>

                                    <button
                                        className="btn btn-danger"
                                        onClick={handleClearFilter}
                                    >
                                        Clear
                                    </button>
                                </div>
                            </Box>
                        </Box>
                    </div>
                </div>

                <Paper sx={{ p: 1 }} style={{ backgroundColor: '#F2F3F4' }}>
                    <div className="card-body" >
                        < DataTable
                            title="Employee List"
                            columns={columns}
                            data={filteredData}
                            defaultSortField="EmployeeID"
                            noDataMessage="No records found."
                            highlightOnHover
                            pagination
                            paginationPerPage={10}
                            paginationRowsPerPageOptions={[10, 15, 25, 50, 100]}
                            paginationComponentOptions={{
                                rowsPerPageText: 'Records per page:',
                                rangeSeparatorText: 'out of',
                            }}
                             
                        />
                    </div>

                    <CSVLink data={filteredData} filename={"การเข้างาน.csv"} target="_blank" >
                        <button className="btn btn-primary">Export File</button>
                    </CSVLink>

                </Paper>

            </DashboardLayout >

        );
    }
}
export default Summarize;

