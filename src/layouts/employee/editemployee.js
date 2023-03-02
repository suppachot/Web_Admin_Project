// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import  Axios  from "axios";
import { useParams } from 'react-router-dom';


function EditEmp() {
  const { employeeID } = useParams();
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

  const [employeedata, employeedatachange] = useState(null);
  const getEmp = () => {
    Axios.get('http://localhost:5000/getemployee/' + employeeID).then((response) => {
      employeedatachange(response.data);
    });
  }

  // useEffect(() => {
  //   fetch("http://localhost:5000/employee/" + employeeID).then((res) => {
  //     return res.json();
  //   }).then((resp) => {
  //     employeedatachange(resp);
  //   }).catch((err) => {
  //     console.log(err.message);
  //   })
  // }, [])

  // const getEmployees = (values) => {
  //   //console.log(values);
  //     Axios.get(`http://localhost:5000/getemployee/${values.employeeID}`).then((response) => {
  //       console.log(response.data);
  //       employeedatachange(response.data);
  //       const defaultValue = {
  //     TitleName: response.data.TitleName,
  //     FirstName: response.data.FirstName,
  //     LastName: response.data.LastName,
  //     PhoneNumber: response.data.PhoneNumber,
  //     Email: response.data.Email,
  //     DepartmentName: response.data.DepartmentName,
  //     RoleName: response.data.RoleName,
  //     CreateDate: response.data.CreateDate,
  //     CreateBy: response.data.CreateBy,
  //     UpdateDate: response.data.UpdateDate,
  //     UpdateBy: response.data.UpdateBy
  //       }
  //     })

  // }

  const handlesubmit = (e) => {
    e.preventDefault();
    Axios.put("http://localhost:5000/employee/edit/" + EmployeeID, {
      //EmployeeID: employeeID,
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
                      <input required value={EmployeeID}
                        type="text"
                        id='EmployeeID'
                        // disabled="disabled"
                        onChange={e => setEmployeeID(e.target.value)}
                        className="form-control">
                      </input>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>TitleName</label>
                      <input required value={TitleName}
                        type="text"
                        id='TitleName'
                        onChange={e => setTitleName(e.target.value)}
                        className="form-control">
                      </input>
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
                      <input value={PhoneNumber} type="text"
                        id='PhoneNumber'
                        onChange={e => setPhoneNumber(e.target.value)}
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
                      <input value={DepartmentName} type="text"
                        id='DepartmentName'
                        onChange={e => setDepartmentName(e.target.value)}
                        className="form-control">
                      </input>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>RoleName</label>
                      <input value={RoleName} type="text"
                        id='RoleName'
                        onChange={e => setRoleName(e.target.value)}
                        className="form-control">
                      </input>
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
                        // disabled="disabled"
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

                  <div className="col-lg-12">
                    <div className="form-group ">
                      <br></br>
                      <Link to="/employee" className="btn btn-danger">Back</Link>
                      <button className="btn btn-success" type="submit">Update</button>
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
export default EditEmp;