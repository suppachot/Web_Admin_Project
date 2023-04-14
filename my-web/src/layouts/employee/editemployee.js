// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Box from "@mui/material/Box";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Item from "antd/es/list/Item";
import axios from 'axios';
import Swal from 'sweetalert2';
import moment from "moment/moment";
import jwtDecode from "jwt-decode";

function EditEmp() {
  const { employeeID } = useParams();

  const [employeedata, setemployeedata] = useState([]);

  const [EmployeeID, setEmployeeID] = useState("");
  const [TitleName, setTitleName] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [Email, setEmail] = useState("");
  const [DepartmentName, setDepartmentName] = useState("");
  const [RoleName, setRoleName] = useState("");
  const [CreateDate, setCreateDate] = useState("");
  const [CreateBy, setCreateBy] = useState("");
  // const [UpdateDate, setUpdateDate] = useState(new Date());
  const [UpdateDate, setUpdateDate] = useState("");
  const [UpdateBy, setUpdateBy] = useState("");

  const [validation, valchange] = useState(false);

  const navigate = useNavigate();

  const getEmployeeID = async () => {
    const response = await Axios.get('http://localhost:5000/getemployee/' + employeeID);
    console.log(response);
    setEmployeeID(response.data[0].EmployeeID);
    setTitleName(response.data[0].TitleName);
    setFirstName(response.data[0].FirstName);
    setLastName(response.data[0].LastName);
    setPhoneNumber(response.data[0].PhoneNumber);
    setEmail(response.data[0].Email);
    setDepartmentName(response.data[0].DepartmentName);
    setRoleName(response.data[0].RoleName);
    setCreateDate(response.data[0].CreateDate);
    setCreateBy(response.data[0].CreateBy);
    // setUpdateDate(response.data[0].UpdateDate);
    // setUpdateBy(response.data[0].UpdateBy);
  };

  const token = localStorage.getItem("jwt");
  const decodedToken = jwtDecode(token);
  const { emp, firstName, lastName } = decodedToken;
  useEffect(() => {
    getEmployeeID();
    const moment = require('moment-timezone');
    const date = new Date();
    const timezone = 'Asia/Bangkok'; // ตามที่ต้องการ
    const formattedDate = moment(date).tz(timezone).format('YYYY-MM-DDTHH:mm:ss');
    const username = emp; // แก้ไขเป็นชื่อผู้ใช้จริงที่ต้องการใช้งาน
    setUpdateDate(formattedDate);
    setUpdateBy(username);
  }, []);



  const handlesubmit = (e) => {
    e.preventDefault();
    Axios.put("http://localhost:5000/employee/edit/" + EmployeeID, {
      EmployeeID: EmployeeID,
      TitleName: TitleName,
      FirstName: FirstName,
      LastName: LastName,
      PhoneNumber: PhoneNumber,
      Email: Email,
      DepartmentName: DepartmentName,
      RoleName: RoleName,
      CreateDate: CreateDate,
      CreateBy: CreateBy,
      UpdateDate: UpdateDate,
      UpdateBy: UpdateBy

      // }).then((res) => {
      //   alert('Saved successfully.')
      //   navigate('/employee');
      // }).catch((err) => {
      //   console.log(err.message)
      // })
    }).then((res) => {
      Swal.fire({
        icon: 'success',
        title: 'Saved successfully',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        navigate('/employee');
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
                      <label>EmployeeID</label>
                      <input required value={EmployeeID}
                        type="text"
                        id='EmployeeID'
                        disabled="disabled"
                        onChange={e => setEmployeeID(e.target.value)}
                        className="form-control">
                      </input>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>TitleName</label><br></br>
                      <select
                        placeholder="select title"
                        id='TitleName'
                        value={TitleName}
                        onChange={e => setTitleName(e.target.value)}
                        className="form-select"
                      >
                        <option value="" selected>select Title</option>
                        <option value="นาย">นาย</option>
                        <option value="นาง">นาง</option>
                        <option value="นางสาว">นางสาว</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>FirstName</label>
                      <input required value={FirstName}
                        type="text"
                        id='FirstName'
                        onChange={e => setFirstName(e.target.value)}
                        className="form-control">
                      </input>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>LastName</label>
                      <input value={LastName} type="text"
                        id='LastName'
                        onChange={e => setLastName(e.target.value)}
                        className="form-control">
                      </input>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>PhoneNumber</label>
                      <input value={PhoneNumber} type="tel"
                        id='PhoneNumber'
                        onChange={e => setPhoneNumber(e.target.value)}
                        pattern="[0]{1}[6,8,9]{1}[0-9]{8}" required
                        title="กรุณากรอกหมายเลขโทรศัพท์ในรูปแบบ ตัวเลข 10 หลัก และไม่ใส่เครื่องหมายขีด เช่น 08x1234567"
                        className="form-control">
                      </input>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Email</label>
                      <input value={Email} type="email"
                        id='Email'
                        onChange={e => setEmail(e.target.value)}
                        className="form-control">
                      </input>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>DepartmentName</label>
                      <select
                        placeholder="select Department"
                        id='DepartmentName'
                        value={DepartmentName}
                        onChange={e => setDepartmentName(e.target.value)}
                        className="form-select"
                      >
                        <option value=" " placeholder="select Department" selected>select Department</option>
                        <option value="ฝ่ายบุคคล">ฝ่ายบุคคล</option>
                        <option value="ฝ่ายบัญชี">ฝ่ายบัญชี</option>
                        <option value="พนักงานทั่วไป">พนักงานทั่วไป</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>RoleName</label>
                      <select
                        placeholder="select Role"
                        id='RoleName'
                        value={RoleName}
                        onChange={e => setRoleName(e.target.value)}
                        className="form-select"
                      >
                        <option value=" " placeholder="select Role" selected>select Role</option>
                        <option value="Administrator">Administrator</option>
                        <option value="Employee">Employee</option>
                      </select>
                    </div>
                  </div>


                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>CreateDate</label>
                      <input value={moment(CreateDate).format('DD/MM/YYYY HH:mm:ss A')} type="datetime"
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
                        disabled="disabled"
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
                      <input value={UpdateBy}
                        type="text"
                        id='UpdateBy'
                        onChange={e => setUpdateBy(e.target.value)}
                        className="form-control">
                      </input>
                    </div>
                  </div>

                  <Box display="flex">
                    <Box sx={{ flexGrow: 4 }}>
                      <div className="card-body col-lg-4" >
                        <Link to="/employee" className="btn btn-danger">Back</Link>
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
export default EditEmp;