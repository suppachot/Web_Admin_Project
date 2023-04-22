// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDBadge from "components/MDBadge";
import MDTypography from "components/MDTypography";
import { Box } from "@mui/material";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import Axios from "axios";
import { useState, useEffect } from "react";
import DataTable from 'react-data-table-component';
import moment from "moment/moment";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CSVLink, CSVDownload } from "react-csv";
import Paper from "@mui/material/Paper";
import Swal from 'sweetalert2';
import jwtDecode from "jwt-decode";
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

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

function BookingApprove() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

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

    const [filterText, setFilterText] = useState('');
    const filteredData = items.filter((item) =>
        item.RoomName.toLowerCase().includes(filterText.toLowerCase()) ||
        item.Topic.toLowerCase().includes(filterText.toLowerCase()) ||
        item.Status.toLowerCase().includes(filterText.toLowerCase())
    );

    const handleFilter = (e) => {
        setFilterText(e.target.value);
    };

    const handleClearFilter = () => {
        setFilterText('');
    };



    const columns = [
        {
            id: 'BookingID',
            name: 'BookingID',
            sortable: true,
            selector: row => row.BookingID,
            width: '120px'
        },
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
            width: '150px',
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
            name: 'Action Status',
            cell: row => (
                <div className="btn-group dropright">
                    <button
                        id="btnGroupDrop1"
                        type="button"
                        className={`btn dropdown-toggle 
                                ${row.Status === 'Wait' ? 'btn-warning'
                                : row.Status === 'Approve' ? 'btn-success'
                                    : row.Status === 'No approve' ? 'btn-danger'
                                        : ''}`}
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        {row.Status}
                    </button>
                    <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                        <button
                            className="dropdown-item"
                            onClick={() => handleStatusUpdate(row, 'Approve')}
                            disabled={row.Status === 'Approve' || row.Status === 'No approve' }
                            data-bookingid={row.BookingID}
                        >
                            Approve
                        </button>
                        <button
                            className="dropdown-item"
                            onClick={() => handleStatusUpdate(row, 'No approve')}
                            disabled={row.Status === 'Approve' || row.Status === 'No approve'}
                            data-bookingid={row.BookingID}
                        >
                            No approve
                        </button>
                    </div>
                </div>
            ),
        },
        {
            name: 'Action',
            selector: row =>

                <div class="btn-group" role="group" aria-label="Basic example">
                    <button className="btn btn-primary" onClick={() => handleOpenModal(row)}>Detail</button>
                </div>

        }

    ];

    const handleStatusUpdate = (row, status) => {
        // ตรวจสอบสถานะเพื่อเปิดหรือปิดปุ่มแก้ไข
        const statusButtons = document.querySelectorAll('.dropdown-item');
        statusButtons.forEach(button => {
            button.addEventListener('click', () => {
                const status = button.textContent.trim();
                if (status === 'Wait') {
                    handleStatusUpdate(row, status);
                }
            });
        });

        const token = localStorage.getItem('jwt');
        const decodedToken = jwtDecode(token);
        const { emp } = decodedToken;
        const currentDate = moment().format('YYYY-MM-DDTHH:mm:ss');
        const url = `http://103.253.73.66:5000/booking/edit/${row.BookingID}`;

        // อัพเดทข้อมูลในตาราง booking_approve ผ่าน API
        fetch(url, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Status: status,
                Attendant: emp,
                DateApprove: currentDate,
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                // อัพเดทสถานะการจองในตาราง Datatable
                const updatedItems = items.map(item => {
                    if (item.BookingID === row.BookingID) {
                        return {
                            ...item,
                            Status: status,
                        };
                    }
                    return item;
                });
                setItems(updatedItems);
                if (status === 'Approve' || status === 'No approve') {
                    clearInterval(intervalId); // หยุด setInterval ที่กำลังทำงานอยู่
                }
                if (status === 'Wait') {
                    const statusButtons = document.querySelectorAll('.dropdown-item');
                    statusButtons.forEach(button => button.disabled = true);
                } else if (status === 'Approve' || status === 'No approve') {
                    const statusButton = document.querySelector(`[data-bookingid="${row.BookingID}"]`);
                    statusButton.disabled = true;
                 }
         
            })
            .catch(error => console.log(error));
    };


    useEffect(() => {
        fetch("http://103.253.73.66:5000/bookingmeeting")
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
            ).catch((err) => {
                console.log(err.message);
            })
    }, [items]);

    useEffect(() => {
        if (items.length > 0) {
            const intervalId = setInterval(() => {
                window.location.reload();
            }, 3000); // รีเฟรชหน้าเว็บทุก ๆ 3 วินาที หลังมีการเปลี่ยนค่าของข้อมูล

            return () => clearInterval(intervalId);
        }
    }, [items]);


    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <DashboardLayout>
                <DashboardNavbar />

                <Box display="flex">
                    <Box sx={{ flexGrow: 2 }} >
                        <div class="input-group col-lg-4" >
                            <input type="text"
                                className="form-control"
                                placeholder="Search"
                                value={filterText}
                                onChange={handleFilter}
                            >
                            </input>
                            <button
                                className="btn btn-danger"
                                onClick={handleClearFilter}
                            >
                                Clear
                            </button>
                        </div>
                    </Box>
                </Box>

                <div className="LayoutContainer">

                    <div className="card-body" >
                        <div className="card-body" >
                        </div>
                        <Paper sx={{ p: 1 }} style={{ backgroundColor: '#F2F3F4' }}>
                            <div className="card-body" >
                                <DataTable
                                    title="Meetingroom Approve"
                                    columns={columns}
                                    //data={items}
                                    data={filteredData}
                                    highlightOnHover
                                    pagination
                                    paginationPerPage={10}
                                    paginationRowsPerPageOptions={[10, 15, 25, 50]}
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
                </div >
            </DashboardLayout >
        );
    }
}
export default BookingApprove;