
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
import { useState, useEffect } from "react";
import DataTable from 'react-data-table-component';
import AddEmployee from "./addemployee";
import { Button } from '@mui/material';
import { Link, Route, Routes } from 'react-router-dom';



function HomeEmployee() {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    const columns = [
        {
            name: 'EmployeeID',
            selector: row => row.EmployeeID,
            width: '100px'
        },
        {
            name: 'Title',
            selector: row => row.TitleName,
            width: '100px'
        },
        {
            name: 'FirstName',
            selector: row => row.FirstName,
            width: '200px'
        },
        {
            name: 'LastName',
            selector: row => row.LastName,
            width: '200px'
        },
        {
            name: 'PhoneNumber',
            selector: row => row.PhoneNumber,
            width: '150px'
        },
        {
            name: 'Email',
            selector: row => row.Email,
            width: '200px'
        },
        {
            name: 'Department',
            selector: row => row.DepartmentName,
            width: '150px'
        },
        {
            name: 'Role',
            selector: row => row.RoleName,
            width: '150px'
        },
        {
            name: 'CreateDate',
            selector: row => row.CreateDate,
            width: '250px'
        },
        {
            name: 'CreateBy',
            selector: row => row.CreateBy,
            width: '150px'
        },
        {
            name: 'UpdateDate',
            selector: row => row.UpdateDate,
            width: '250px'
        },
        {
            name: 'UpdateBy',
            selector: row => row.UpdateBy,
            width: '150px'
        },
        {
            name: 'Action',
            selector: row =>
                <div className="employee" >
                    <br></br>
                    <button class="btn btn-danger" >Delete</button>
                    <Link to='/editsnews' class="btn btn-warning" >Edit</Link>

                    <br></br>
                </div>









        }
    ];

    useEffect(() => {
        fetch("http://localhost:5000/employee")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])


    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <DashboardLayout>
                <DashboardNavbar />
                <DataTable
                    columns={columns}
                    data={items}
                    
                />
                <br></br>
                <br></br>
            </DashboardLayout>

        );
    }
}
export default HomeEmployee;