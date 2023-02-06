import  Axios from "axios";
import { useState } from "react";
import DataTable from 'react-data-table-component';
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";


function AddEmployee() {
  // เก็บบันทึกค่าลง state
  const [employeeid, setEmployeeID] = useState("");
  const [titlename, setTitleName] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [departmentname, setDepartmentName] = useState("");
  const [rolename, setRoleName] = useState("");

  // อ่านค่าจาก db
  const [employeeList, setEmployeeList] = useState([]);
  const getEmployee = () => {
    Axios.get('http://localhost:5000/employee').then((response) => {
      setEmployeeList(response.data);
    });
  }

  // ส่งข้อมูล 
  const addEmployee = () => {
    Axios.post('http://localhost:5000/addemployee', {
      employeeid: employeeid,
      titlename: titlename,
      firstname: firstname,
      lastname: lastname,
      phonenumber: phonenumber,
      email: email,
      departmentname: departmentname,
      rolename: rolename
    }).then(() => {
      setEmployeeList([
        ...employeeList,
        {
          employeeid: employeeid,
          titlename: titlename,
          firstname: firstname,
          lastname: lastname,
          phonenumber: phonenumber,
          email: email,
          departmentname: departmentaname,
          rolename: rolename
        }
      ])
    })
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <div className="=container">
          <div className="information">
            <from action="">
              <div className="mb-3">
                <label htmlFor="employeeid" className="form-label col-sm-2">
                  EmployeeID:
                </label>
                <input
                  type="text"
                  className="from-control"
                  placeholder="Enter EmployeeID"
                  onChange={(event) => {
                    setEmployeeID(event.target.value)
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="titleid" className="form-label col-sm-2">
                  Title:
                </label>
                <input
                  type="text"
                  className="from-control"
                  placeholder="Enter Title"
                  onChange={(event) => {
                    setTitleName(event.target.value)
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="firstname" className="form-label col-sm-2">
                  FirstName:
                </label>
                <input
                  type="text"
                  className="from-control"
                  placeholder="Enter FirstName"
                  onChange={(event) => {
                    setFirstName(event.target.value)
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="lastname" className="form-label col-sm-2">
                  LastName:
                </label>
                <input
                  type="text"
                  className="from-control"
                  placeholder="Enter LastName"
                  onChange={(event) => {
                    setLastName(event.target.value)
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="phonenumber" className="form-label col-sm-2">
                  PhoneNumber:
                </label>
                <input
                  type="tel"
                  className="from-control"
                  placeholder="Enter PhoneNumber"
                  pattern="[0]{1}[6,8,9]{1}[0-9]{1}[0-9]{3}[0-9]{4}"
                  onChange={(event) => {
                    setPhoneNumber(event.target.value)
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label col-sm-2">
                  Email:
                </label>
                <input
                  type="email"
                  className="from-control"
                  placeholder="Enter Email"
                  onChange={(event) => {
                    setEmail(event.target.value)
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="departmentid" className="form-label col-sm-2">
                  DepartmentName:
                </label>
                <input
                  type="text"
                  className="from-control"
                  placeholder="Enter DepartmentName"
                  onChange={(event) => {
                  setDepartmentName(event.target.value)
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="roleid" className="form-label col-sm-2">
                  RoleName:
                </label>
                <input
                  type="text"
                  className="from-control"
                  placeholder="Enter RoleName"
                  onChange={(event) => {
                  setRoleName(event.target.value)
                  }}
                />
              </div><hr>
              </hr>
              <div className="mb-3">
                <label htmlFor="roleid" className="form-label col-sm-1">
                  Import File
                </label>
                <input
                  type="file"
                  className="from-file"
                />
              </div>

              <button type="button" class="btn btn-danger">ยกเลิก</button>
              <button type="button" class="btn btn-success" onClick={addEmployee}>บันทึก</button>
            </from>
          </div>
          <hr />

          <div className="employee">
            <button class="btn btn-primary" onClick={getEmployee}>Show</button>
            <br></br>
            <br></br>     
            {employeeList.map((val, key) => {
              return (
                <div className="employee card">
                  <div className="card-body text-left">
                    <p className="card-text">EmployeeID: {val.EmployeeID}</p>
                    <p className="card-text">TitleID: {val.TitleName}</p>
                    <p className="card-text">FirstName: {val.FirstName}</p>
                    <p className="card-text">LastName: {val.LastName}</p>
                    <p className="card-text">PhoneNumber: {val.PhoneNumber}</p>
                    <p className="card-text">Email: {val.Email}</p>
                    <p className="card-text">DepartmentID: {val.DepartmentName}</p>
                    <p className="card-text">RoleID: {val.RoleName}</p>
                    <p className="card-text">CreateDate: {val.CreateDate}</p>
                    <p className="card-text">CreateBy: {val.CreateBy}</p>
                    <p className="card-text">UpdateDate: {val.UpdateDate}</p>
                    <p className="card-text">UpdateBy: {val.UpdateBy}</p>

                  </div>
                </div>
              );
            })}
            </div>
          </div>
         
          
      </MDBox>

    </DashboardLayout>
  );
}
export default AddEmployee;