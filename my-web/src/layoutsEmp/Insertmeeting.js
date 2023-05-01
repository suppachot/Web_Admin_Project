import DataTable from 'react-data-table-component';
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
import { Link, useNavigate } from "react-router-dom";
import { select } from 'assets/theme-dark/components/form/select';
import Select from 'react-select'
import Swal from 'sweetalert2';
import jwtDecode from "jwt-decode";


function InsertMeeting() {
  // เก็บบันทึกค่าลง state
  //const [roomID, setroomID] = useState("");
  const [RoomName, setRoomName] = useState("");
  const [Topic, setTopic] = useState("");
  const [EmployeeID, setEmployeeID] = useState("");
  const [StartTime, setStartTime] = useState("");
  const [EndTime, setEndTime] = useState("");
  const [Datee, setDatee] = useState("");
  const [validation, valchange] = useState(false);

  const navigate = useNavigate();
  // อ่านค่าจาก db
  const [meetingroom, setmeetingroom] = useState([]);
  const get = async () => {
    const response = await Axios.get('http://103.253.73.66:5001/get/' + RoomID);
    console.log(response);
    setRoomName(response.data[0].RoomName);
  };

  const token = localStorage.getItem("jwt");
  const decodedToken = jwtDecode(token);
  const { emp } = decodedToken;

  useEffect(() => {
    const moment = require('moment-timezone');
    const date = new Date();
    const timezone = 'Asia/Bangkok'; // ตามที่ต้องการ
    const formattedDate = moment(date).tz(timezone).format('YYYY-MM-DDTHH:mm:ss');
    const username = emp; // แก้ไขเป็นชื่อผู้ใช้จริงที่ต้องการใช้งาน
    setEmployeeID(username);
  }, []);

  // ส่งข้อมูล 
  const handlesubmit = (e) => {
    e.preventDefault();
    Axios.post('http://103.253.73.66:5001/booking/add', {
      RoomName: RoomName,
      Topic: Topic,
      EmployeeID: EmployeeID,
      StartTime: StartTime,
      EndTime: EndTime,
      Datee: Datee
    }).then(() => {
      setmeetingroom([
        ...meetingroom,
        {
         // RoomID: roomID,
         RoomName: RoomName,
         Topic: Topic,
         EmployeeID: EmployeeID,
         StartTime: StartTime,
         EndTime: EndTime,
         Datee: Datee
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
                      <input  value={RoomName}
                        type="text"
                        id='RoomName'
                        onChange={e => setRoomName(e.target.value)}
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
                      <input value={StartTime} type="time"
                        id='StartTime'
                        onChange={e => setStartTime(e.target.value)}
                        className="form-control"></input>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>EndTime</label>
                      <input value={EndTime} type="time"
                        id='EndTime'
                        onChange={e => setEndTime(e.target.value)}
                        className="form-control"></input>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Date</label>
                      <input value={Datee} type="date"
                        id='Date'
                        onChange={e => setDatee(e.target.value)}
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