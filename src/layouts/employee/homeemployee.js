
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
import { Button, Modal } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { CSVLink, CSVDownload } from "react-csv";
import FilterComponent from "./FilterComponent";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap/dist/css/bootstrap.css";
import { useMemo } from "react";
import { AddEmployee } from 'layouts/employee/addemployee';



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
            csv = `data:text/csv;charset=UTF-8,${csv}`;
        }

        link.setAttribute('href', encodeURI(csv));
        link.setAttribute('download', filename);
        link.click();
    }

    const Export = ({ onExport }) => <button className="btn btn-primary" onClick={e => onExport(e.target.value)}>Export File</button>;
    //----------------------------------------------------------------------//
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
            width: '250px',
            selector: row =>
                <div class="btn-group" role="group" aria-label="Basic example">

                    <button className="btn btn-primary" onClick={() => { LoadDetail(row.EmployeeID) }}>Detail</button>
                    <button className="btn btn-warning" onClick={() => { LoadEdit(row.EmployeeID) }} >Edit</button>
                    <button className="btn btn-danger" onClick={() => { Removefunction(row.EmployeeID) }} >Delete</button>


                </div>


        }
        , {
            name: '',
            cell: (val) => (
                <div className="App">
                    <div class="openbtn text-center">
                        <button
                            type="button"
                            class="btn btn-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#myModal"
                        >
                            Open
                        </button>
                        <div class="modal" tabindex="-1" id="myModal">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title">Modal title</h5>
                                        <button
                                            type="button"
                                            aria-label="Close"
                                            class="btn-close"
                                            data-bs-dismiss="modal"

                                        ></button>
                                    </div>
                                    <div class="modal-body">
                                        <h3>EmployeeID : <b>{val.EmployeeID}</b></h3>
                                        <h5 >
                                            Name       : {val.TitleName}  {val.FirstName}  {val.LastName} <br></br>
                                            PhoneNumber: {val.PhoneNumber} <br></br>
                                            Email      : {val.Email}<br></br>
                                            Department : {val.DepartmentName}<br></br>
                                            Role       : {val.RoleName}<br></br>
                                            CreateDate : {val.CreateDate}<br></br>
                                            CreateBy   : {val.CreateBy}<br></br>
                                            UpdateDate : {val.UpdateDate}<br></br>
                                            UpdateBy   : {val.UpdateBy}<br></br>
                                        </h5>

                                    </div>
                                    <div class="modal-footer">
                                        <button
                                            type="button"
                                            class="btn btn-secondary"
                                            data-bs-dismiss="modal"
                                        >
                                            Close
                                        </button>
                                        <button type="button" class="btn btn-primary">
                                            Save changes
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
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
                employeedatachange(resp.data);
                // }).then((res) => {
                //     employeedatachange(res.data);
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

                    <div className="card-body" >
                        <div className="card-body" >
                            <div className="btn" >
                                <Link to="/addEmpolyee" className="btn btn-success">Add New</Link>
                            </div>
                            <div className="btn">
                                <Link to="/export-Empolyee" className="btn btn-success">Import.CSV</Link>
                            </div>
                        </div>

                        {/* <div className="card-body col-lg-2" >
                            <input type="text"
                                className="form-control"
                                placeholder="Employee ID"
                            >
                            </input>
                        </div> */}


                        <DataTable
                            title="Employee List"
                            columns={columns}
                            data={items}
                            defaultSortField="EmployeeID"
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

                    {/* export file headers
                    <CSVLink
                        data={items}
                        headers={headers}
                        filename={"Employee_T.K.S.csv"}
                        className="btn btn-primary"
                    >
                        Export .CSV
                    </CSVLink> */}

                    <Export onExport={() => downloadCSV(items)} />
                </div>

            </DashboardLayout>

        );
    }
}
export default HomeEmployee;