
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
import { useState, useEffect } from "react";
import DataTable from 'react-data-table-component';
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { CSVLink, CSVDownload } from "react-csv";


function HomeEmployee() {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    const [employeedata, employeedatachange] = useState(null);
    const navigate = useNavigate();

    const LoadDetail = (EmployeeID) => {
        navigate("/employee/detail/" + EmployeeID);
    }
    const LoadEdit = (EmployeeID) => {
        navigate("/employee/edit/" + EmployeeID);
    }
    const Removefunction = (EmployeeID) => {
        if (window.confirm('Do you want to remove?')) {
            Axios.delete("http://localhost:5000/deleteemployee/" + EmployeeID, {
            }).then((res) => {
                alert('Removed successfully.')
                window.location.reload();
            }).catch((err) => {
                console.log(err.message)
            })
        }
    }
    const headers = [
        { label: "EmployeeID", key: "employeeid" },
        { label: "TitleName", key: "titlename" },
        { label: "FirstName", key: "firstName" },
        { label: "LastName", key: "lastName" },
        { label: "PhoneNumber", key: "phonenumber" },
        { label: "Email", key: "email" },
        { label: "DepartmentName", key: "department" },
        { label: "RoleName", key: "role" },
        { label: "CreateDate", key: "createdate" },
        { label: "CreateBy", key: "createby" },
        { label: "UpdateDate", key: "updatedate" },
        { label: "UpdateBy", key: "updateby" }
    ];

    const columns = [
        {
            id: 'employeeid',
            name: 'EmployeeID',
            selector: row => row.EmployeeID,
            width: '100px'
        },
        {
            id: 'title',
            name: 'Title',
            selector: row => row.TitleName,
            width: '100px'
        },
        {
            id: 'firstName',
            name: 'FirstName',
            selector: row => row.FirstName,
            width: '200px'
        },
        {
            id: 'lastName',
            name: 'LastName',
            selector: row => row.LastName,
            width: '200px'
        },
        {
            id: 'phonenumber',
            name: 'PhoneNumber',
            selector: row => row.PhoneNumber,
            width: '150px'
        },
        {
            id: 'email',
            name: 'Email',
            selector: row => row.Email,
            width: '200px'
        },
        {

            id: 'department',
            name: 'Department',
            selector: row => row.DepartmentName,
            width: '150px'
        },
        {
            id: 'role',
            name: 'Role',
            width: '150px',
            selector: row =>
                <div>
                    <MDBadge badgeContent={row.RoleName} color="success" variant="gradient" size="sm" />

                </div>
        },
        // {
        //     id: 'createdate',
        //     name: 'CreateDate',
        //     selector: row => row.CreateDate,
        //     width: '250px'
        // },
        // {
        //     id: 'createby',
        //     name: 'CreateBy',
        //     selector: row => row.CreateBy,
        //     width: '150px'
        // },
        // {
        //     id: 'updatedate',
        //     name: 'UpdateDate',
        //     selector: row => row.UpdateDate,
        //     width: '250px'
        // },
        // {
        //     id: 'updateby',
        //     name: 'UpdateBy',
        //     selector: row => row.UpdateBy,
        //     width: '150px'
        // },
        {
            name: 'Action',
            selector: row =>

                <div class="btn-group" role="group" aria-label="Basic example">

                    <button className="btn btn-primary" onClick={() => { LoadDetail(row.EmployeeID) }} >Detail</button>
                    <button className="btn btn-warning" onClick={() => { LoadEdit(row.EmployeeID) }} >Edit</button>
                    <button className="btn btn-danger" onClick={() => { Removefunction(row.EmployeeID) }} >Delete</button>

                </div>

        }
    ];

    useEffect(() => {
        fetch("http://localhost:5000/employee")
            .then(res => res.json())
            // .then((resJson) => {
            //     const data = JSON.parse(resJson);
            // })
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            ).then((resp) => {
                employeedatachange(resp);
            }).catch((err) => {
                console.log(err.message);
            })
    }, [])


    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {

        return (
            <DashboardLayout>
                <DashboardNavbar />
                <div className="LayoutContainer">
                    <div className="card-body">
                        <div className="btn">
                            <Link to="/addEmpolyee" className="btn btn-success">Add New</Link>
                        </div>
                        <div className="btn">
                            <Link to="/export-Empolyee" className="btn btn-success">Export.CSV</Link>
                        </div>

                        <CSVLink
                            data={items}
                            headers={headers}
                            filename={"Employee_T.K.S.csv"}
                            className="btn btn-primary"
                        >
                            Export .CSV
                        </CSVLink>
                        
                        <DataTable
                            title="Employee List"
                            columns={columns}
                            data={items}

                        />

                    </div>
                </div>
            </DashboardLayout>

        );
    }
}
export default HomeEmployee;