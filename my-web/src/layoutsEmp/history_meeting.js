
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDBadge from "components/MDBadge";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar1 from "examples/Navbars/DashboardNavbar/indexEmp";

import Axios from "axios";
import axios from "axios";
import { useState, useEffect } from "react";
import DataTable from 'react-data-table-component';
import moment from "moment/moment";
import csvToJson from "csvtojson";
import Papa from 'papaparse';
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
import jwtDecode from "jwt-decode";

// ประกาศตัวแปรสำหรับสไตล์ Modal
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-35%, -50%)',
    width: 1000,
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
                    Booking Detail
                </MDTypography>

                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <MDTypography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                            Booking ID:
                        </MDTypography>
                        <MDTypography variant="body1">{booking.BookingID}</MDTypography>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                            Employee ID :
                        </Typography>
                        <Typography variant="body1">{booking.EmployeeID}</Typography>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                            StartTime :
                        </Typography>
                        <Typography variant="body1">
                            {moment(booking.StartTime, 'HH:mm:ss').format('HH:mm:ss A')}
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <MDTypography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                            Room Name:
                        </MDTypography>
                        <MDTypography variant="body1">{booking.RoomName}</MDTypography>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                            Name :
                        </Typography>
                        <Typography variant="body1" sx={{ flex: 1 }}>
                            {booking.TitleName} {booking.FirstName} {booking.LastName}
                        </Typography>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                            EndTime :
                        </Typography>
                        <Typography variant="body1">
                            {moment(booking.EndTime, 'HH:mm:ss').format('HH:mm:ss A')}
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <MDTypography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                            Date :
                        </MDTypography>
                        <MDTypography variant="body1">
                            {moment(booking.Date).format('DD/MM/YYYY')}
                        </MDTypography>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                            Department :
                        </Typography>
                        <Typography variant="body1">{booking.DepartmentName}</Typography>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                            Status :
                        </Typography>
                        <Typography variant="body1">{booking.Status}</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <MDTypography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                            Topic:
                        </MDTypography>
                        <MDTypography variant="body1">{booking.Topic}</MDTypography>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                            Role :
                        </Typography>
                        <Typography variant="body1">{booking.RoleName}</Typography>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                            DateApprove :
                        </Typography>
                        <Typography variant="body1">
                            {moment(booking.DateApprove).format('DD/MM/YYYY')}
                        </Typography>
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
function HistoryMeeting() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    const Removefunction = (BookingID) => {
        Swal.fire({
            title: 'คุณต้องการยกเลิกการจองใช่ไหม ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.isConfirmed) {
                Axios.delete(`http://103.253.73.66:5001/deletebookingg/${BookingID}`)
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

    const [filterStatus, setFilterStatus] = useState('');
    const [filterDate, setFilterDate] = useState('');
    const filteredData = items.filter((item) => {
        const itemDate = item.Date.split('/').reverse().join('/'); // แปลง format ของวันที่ใน items
        return (filterStatus === '' || item.Status === filterStatus) &&
            (filterDate === '' || itemDate >= filterDate) &&
            (filterDate === '' || itemDate <= filterDate + 'T23:59:59.999'); // ใส่เวลาสุดท้ายของวันที่
    });

    const handleFilterStatus = (e) => {
        setFilterStatus(e.target.value);
    };
    const handleFilterDate = (e) => {
        setFilterDate(e.target.value);
    };
    const handleClearFilter = () => {
        setFilterStatus("");
        setFilterDate('');
    };


    const columns = [
        {
            id: 'RoomName',
            name: 'RoomName',
            sortable: true,
            selector: row => row.RoomName,
            width: '120px'
        },
        {
            id: 'Topic',
            name: 'Topic',
            sortable: true,
            selector: row => row.Topic,
            width: '200px'
        },
        {
            id: 'EmployeeID',
            name: 'EmployeeID',
            sortable: true,
            selector: row => row.EmployeeID,
            width: '120px'
        },
        {
            id: 'StartTime',
            name: 'StartTime',
            sortable: true,
            selector: row => row.StartTime,
            width: '120px'
        },
        {
            id: 'EndTime',
            name: 'EndTime',
            sortable: true,
            selector: row => row.EndTime,
            width: '100px'
        },
        {
            id: 'Date',
            name: 'Date',
            sortable: true,
            selector: row => moment(row.Date).format('DD/MM/YYYY '),
            width: '120px'
        },
        {
            id: 'Status',
            name: 'Status',
            sortable: true,
            selector: row => row.Status,
            width: '120px',
            cell: row => {
                let className = '';
                if (row.Status === 'Wait') {
                    className = 'text-warning';
                } else if (row.Status === 'Approve') {
                    className = 'text-success';
                } else if (row.Status === 'No approve') {
                    className = 'text-danger';
                }
                return <div className={className}>{row.Status}</div>
            }
        },
        {
            id: 'Attendant',
            name: 'Attendant',
            sortable: true,
            selector: row => row.Attendant,
            width: '120px'
        },
        {
            id: 'DateApprove',
            name: 'DateApprove',
            sortable: true,
            selector: row => moment(row.DateApprove).format('DD/MM/YYYY '),
            width: '120px'
        },
        // {
        //     name: 'Detail',
        //     selector: row =>
        //         <div class="btn-group" role="group" aria-label="Basic example">
        //             <button className="btn btn-primary" onClick={() => handleOpenModal(row)}>Detail</button>
        //         </div>

        // },
        {
            name: 'Cancel',
            selector: row =>
                row.Status === 'Wait' ?
                <div class="btn-group" role="group" aria-label="Basic example">
                    <button className="btn btn-danger" onClick={() => { Removefunction(row.BookingID) }} >ยกเลิก</button>
                </div>
                :
                null
        }
        
    ];

    useEffect(() => {
        const employeeID = sessionStorage.getItem('emp');
        const fetchData = () => {
            fetch(`http://103.253.73.66:5001/historymeeting/${employeeID}`)
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
                });
        };
        fetchData();
        const intervalId = setInterval(fetchData, 3000);
        return () => clearInterval(intervalId);
    }, []);
    



    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <DashboardLayout>
                <DashboardNavbar1 />
                <div className="LayoutContainer">
                    <div className="card-body">

                        <Box display="flex" mb={3}>
                            <Box sx={{ flexGrow: 2 }}>
                                <div class="input-group ">
                                    <select
                                        className="btn btn-secondary me-2"
                                        value={filterStatus}
                                        onChange={handleFilterStatus}
                                    >
                                        <option value="">Status all</option>
                                        <option value="Wait">Wait</option>
                                        <option value="Approve">Approve</option>
                                        <option value="No approve">No approve</option>
                                    </select>
                                    <input
                                        className="form-control"
                                        type="date"
                                        style={{ maxWidth: "200px" }}
                                        value={filterDate}
                                        onChange={handleFilterDate}
                                    />
                                    <button
                                        className="btn btn-danger"
                                        onClick={handleClearFilter}
                                    >
                                        Clear
                                    </button>
                                </div>
                            </Box>
                        </Box>
                        <Paper sx={{ p: 1 }} style={{ backgroundColor: '#F2F3F4' }}>
                            <div className="card-body" >
                                <DataTable
                                    title=""
                                    columns={columns}
                                    data={filteredData}
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
                        {selectedBooking && (
                            <DetailModal
                                open={open}
                                handleClose={handleCloseModal}
                                booking={selectedBooking}
                            />
                        )}
                    </div>
                </div>
            </DashboardLayout >

        );
    }
}
export default HistoryMeeting;

