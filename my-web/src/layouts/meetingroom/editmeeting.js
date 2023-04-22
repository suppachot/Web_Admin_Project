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
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Axios from "axios";
import { useState ,useEffect } from "react";
import { Link, useNavigate  } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { select } from 'assets/theme-dark/components/form/select';
import Select from 'react-select'
import Swal from 'sweetalert2';
import moment from "moment/moment";
import jwtDecode from "jwt-decode";


function EditMeetingRoom() {
  const { roomID } = useParams();

  const [meetingroomdata, setmeetingroomdata] = useState([]);

  const[RoomID,setRoomID] = useState("");
  const [RoomName, setRoomName] = useState("");
  const [Capacity, setCapacity] = useState("");
  const [CreateDate, setCreateDate] = useState("");
  const [CreateBy, setCreateBy] = useState("");
  const [UpdateDate, setUpdateDate] = useState("");
  const [UpdateBy, setUpdateBy] = useState("");

  const [validation, valchange] = useState(false);

  const navigate = useNavigate();

  // const getmeetingroomID = async () => {
  //   const response = await Axios.get('http://103.253.73.66:5000/getmeetingroom/' + roomID);
  //   console.log(response);
  //   setRoomID(response.data[0].RoomID);
  //   setRoomName(response.data[0].RoomName);
  //   setCapacity(response.data[0].Capacity);
  //   setCreateDate(response.data[0].CreateDate);
  //   setCreateBy(response.data[0].CreateBy);
  //   setUpdateDate(response.data[0].UpdateDate);
  //   setUpdateBy(response.data[0].UpdateBy);
  // };
  // useEffect(() => {
  //   getmeetingroomID();
  // }, []);

 
  // ส่งข้อมูล 
  // const handlesubmit = (e) => {
  //   e.preventDefault();
  //   Axios.put('http://103.253.73.66:5000/meetingroom/edit/'+ RoomID, {
  //     RoomID: RoomID,
  //     RoomName: RoomName,
  //     Capacity: Capacity,
  //     CreateDate: CreateDate,
  //     CreateBy: CreateBy,
  //     UpdateDate: UpdateDate,
  //     UpdateBy: UpdateBy
  //   }).then((res) => {
  //     Swal.fire({
  //       icon: 'success',
  //       title: 'Saved successfully',
  //       showConfirmButton: false,
  //       timer: 1500
  //     }).then(() => {
  //       navigate('/meetingroom');
  //     });
  //   }).catch((err) => {
  //     console.log(err.message)
  //   })
  // }

  const getmeetingroomID = async () => {
    const response = await Axios.get('http://103.253.73.66:5000/getmeetingroom/' + roomID);
    console.log(response);
    if(response.data[0]) {
      setRoomID(response.data[0].RoomID);
      setRoomName(response.data[0].RoomName );
      setCapacity(response.data[0].Capacity );
      setCreateDate(moment(response.data[0].CreateDate).format("YYYY-MM-DD HH:mm:ss A"));
      setCreateBy(response.data[0].CreateBy );
    }
  };
  const token = localStorage.getItem("jwt");
    const decodedToken = jwtDecode(token);
    const { emp, firstName, lastName } = decodedToken;
    useEffect(() => {
      getmeetingroomID();
        const moment = require('moment-timezone');
        const date = new Date();
        const timezone = 'Asia/Bangkok';
        const formattedDate = moment(date).tz(timezone).format('YYYY-MM-DDTHH:mm:ss');
        const username = emp; // แก้ไขเป็นชื่อผู้ใช้จริงที่ต้องการใช้งาน
        setUpdateDate(formattedDate);
        setUpdateBy(username);
    }, []);
  
  // ส่งข้อมูล 
  const handlesubmit = (e) => {
    e.preventDefault();
    Axios.put('http://103.253.73.66:5000/meetingroom/edit/'+ RoomID, {
      RoomID: RoomID,
      RoomName: RoomName,
      Capacity: Capacity,
      CreateDate: CreateDate,
      CreateBy: CreateBy,
      UpdateDate: UpdateDate,
      UpdateBy: UpdateBy
    }).then((res) => {
      Swal.fire({
        icon: 'success',
        title: 'Saved successfully',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        navigate('/meetingroom');
      });
    }).catch((err) => {
      console.log(err.message)
    })
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div className="row">
        <div className="offset-lg-3 col-lg-6">

          <form className="container" onSubmit={handlesubmit}>
            <div className="card" style={{ "textAlign": "left" }}>
              <div className="card-body">
                <div className="row">

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>RoomID</label>
                      <input required value={RoomID}
                        type="text"
                        id='RoomID'
                        disabled="disabled"
                        onChange={e => setRoomID(e.target.value)}
                        className="form-control">
                      </input>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>RoomName</label>
                      <input required value={RoomName}
                        type="text"
                        id='RoomName'
                        onChange={e => setRoomName(e.target.value)}
                        className="form-control">
                      </input>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Capacity</label>
                      <input value={Capacity} type="text"
                        id='Capacity'
                        onChange={e => setCapacity(e.target.value)}
                        className="form-control">
                      </input>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>CreateDate</label>
                      <input value={CreateDate} type="datetime"
                        id='CreateDate'
                        disabled
                        onChange={e => setCreateDate(e.target.value)}
                        className="form-control">

                      </input>
                      {CreateDate.length == 0 && validation && <span className="text-danger">Enter the date</span>}
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>CreateBy</label>
                      <input value={CreateBy} type="text"
                        id='CreateBy'
                        disabled
                        onChange={e => setCreateBy(e.target.value)}
                        className="form-control"></input>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>UpdateDate</label>
                      <input value={UpdateDate} type="datetime-local"
                        id='UpdateDate'
                        onChange={e => setUpdateDate(e.target.value)}
                        className="form-control"></input>
                      {UpdateDate.length == 0 && validation && <span className="text-danger">Enter the date</span>}
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>UpdateBy</label>
                      <input value={UpdateBy} type="text"
                        id='UpdateBy'
                        onChange={e => setUpdateBy(e.target.value)}
                        className="form-control">
                      </input>
                    </div>
                  </div>

                  <Box display="flex">
                    <Box sx={{ flexGrow: 4 }}>
                      <div className="card-body col-lg-4" >
                        <Link to="/meetingroom" className="btn btn-danger">Back</Link>
                      </div>
                    </Box>
                    <Box>
                      <div className="card-body col-lg-4" >
                        <button className="btn btn-success" type="submit">Update</button>
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
export default EditMeetingRoom;

