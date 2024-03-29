
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
import Swal from "sweetalert2";
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { CSVReader } from 'react-papaparse';
import Icon from "@mui/material/Icon";

//(1)
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

// ประกาศตัวแปรสำหรับสไตล์ Modal
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    //width: 600,
    width: '90%',
    maxWidth: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '20px',
};

const DetailModal = ({ open, handleClose, booking }) => {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <MDBox sx={style}>
                <IconButton
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: '5px',
                        top: '5px',
                        color: 'grey.500',
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <MDTypography
                    variant="h6"
                    component="h2"
                    sx={{ marginBottom: '15px' }}
                >
                    Employee Detail
                </MDTypography>

                <Grid container spacing={6}>
                    <Grid item xs={6}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                            Employee ID :
                        </Typography>
                        <Typography variant="body1">{booking.EmployeeID}</Typography>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                            Phonenumber :
                        </Typography>
                        <Typography variant="body1">{booking.PhoneNumber}</Typography>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                            Department :
                        </Typography>
                        <Typography variant="body1">{booking.DepartmentName}</Typography>
                        <MDTypography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                            CreateDate :
                        </MDTypography>
                        <MDTypography variant="body1">
                            {moment(booking.CreateDate).format('DD/MM/YYYY HH:mm:ss A')}
                        </MDTypography>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                            UpdateDate :
                        </Typography>
                        <Typography variant="body1">
                            {moment(booking.UpdateDate).format('DD/MM/YYYY HH:mm:ss A')}
                        </Typography>

                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                            Name :
                        </Typography>
                        <Typography variant="body1" sx={{ flex: 1 }}>
                            {booking.TitleName} {booking.FirstName} {booking.LastName}
                        </Typography>

                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                            Email :
                        </Typography>
                        <Typography variant="body1">{booking.Email}</Typography>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                            Role :
                        </Typography>
                        <Typography variant="body1">{booking.RoleName}</Typography>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                            CreateBy :
                        </Typography>
                        <Typography variant="body1">{booking.CreateBy}</Typography>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                            UpdateBy :
                        </Typography>
                        <Typography variant="body1">{booking.UpdateBy}</Typography>
                    </Grid>
                </Grid>

                <div class="modal-footer">
                    <button
                        type="button"
                        class="btn btn-danger"
                        onClick={handleClose}
                        data-dismiss="modal"
                        sx={{
                            marginTop: '15px',
                            marginLeft: 'auto',
                            display: 'block',
                        }}
                    >
                        Close
                    </button>
                </div>
            </MDBox>
        </Modal>
    );
};
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
    }
    const Removefunction = (EmployeeID) => {
        Swal.fire({
            title: 'Do you want to remove?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, remove it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Axios.delete(`http://103.253.73.66:5001/deleteemployee/${EmployeeID}`)
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

    //Import file------------------------------------------//
    // แค่ดึงไฟล์มาอ่านในรูป Datatable ไม่ได้ลง db (1)****/

    // const handleFileUpload = async (event) => {
    //     const file = event.target.files[0];
    //     const parsedData = await parseCsv(file);
    //     setItems(parsedData);
    // };
    //********************************** */
    // import file
    const [csvError, setCsvError] = useState(null);
    const [fileData, setFileData] = useState(null);

    const handleFileChangeFile = (e) => {
        const file = e.target.files[0];
        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (result) => {
                setFileData(result.data);
            },
            error: (err) => {
                console.log(err);
            }
        });
    };

    const handleUploadFile = () => {
        if (fileData) {
            axios.post('http://103.253.73.66:5001/import/employee', fileData)
                .then(res => {
                    console.log(res.data);
                    setCsvError(null);
                    Swal.fire({
                        icon: 'success',
                        title: 'Data imported successfully',
                        showConfirmButton: false,
                        timer: 1500
                    }).then(() => window.location.reload());
                })
                .catch(err => {
                    console.log(err);
                    setCsvError("Error uploading CSV file.");
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                        footer: 'Please try again later'
                    });
                });
        } else {
            console.log("No file selected!");
        }
    };

    //Fitter Search------------------------------------------------------//
    const [filterText, setFilterText] = useState("");
    const [filterDepartment, setFilterDepartment] = useState("");
    const [filterRole, setFilterRole] = useState("");
    const filteredData = items.filter((item) => {
        const macthTtext = (item.EmployeeID.toLowerCase().includes(filterText.toLowerCase()) ||
            item.FirstName.toLowerCase().includes(filterText.toLowerCase()) ||
            item.LastName.toLowerCase().includes(filterText.toLowerCase()));
        const matchDepartment = item.DepartmentName.toLowerCase().includes(filterDepartment.toLowerCase());
        const matchRole = item.RoleName.toLowerCase().includes(filterRole.toLowerCase());
        return macthTtext && matchDepartment && matchRole;
    });

    const handleFilter = (e) => {
        setFilterText(e.target.value);
    };
    const handleFilterDepartment = (e) => {
        setFilterDepartment(e.target.value);
    };
    const handleFilterRole = (e) => {
        setFilterRole(e.target.value);
    };
    const handleClearFilter = () => {
        setFilterText("");
        setFilterDepartment("");
        setFilterRole("");
    };


    //ทำ modal Detail
    const [open, setOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);

    // ฟังก์ชันเปิด Modal และกำหนด selectedBooking เมื่อคลิกปุ่มดูรายละเอียด
    const handleOpenModal = (booking) => {
        setSelectedBooking(booking);
        setOpen(true);
    };

    // ฟังก์ชันปิด Modal และล้าง selectedBooking
    const handleCloseModal = () => {
        setSelectedBooking(null);
        setOpen(false);
    };

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
            width: '120px'
        },
        {
            id: 'firstName',
            name: 'FirstName',
            selector: row => row.FirstName,
            sortable: true,
            width: '160px'
        },
        {
            id: 'lastName',
            name: 'LastName',
            selector: row => row.LastName,
            sortable: true,
            width: '160px'
        },
        {

            id: 'department',
            name: 'Department',
            selector: row => row.DepartmentName,
            sortable: true,
            width: '180px'
        },
        {
            id: 'role',
            name: 'Role',
            width: '180px',
            sortable: true,
            selector: row =>
                <div>
                    <MDBadge badgeContent={row.RoleName} color="success" variant="gradient" size="sm" />

                </div>
        },
        {
            name: 'Action',
            width: '220px',
            selector: row =>
                <div class="btn-group" role="group" aria-label="Basic example">
                     {/* <Icon fontSize="small" onClick={() => { LoadEdit(row.EmployeeID) }}>edit</Icon> */}
                    <button className="btn btn-primary" onClick={() => handleOpenModal(row)}>Detail</button>
                    <button className="btn btn-warning" onClick={() => { LoadEdit(row.EmployeeID) }} >Edit</button>
                    <button className="btn btn-danger" onClick={() => { Removefunction(row.EmployeeID) }} >Delete</button>
                </div>
        }

    ];

    useEffect(() => {
        fetch("http://103.253.73.66:5001/employee")
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

                <div class="input-group">
                    <div className="btn">
                        <div className="btn me-5" >
                            <Link to="/addEmpolyee" className="btn btn-success" >Add Employee</Link>
                        </div>
                        <label for="customFile"  style={{ marginLeft: "20px"}}>import file .csv</label>
                        <input type="file" accept=".csv" className="btn btn-large-green" onChange={handleFileChangeFile} />
                        <button className="btn btn-secondary" type="button" onClick={handleUploadFile}>Upload</button>
                    </div>
                </div>
                <div className="LayoutContainer" >
                    <div className="card-body">
                        <Box display="flex" alignItems="center" justifyContent="center" >
                            <Box sx={{ flexGrow: 2 }} mr={1}>
                                <div class="input-group ">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search"
                                        style={{ maxWidth: "300px",marginLeft: "90px", marginRight: "30px" }}
                                        value={filterText}
                                        onChange={handleFilter}
                                    />
                                     <label for="customFile">แผนกงาน </label>
                                    <select
                                        className="btn btn-info me-4"
                                        value={filterDepartment}
                                        style={{ maxWidth: "200px",marginLeft: "20px", marginRight: "30px" }}
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
                                        style={{ maxWidth: "200px",marginLeft: "20px", marginRight: "30px" }}
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

                {/* <div class="input-group">
                    <div className="btn">
                        <div className="btn me-5" >
                            <Link to="/addEmpolyee" className="btn btn-success" >Add Employee</Link>
                        </div>
                        <label for="customFile"  style={{ marginLeft: "20px"}}>import file .csv</label>
                        <input type="file" accept=".csv" className="btn btn-large-green" onChange={handleFileChangeFile} />
                        <button className="btn btn-secondary" type="button" onClick={handleUploadFile}>Upload</button>
                    </div>
                </div> */}
                {csvError && <div className="alert alert-danger">{csvError}</div>}


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

                    <CSVLink data={filteredData} filename={"Employee_T.K.S.csv"} target="_blank" >
                        <button className="btn btn-primary">Export File</button>
                    </CSVLink>

                </Paper>

                {selectedBooking && (
                    <DetailModal
                        open={open}
                        handleClose={handleCloseModal}
                        booking={selectedBooking}
                    />
                )}


            </DashboardLayout >

        );
    }
}
export default HomeEmployee;

