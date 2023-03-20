
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
import moment from "moment/moment";
import csvToJson from "csvtojson";
import Papa from 'papaparse';
import { Modal } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom';
import { CSVLink, CSVDownload } from "react-csv";
import FilterComponent from "./FilterComponent";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap/dist/css/bootstrap.css";
import { useMemo } from "react";
import { AddEmployee } from 'layouts/employee/addemployee';
import styled from 'styled-components';

import * as React from 'react';
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from '@mui/material/Paper';
import { message } from "antd";

function parseCsv(file) {
    return new Promise((resolve, reject) => {
        Papa.parse(file, {
            header: true,
            complete: (results) => {
                resolve(results.data);
            },
            error: (error) => {
                reject(error);
            },
        });
    });
}

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
        console.log(columns);
        // let {employeeID,TitleName,FirstName,LastName,PhoneNumber, Emaill,DepartmentName,RoleName,CreateDate,CreateBy, UpdateDate, UpdateBy} = EmployeeID;
        // localStorage.setItem('ID', employeeID);
        // localStorage.setItem('First Name', TitleName);
        // localStorage.setItem('Last Name', FirstName);
        // localStorage.setItem('ID', LastName);
        // localStorage.setItem('First Name', PhoneNumber);
        // localStorage.setItem('Last Name', Emaill);
        // localStorage.setItem('ID', DepartmentName);
        // localStorage.setItem('First Name', RoleName);
        // localStorage.setItem('Last Name', CreateDate);
        // localStorage.setItem('ID', CreateBy);
        // localStorage.setItem('First Name', UpdateDate);
        // localStorage.setItem('Last Name', CreateDaUpdateByte);

    }
    const Removefunction = (EmployeeID) => {
        if (window.confirm('Do you want to remove?')) {
            Axios.delete("http://localhost:5000/deleteemployee/" + EmployeeID, {
            }).then((res) => {
                alert('Removed successfully.')
                window.location.reload();
            }).then((response) => {
                console.log(response);
            }).catch((err) => {
                console.log(err.message)
            })
        }
    }
    //Import file------------------------------------------//


    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        const parsedData = await parseCsv(file);
        setItems(parsedData);
    };






    //-----------------------------------------------------//
    //Export file-----------------------------------------//
    function convertArrayOfObjectsToCSV(array) {
        let result;

        const columnDelimiter = ',';
        const lineDelimiter = '\n';
        const keys = Object.keys(items[0]);

        result = '';
        result += keys.join(columnDelimiter);
        result += lineDelimiter;

        array.forEach(item => {
            let ctr = 0;
            keys.forEach(key => {
                if (ctr > 0) result += columnDelimiter;

                result += item[key];

                ctr++;
            });
            result += lineDelimiter;
        });

        return result;
    }

    function downloadCSV(array) {
        const link = document.createElement('a');
        let csv = convertArrayOfObjectsToCSV(array);
        if (csv == null) return;

        const filename = 'Employee_T.K.S.csv';

        if (!csv.match(/^data:text\/csv/i)) {
            csv = `data:text/csv;charset=UTF-8,${csv}}`;
        }

        link.setAttribute('href', encodeURI(csv));
        link.setAttribute('download', filename);
        link.click();
    }

    const Export = ({ onExport }) => <button className="btn btn-primary" onClick={e => onExport(e.target.value)}>Export File</button>;
    //----------------------------------------------------------------------//

    //Fitter Search-1------------------------------------------------------//

    // const [filteredData, setFilteredData] = useState(items);
    // const handleFilter = (searchTerm) => {
    //     const filteredResults = items.filter((item) => {
    //         return item.FirstName.toLowerCase().includes(searchTerm.toLowerCase());
    //     });
    //     setFilteredData(filteredResults);
    // };

    //v.2------------------------------------------------//
    const [filterText, setFilterText] = useState('');
    const filteredData = items.filter((item) =>
        item.EmployeeID.toLowerCase().includes(filterText.toLowerCase()) ||
        item.FirstName.toLowerCase().includes(filterText.toLowerCase()) ||
        item.LastName.toLowerCase().includes(filterText.toLowerCase()) ||
        item.DepartmentName.toLowerCase().includes(filterText.toLowerCase())
    );

    const handleFilter = (e) => {
        setFilterText(e.target.value);
    };

    const handleClearFilter = () => {
        setFilterText('');
    };
    //v3------------------------------------------------**//
    // const [EmployeeID, setEmployeeID] = useState("");
    // const [FirstName, setFirstName] = useState("");
    // const [LastName, setLastName] = useState("");
    // const [DepartmentName, setDepartmentName] = useState("");


    // const filterData = () => {
    //     let filteredData = items.filter((item) => {
    //         return (
    //             item.EmployeeID.toLowerCase().includes(EmployeeID.toLowerCase()) &&
    //             item.FirstName.toLowerCase().includes(FirstName.toLowerCase())
    //         );
    //     });
    //     setItems(filteredData);
    // };

    // const clearFilter = () => {
    //     setEmployeeID("");
    //     setFirstName("");
    //     setLastName("");
    //     setDepartmentName("");
    //     setItems(items);
    // };
    //--------------------------------------------------------------------//

    const columns = [
        {
            id: 'employeeid',
            name: 'EmployeeID',
            selector: row => row.EmployeeID,
            sortable: true,
            width: '120px'
        },
        {
            id: 'title',
            name: 'Title',
            selector: row => row.TitleName,
            sortable: true,
            width: '100px'
        },
        {
            id: 'firstName',
            name: 'FirstName',
            selector: row => row.FirstName,
            sortable: true,
            width: '150px'
        },
        {
            id: 'lastName',
            name: 'LastName',
            selector: row => row.LastName,
            sortable: true,
            width: '150px'
        },
        {
            id: 'phonenumber',
            name: 'PhoneNumber',
            selector: row => row.PhoneNumber,
            sortable: true,
            width: '150px'
        },
        {
            id: 'email',
            name: 'Email',
            selector: row => row.Email,
            sortable: true,
            width: '200px'
        },
        {

            id: 'department',
            name: 'Department',
            selector: row => row.DepartmentName,
            sortable: true,
            width: '150px'
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
            width: '250px',
            selector: row =>
                <div class="btn-group" role="group" aria-label="Basic example">

                    <button className="btn btn-primary" onClick={() => { LoadDetail(row.EmployeeID) }}>Detail</button>
                    <button className="btn btn-warning" onClick={() => { LoadEdit(row.EmployeeID) }} >Edit</button>
                    <button className="btn btn-danger" onClick={() => { Removefunction(row.EmployeeID) }} >Delete</button>

                </div>


        }
        // , {
        //     name: '',
        //     selector: (row) => (
        //         <div className="App">
        //             <div class="openbtn text-center">
        //                 <button
        //                     type="button"
        //                     class="btn btn-primary"
        //                     data-bs-toggle="modal"
        //                     data-bs-target="#myModal"
        //                 >
        //                     Open
        //                 </button>
        //                 <div class="modal" tabindex="-1" id="myModal">
        //                     <div class="modal-dialog">
        //                         <div class="modal-content">
        //                             <div class="modal-header">
        //                                 <h5 class="modal-title">Modal title</h5>
        //                                 <button
        //                                     type="button"
        //                                     aria-label="Close"
        //                                     class="btn-close"
        //                                     data-bs-dismiss="modal"
        //                                 ></button>
        //                             </div>
        //                             <div class="modal-body">
        //                                 <h3>EmployeeID : <b>{row.EmployeeID}</b></h3>
        //                                 <h5 >
        //                                     Name       : {row.TitleName}  {row.FirstName}  {row.LastName} <br></br>
        //                                     PhoneNumber: {row.PhoneNumber} <br></br>
        //                                     Email      : {row.Email}<br></br>
        //                                     Department : {row.DepartmentName}<br></br>
        //                                     Role       : {row.RoleName}<br></br>
        //                                     CreateDate : {row.CreateDate}<br></br>
        //                                     CreateBy   : {row.CreateBy}<br></br>
        //                                     UpdateDate : {row.UpdateDate}<br></br>
        //                                     UpdateBy   : {row.UpdateBy}<br></br>
        //                                 </h5>

        //                             </div>
        //                             <div class="modal-footer">
        //                                 <button
        //                                     type="button"
        //                                     class="btn btn-secondary"
        //                                     data-bs-dismiss="modal"
        //                                 >
        //                                     Close
        //                                 </button>
        //                                 {/* <button type="button" class="btn btn-primary">
        //                                     Save changes
        //                                 </button> */}
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     )
        // }

    ];



    useEffect(() => {
        fetch("http://localhost:5000/employee")
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

    }, [])


    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {

        return (
            <DashboardLayout>
                <DashboardNavbar />


                <Paper sx={{ p: 2 }}>
                    <Box display="flex">
                        <Box sx={{ flexGrow: 1 }}>
                            {/* <Typography variant="h6" gutterBottom component="div" >
                                    Emplotees list
                                </Typography> */}
                        </Box>
                        <Box>
                            {/* <Button variant="contained">Create</Button> */}
                            <Link to="/addEmpolyee" className="btn btn-success">Add New</Link>
                        </Box>
                    </Box>
                    {/* </Paper> */}

                    <div className="LayoutContainer">

                        <div className="card-body" >
                            <div className="card-body" >
                                <div className="btn" >
                                    <Link to="/addEmpolyee" className="btn btn-success">Add New</Link>
                                </div>
                                <div className="btn">
                                    <Link to="/export-Empolyee" className="btn btn-success">Import.CSV</Link>
                                </div>
                                <div className="btn">
                                    <input type="file" onChange={handleFileUpload} />
                                </div>
                            </div>

                            <Box display="flex">
                                <Box sx={{ flexGrow: 2 }}>
                                    
                                        <div className="card-body col-lg-3" >
                                            <input type="text"
                                                className="form-control"
                                                placeholder="Employee ID"
                                                value={filterText}
                                            onChange={handleFilter}
                                            >
                                            </input>
                                        </div>
                                   
                                </Box>
                                {/* <Box sx={{ flexGrow: 1 }}>
                                <div className="card-body col-lg-5" >
                                    <input type="text"
                                        className="form-control"
                                        placeholder="Employee Name"
                                        value={filterText}
                                        onChange={handleFilter}
                                    >
                                    </input>
                                </div>
                            </Box> */}
                                <Box>
                                    <button
                                        className="btn btn-danger"
                                        onClick={handleClearFilter}
                                    >
                                        Clear Filter
                                    </button>
                                </Box>
                            </Box>

                            {/* 
                            <Box display="flex">
                                <Box sx={{ flexGrow: 2 }}>
                                    <div className="card-body col-lg-3" >
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={EmployeeID}
                                            onChange={(e) => setEmployeeID(e.target.value)}
                                            placeholder="Employee ID"
                                        />
                                    </div>
                                </Box>
                                <Box sx={{ flexGrow: 1 }}>
                                    <div className="card-body col-lg-3" >
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={FirstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            placeholder="Employee Name"
                                        />
                                    </div>
                                </Box>
                                <Box sx={{ flexGrow: 2 }}>
                                    <div className="card-body col-lg-3" >
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={LastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            placeholder="Employee Lastname"
                                        />
                                    </div>
                                </Box>
                                <Box sx={{ flexGrow: 1 }}>
                                    <div className="card-body col-lg-3" >
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={DepartmentName}
                                            onChange={(e) => setDepartmentName(e.target.value)}
                                            placeholder="Department"
                                        />
                                    </div>
                                </Box>
                                <Box>
                                    <button
                                        className="btn btn-danger"
                                        onClick={clearFilter}
                                    >
                                        Clear 
                                    </button>
                                </Box>
                            </Box> */}



                            {/* 
                        //---------------ธรรมดา-------------//
                        <div className="card-body col-lg-2" >
                            <input type="text"
                                className="form-control"
                                placeholder="Employee ID"
                                value={filterText}
                                onChange={handleFilter}
                            >
                            </input>
                            <button
                                className="btn btn-danger"
                                onClick={handleClearFilter}
                            >
                                Clear Filter
                            </button>

                        </div>
                        //------------------------------------// 
                        */}


                            <DataTable
                                title="Employee List"
                                columns={columns}
                                //data={items}
                                data={filteredData}
                                defaultSortField="EmployeeID"
                                noDataMessage="No records found."
                                highlightOnHover
                                pagination
                                paginationPerPage={5}
                                paginationRowsPerPageOptions={[10, 15, 25, 50, 100]}
                                paginationComponentOptions={{
                                    rowsPerPageText: 'Records per page:',
                                    rangeSeparatorText: 'out of',
                                }}
                                
                            />

                        </div>



                        <Export onExport={() => downloadCSV(items)} />
                    </div>

                </Paper>

            </DashboardLayout >

        );
    }
}
export default HomeEmployee;