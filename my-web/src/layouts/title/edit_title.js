// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { Box } from '@mui/material';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Item from "antd/es/list/Item";
import axios from 'axios';
import Swal from 'sweetalert2';
import moment from "moment/moment";
import jwtDecode from "jwt-decode";

function EditTitle() {
  // เก็บบันทึกค่าลง state

  const { titleID } = useParams();

  const [TitleID, setTitleID] = useState("");
  const [TitleName, setTitleName] = useState("");
  const [CreateDate, setCreateDate] = useState("");
  const [CreateBy, setCreateBy] = useState("");
  const [UpdateDate, setUpdateDate] = useState("");
  const [UpdateBy, setUpdateBy] = useState("");
  const [validation, valchange] = useState(false);

  const navigate = useNavigate();
  // อ่านค่าจาก db
  const [titleList, settitleList] = useState([]);
  const getTitelID = async () => {
    const response = await Axios.get('http://103.253.73.66:5001/gettitle/' + titleID);
    console.log(response);
    if (response.data && response.data[0]) {
      setTitleID(response.data[0].TitleID);
      setTitleName(response.data[0].TitleName);
      setCreateDate(moment(response.data[0].CreateDate).format("YYYY-MM-DD"));
      setCreateBy(response.data[0].CreateBy);
    } else {
      console.log("No data found.");
    }
  };
  const token = localStorage.getItem("jwt");
  const decodedToken = jwtDecode(token);
  const { emp, firstName, lastName } = decodedToken;
  useEffect(() => {
    getTitelID();
    const moment = require('moment-timezone');
    const date = new Date();
    const timezone = 'Asia/Bangkok'; // ตามที่ต้องการ
    const formattedDate = moment(date).tz(timezone).format('YYYY-MM-DDTHH:mm:ss');
    const username = emp; // แก้ไขเป็นชื่อผู้ใช้จริงที่ต้องการใช้งาน
    setUpdateDate(formattedDate);
    setUpdateBy(username);
  }, []);


  // ส่งข้อมูล 
  const handlesubmit = (e) => {
    e.preventDefault();
    Axios.put('http://103.253.73.66:5001/title/edit/' + TitleID, {
      TitleID: TitleID,
      TitleName: TitleName,
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
        navigate('/title');
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
                      <label>TitleID</label>
                      <input required value={TitleID}
                        type="text"
                        id='TitleID'
                        disabled
                        onChange={e => setTitleID(e.target.value)}
                        className="form-control">
                      </input>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>TitleName</label>
                      <input
                        id='TitleName'
                        value={TitleName}
                        onChange={e => setTitleName(e.target.value)}
                        className="form-control"
                      >
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
                        <Link to="/title" className="btn btn-danger">Back</Link>
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
      </div>
    </DashboardLayout>
  );
}
export default EditTitle;