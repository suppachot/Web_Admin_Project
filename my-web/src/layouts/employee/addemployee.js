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
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { select } from 'assets/theme-dark/components/form/select';
import Select from 'react-select'
import Swal from 'sweetalert2';
import jwtDecode from "jwt-decode";

function AddEmployee() {
  // เก็บบันทึกค่าลง state
  const [employeeID, setemployeeID] = useState("");
  const [TitleName, setTitleName] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [Email, setEmail] = useState("");
  const [DepartmentName, setDepartmentName] = useState("");
  const [RoleName, setRoleName] = useState("");
  const [CreateDate, setCreateDate] = useState("");
  const [CreateBy, setCreateBy] = useState("");
  const [UpdateDate, setUpdateDate] = useState("");
  const [UpdateBy, setUpdateBy] = useState("");
  const [validation, valchange] = useState(false);

  const navigate = useNavigate();
  // อ่านค่าจาก db
  const [employeeList, setEmployeeList] = useState([]);
  const getEmployee = () => {
    Axios.get('http://localhost:5000/employee').then((response) => {
      setEmployeeList(response.data);
    });
  }

  // ส่งข้อมูล 
  // const handlesubmit = (e) => {
  //   e.preventDefault();
  //   Axios.post('http://localhost:5000/employee/add', {
  //     EmployeeID: employeeID,
  //     TitleName: TitleName,
  //     FirstName: FirstName,
  //     LastName: LastName,
  //     PhoneNumber: PhoneNumber,
  //     Email: Email,
  //     DepartmentName: DepartmentName,
  //     RoleName: RoleName,
  //     CreateDate: CreateDate,
  //     CreateBy: CreateBy,
  //     UpdateDate: UpdateDate,
  //     UpdateBy: UpdateBy
  //   }).then(() => {
  //     setEmployeeList([
  //       ...employeeList,
  //       {
  //         EmployeeID: employeeID,
  //         TitleName: TitleName,
  //         FirstName: FirstName,
  //         LastName: LastName,
  //         PhoneNumber: PhoneNumber,
  //         Email: Email,
  //         DepartmentName: DepartmentName,
  //         RoleName: RoleName,
  //         CreateDate: CreateDate,
  //         CreateBy: CreateBy,
  //         UpdateDate: UpdateDate,
  //         UpdateBy: UpdateBy
  //       }
  //     ])
  //   }).then((res) => {
  //     alert('Saved successfully.')
  //     navigate('/employee'); 
  //   }).catch((err) => {
  //     console.log(err.message)
  //   })
  //   console.log("message")
  // }

  const token = localStorage.getItem("jwt");
    const decodedToken = jwtDecode(token);
    const { emp, firstName, lastName } = decodedToken;

    useEffect(() => {
        const moment = require('moment-timezone');
        const date = new Date();
        const timezone = 'Asia/Bangkok'; // ตามที่ต้องการ
        const formattedDate = moment(date).tz(timezone).format('YYYY-MM-DDTHH:mm:ss');
        const username = emp; // แก้ไขเป็นชื่อผู้ใช้จริงที่ต้องการใช้งาน
        setCreateBy(username);
        setCreateDate(formattedDate);
        setUpdateDate(formattedDate);
        setUpdateBy(username);
      }, []);

  const handlesubmit = (e) => {
    e.preventDefault();

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "EmployeeID": employeeID,
      "TitleName": TitleName,
      "FirstName": FirstName,
      "LastName": LastName,
      "PhoneNumber": PhoneNumber,
      "Email": Email,
      "DepartmentName": DepartmentName,
      "RoleName": RoleName,
      "CreateDate": CreateDate,
      "CreateBy": CreateBy,
      "UpdateDate": UpdateDate,
      "UpdateBy": UpdateBy
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    //   fetch("http://localhost:5000/employee/add", requestOptions)
    //     .then(response => response.json())
    //     // .then(result =>{ 
    //     //   alert('Saved successfully.')
    //     //   navigate('/employee'); 
    //     // })
    //     .then(result => {
    //       alert('Saved successfully.')
    //       if (result['status'] === 'ok') {
    //         navigate('/employee');
    //       }
    //     })
    //     .catch(error => console.log('error', error));
    // }
    fetch("http://localhost:5000/employee/add", requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result['status'] === 'ok') {
          Swal.fire({
            icon: 'success',
            title: 'Saved successfully',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            navigate('/employee');
          });
        }
      })
      .catch(error => console.log('error', error));
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
                      <input required value={employeeID}
                        type="text"
                        id='EmployeeID'
                        onChange={e => setemployeeID(e.target.value)}
                        className="form-control">
                      </input>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>TitleName</label>
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
                      <label>Department</label>
                      <select
                        placeholder="select Department"
                        id='DepartmentName'
                        value={DepartmentName}
                        onChange={e => setDepartmentName(e.target.value)}
                        className="form-select"
                      >
                        <option value=" " selected>select Department</option>
                        <option value="ฝ่ายบุคคล">ฝ่ายบุคคล</option>
                        <option value="ฝ่ายบัญชี">ฝ่ายบัญชี</option>
                        <option value="พนักงานทั่วไป">พนักงานทั่วไป</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Role</label>
                      <select
                        id='RoleName'
                        placeholder="select Role"
                        value={RoleName}
                        onChange={e => setRoleName(e.target.value)}
                        className="form-select"
                      >
                        <option value=" " selected>select Role</option>
                        <option value="Administrator">Administrator</option>
                        <option value="Employee">Employee</option>
                      </select>
                      {/*                       
                      <input value={RoleName} type="text"
                        id='RoleName'
                        onChange={e => setRoleName(e.target.value)}
                        className="form-control">
                      </input> */}
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>CreateDate</label>
                      <input value={CreateDate} type="datetime-local"
                        id='CreateDate'
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
                        <Link to="/employee" className="btn btn-danger">Back</Link>
                      </div>
                    </Box>
                    <Box>
                      <div className="card-body col-lg-4" >
                        <button className="btn btn-success" type="submit">Save</button>
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
export default AddEmployee;