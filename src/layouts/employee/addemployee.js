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
import Axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AddEmployee() {
  // เก็บบันทึกค่าลง state
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
  const handlesubmit = (e) => {
    e.preventDefault();
    Axios.post('http://localhost:5000/employee/add', {
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
    // }).then(() => {
    //   setEmployeeList([
    //     ...employeeList,
    //     {
    //       EmployeeID: EmployeeID,
    //       TitleName: TitleName,
    //       FirstName: FirstName,
    //       LastName: LastName,
    //       PhoneNumber: PhoneNumber,
    //       Email: Email,
    //       DepartmentName: DepartmentName,
    //       RoleName: RoleName,
    //       CreateDate: CreateDate,
    //       CreateBy: CreateBy,
    //       UpdateDate: UpdateDate,
    //       UpdateBy: UpdateBy
    //     }
    //   ])
    }).then((res) => {
      alert('Saved successfully.')
      navigate('/employee');
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
                        <input required value={EmployeeID} type="text" onChange={e => setEmployeeID(e.target.value)} className="form-control"></input>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>TitleName</label>
                        <input required value={TitleName} onMouseDown={e => valchange(true)} type="text" onChange={e => setTitleName(e.target.value)} className="form-control"></input>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>FirstName</label>
                        <input required value={FirstName} onMouseDown={e => valchange(true)} type="text" onChange={e => setFirstName(e.target.value)} className="form-control"></input>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>LastName</label>
                        <input value={LastName} type="text" onChange={e => setLastName(e.target.value)} className="form-control"></input>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>PhoneNumber</label>
                        <input value={PhoneNumber} type="text" onChange={e => setPhoneNumber(e.target.value)} className="form-control"></input>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>Email</label>
                        <input value={Email} type="email" onChange={e => setEmail(e.target.value)} className="form-control"></input>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>DepartmentName</label>
                        <input value={DepartmentName} type="text" onChange={e => setDepartmentName(e.target.value)} className="form-control"></input>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>RoleName</label>
                        <input value={RoleName} type="text" onChange={e => setRoleName(e.target.value)} className="form-control"></input>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>CreateDate</label>
                        <input value={CreateDate} type="datetime-local" onChange={e => setCreateDate(e.target.value)} className="form-control"></input>
                        {CreateDate.length == 0 && validation && <span className="text-danger">Enter the date</span>}
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>CreateBy</label>
                        <input value={CreateBy} type="text" onChange={e => setCreateBy(e.target.value)} className="form-control"></input>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>UpdateDate</label>
                        <input value={UpdateDate} type="datetime-local" onChange={e => setUpdateDate(e.target.value)} className="form-control"></input>
                        {UpdateDate.length == 0 && validation && <span className="text-danger">Enter the date</span>}
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>UpdateBy</label>
                        <input value={UpdateBy} type="text" onChange={e => setUpdateBy(e.target.value)} className="form-control"></input>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="form-group ">
                        <br></br>
                        <Link to="/employee" className="btn btn-danger">Back</Link>
                        <button className="btn btn-success" type="submit">Save</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

    </DashboardLayout>
  );
}
export default AddEmployee;