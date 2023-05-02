// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import Box from "@mui/material/Box";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar1 from 'examples/Navbars/DashboardNavbar/indexEmp';

import Axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { select } from 'assets/theme-dark/components/form/select';
import Select from 'react-select'
import Swal from 'sweetalert2';
import jwtDecode from "jwt-decode";


function InsertMeeting(props) {
  // เก็บบันทึกค่าลง state
  const { roomID } = useParams();
  const { state } = useLocation();
  const [RoomID, setRoomID] = useState("");
  const [RoomName, setRoomName] = useState("");
  const [Topic, setTopic] = useState("");
  const [EmployeeID, setEmployeeID] = useState("");
  const [validation, valchange] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  // อ่านค่าจาก db
  const [meetingroom, setmeetingroom] = useState([]);
  const get = async () => {
    const response = await Axios.get('http://103.253.73.66:5001/get/' + roomID);
    console.log(response);
    setRoomID(response.data[0].RoomID);
    setRoomName(response.data[0].RoomName);
  };

  const token = localStorage.getItem("jwt");
  const decodedToken = jwtDecode(token);
  const { emp } = decodedToken;

  useEffect(() => {
    get();
    const moment = require('moment-timezone');
    const username = emp;
    setEmployeeID(username);
    console.log("String",state.startTime);
  }, []);

  // ส่งข้อมูล 
  const handlesubmit = (e) => {
    e.preventDefault();
    Axios.post('http://103.253.73.66:5001/booking/add', {
      RoomID: RoomID,
      RoomName: RoomName,
      Topic: Topic,
      EmployeeID: EmployeeID,
      startTime: state.startTime,
      endTime: state.endTime,
      startdate: state.startdate
    }).then(() => {
      setmeetingroom([
        ...meetingroom,
        {
          RoomID: RoomID,
          RoomName: RoomName,
          Topic: Topic,
          EmployeeID: EmployeeID,
          startTime: state.startTime,
          endTime: state.endTime,
          startdate: state.startdate
        }
      ])
      Swal.fire({
        icon: 'success',
        title: 'Saved successfully.',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        navigate('/historymeeting');
      });
    }).catch((err) => {
      console.log(err.message)
    });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar1 />
      <div className="row">
        <div className="offset-lg-3 col-lg-6">

          <form className="container" onSubmit={handlesubmit}>
            <div className="card" style={{ "textAlign": "left" }}>
              <div className="card-body">
                <div className="row">

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>RoomName</label>
                      <input value={RoomName}
                        type="text"
                        id='RoomName'
                        disabled
                        // onChange={e => setRoomName(e.target.value)}
                        className="form-control">
                      </input>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Topic</label>
                      <input required value={Topic} type="text"
                        id='Topic'
                        onChange={e => setTopic(e.target.value)}
                        className="form-control">
                      </input>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>EmployeeID</label>
                      <input value={EmployeeID} type="text"
                        id='EmployeeID'
                        disabled
                        onChange={e => setEmployeeID(e.target.value)}
                        className="form-control">
                      </input>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>StartTime</label>
                      <input
                        value={state.startdate} 
                        type="text"
                        id='startTime'
                        disabled
                        //onChange={e => setStartTime(e.target.value)}
                        className="form-control"></input>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>EndTime</label>
                      <input
                        value={state.startTime}
                        type="text"
                        id='endTime'
                        disabled
                        //onChange={e => setEndTime(e.target.value)}
                        className="form-control"></input>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Date</label>
                      <input
                        value={state.endTime}
                        type="text"
                        id='startdate'
                        disabled
                        // onChange={e => setStartDate(e.target.value)}
                        className="form-control">

                      </input>
                    </div>
                  </div>
                  <Box display="flex">
                    <Box sx={{ flexGrow: 4 }}>
                      <div className="card-body col-lg-4" >
                        <Link to="/reservemeeting" className="btn btn-danger">ยกเลิก</Link>
                      </div>
                    </Box>
                    <Box>
                      <div className="card-body col-lg-4" >
                        <button className="btn btn-success" type="submit">ยืนยัน</button>
                      </div>
                    </Box>
                  </Box>

                </div>
              </div>
            </div>
          </form>
        </div>
      </div >
    </DashboardLayout >
  );
}
export default InsertMeeting;