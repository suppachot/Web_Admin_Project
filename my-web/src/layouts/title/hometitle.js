
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
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Paper } from "@mui/material";
import moment from "moment/moment";
import Swal from 'sweetalert2'

function HomeTitle() {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    const [titledata, titledatachange] = useState(null);
    const navigate = useNavigate();

    const LoadDetail = (TitleID) => {
        navigate("/title/detail/" + TitleID);
    }
    const LoadEdit = (TitleID) => {
        navigate("/title/edit/" + TitleID);
    }
  
    
    const Removefunction = (TitleID) => {
        Swal.fire({
            title: 'Do you want to remove?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, remove it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Axios.delete(`http://localhost:5000/deletetitle/${TitleID}`)
                    .then(() => {
                        Swal.fire({
                            title: 'Removed successfully!',
                            icon: 'success'
                        })
                        window.location.reload()
                    })
                    .catch((error) => {
                        Swal.fire({
                            title: 'Error!',
                            text: error.message,
                            icon: 'error',
                            confirmButtonText: 'OK'
                        })
                    })
            }
        })
    }

    const columns = [
        {
            id: 'titleID',
            name: 'TitleID',
            selector: row => row.TitleID,
            sortable: true,
            width: '150px'
        },
        {
            id: 'title',
            name: 'Title',
            selector: row => row.TitleName,
            sortable: true,
            width: '150px'
        },
        {
            id: 'createdate',
            name: 'CreateDate',
            selector: row => moment(row.CreateDate).format('DD/MM/YYYY HH:mm:ss A'),
            sortable: true,
            width: '250px'
        },
        {
            id: 'createby',
            name: 'CreateBy',
            selector: row => row.CreateBy,
            sortable: true,
            width: '150px'
        },
        {
            id: 'updatedate',
            name: 'UpdateDate',
            selector: row => moment(row.UpdateDate).format('DD/MM/YYYY HH:mm:ss A'),
            sortable: true,
            width: '250px'
        },
        {
            id: 'updateby',
            name: 'UpdateBy',
            selector: row => row.UpdateBy,
            sortable: true,
            width: '150px'
        },
        {
            name: 'Action',
            selector: row =>

                <div class="btn-group" role="group" aria-label="Basic example">

                    {/* <button className="btn btn-primary" onClick={(clickHandler) => { LoadDetail(row.TitleID) }} >Detail</button> */}
                    <button className="btn btn-warning" onClick={() => { LoadEdit(row.TitleID) }} >Edit</button>
                    <button className="btn btn-danger" onClick={() => { Removefunction(row.TitleID) }} >Delete</button>

                </div>

        }

    ];

    useEffect(() => {
        fetch("http://localhost:5000/title")
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
            // ).then((resp) => {
            //     titledatachange(resp);
            // }
            ).catch((err) => {
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
                            <Link to="/addTitle" className="btn btn-success">Add New</Link>
                        </div>

                        <Paper sx={{ p: 1 }} style={{ backgroundColor: '#F2F3F4' }}>
                            <div className="card-body" >
                                <DataTable
                                    title="Title"
                                    columns={columns}
                                    data={items}
                                    highlightOnHover
                                    pagination
                                    paginationPerPage={5}
                                    paginationRowsPerPageOptions={[5, 15, 25, 50]}
                                    paginationComponentOptions={{
                                        rowsPerPageText: 'Records per page:',
                                        rangeSeparatorText: 'out of',
                                    }}
                                />
                            </div>
                        </Paper>
                    </div>
                </div>
            </DashboardLayout>

        );
    }
}
export default HomeTitle;