
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
import { Link, useNavigate } from 'react-router-dom';

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

import Icon from "@mui/material/Icon";
import jwtDecode from "jwt-decode";


function ReserveMeeting() {

    const navigate = useNavigate();

    const token = localStorage.getItem("jwt");
    const decodedToken = jwtDecode(token);
    const { emp } = decodedToken;

    const [availableRooms, setAvailableRooms] = useState([]);

    // กำหนด state สำหรับเก็บค่าวันที่ เวลาเริ่ม เวลาสิ้นสุด
    const [startdate, setStartDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const fetchAvailableRooms = async () => {
        try {
            const response = await fetch(`http://103.253.73.66:5001/meetingroomm/available/startdate=${startdate}&start_time=${startTime}&end_time=${endTime}`);
            const data = await response.json();
            setAvailableRooms(data);
        } catch (error) {
            console.error(error);
        }
    };
    const handleClearFilter = () => {
        setStartDate("");
        setStartTime('');
        setEndTime('');
    };
    const LoadEdit = (RoomID, startdate, startTime, endTime) => {
        navigate(`/reserve/${RoomID}`,
            {
                state: {  
                    startTime: startTime,
                    endTime: endTime,
                    startdate: startdate
                }
            });
        console.log(columns);
    }

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const columns = [
        {
            id: 'RoomID',
            name: 'RoomID',
            selector: row => row.RoomID,
            sortable: true,
            width: '320px'
        },
        {
            id: 'RoomName',
            name: 'RoomName',
            selector: row => row.RoomName,
            sortable: true,
            width: '320px'
        },
        {
            id: 'Capacity',
            name: 'Capacity',
            selector: row => row.Capacity,
            sortable: true,
            width: '320px'
        },
        {
            name: 'Action',
            width: '220px',
            selector: row =>
                <div class="btn-group" role="group" aria-label="Basic example">
                    <button className="btn btn-primary" onClick={() => { LoadEdit(row.RoomID, startdate, startTime, endTime) }}>จอง</button>
                </div>
        }
    ];

    useEffect(() => {
        fetch("http://103.253.73.66:5001/meetingroom")
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
                <DashboardNavbar1 />
                <div className="LayoutContainer">
                    <div className="card-body">
                        <Box display="flex" mb={3}>
                            <Box sx={{ flexGrow: 2 }}>

                                <div class="input-group ">
                                    <label for="customFile" style={{ marginLeft: "30px" }}>วันที่ต้องการจอง </label>
                                    <input
                                        className="form-control"
                                        type="date"
                                        style={{ marginLeft: "30px", marginRight: "20px" }}
                                        value={startdate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                    />
                                    <label for="customFile" style={{ marginLeft: "30px" }}>ช่วงเวลาที่ต้องการจอง </label>
                                    <input
                                        className="form-control"
                                        type="time"
                                        style={{ marginLeft: "30px", marginRight: "15px" }}
                                        value={startTime}
                                        onChange={(e) => setStartTime(e.target.value)}
                                    />
                                    <label for="customFile" >-</label>
                                    <input
                                        className="form-control"
                                        type="time"
                                        style={{ marginLeft: "15px", marginRight: "30px" }}
                                        value={endTime}
                                        onChange={(e) => setEndTime(e.target.value)}
                                    />
                                    <button className="btn btn-primary" onClick={fetchAvailableRooms}>Search</button>
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
                                    data={availableRooms}
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
            </DashboardLayout >

        );
    }
}
export default ReserveMeeting;

