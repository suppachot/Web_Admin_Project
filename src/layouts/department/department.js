
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
import { useState, useEffect } from "react";
import DataTable from 'react-data-table-component';
import { Link, useNavigate } from 'react-router-dom';



function Department() {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  const [departmentdata, departmentdatachange] = useState(null);
  const navigate = useNavigate();

  const LoadDetail = (DepartmentID) => {
    navigate("/department/detail/" + DepartmentID);
  }
  const LoadEdit = (DepartmentID) => {
    navigate("/department/edit/" + DepartmentID);
  }
  const Removefunction = (DepartmentID) => {
    if (window.confirm('Do you want to remove?')) {
      Axios.delete("http://localhost:5000/deletedepartment/" + DepartmentID, {
      }).then((res) => {
        alert('Removed successfully.')
        window.location.reload();
      }).catch((err) => {
        console.log(err.message)
      })
    }
  }

  const columns = [
    {
      name: 'DepartmentID',
      selector: row => row.DepartmentID,
      width: '150px'
    },
    {
      name: 'DepartmentName',
      selector: row => row.DepartmentName,
      width: '200px'
    },
    {
      name: 'CreateDate',
      selector: row => row.CreateDate,
      width: '250px'
    },
    {
      name: 'CreateBy',
      selector: row => row.CreateBy,
      width: '150px'
    },
    {
      name: 'UpdateDate',
      selector: row => row.UpdateDate,
      width: '250px'
    },
    {
      name: 'UpdateBy',
      selector: row => row.UpdateBy,
      width: '150px'
    },
    {
      name: 'Action',
      selector: row =>

        <div class="btn-group" role="group" aria-label="Basic example">

          <button className="btn btn-primary" onClick={(clickHandler) => { LoadDetail(row.DepartmentID) }} >Detail</button>
          <button className="btn btn-warning" onClick={() => { LoadEdit(row.DepartmentID) }} >Edit</button>
          <button className="btn btn-danger" onClick={() => { Removefunction(row.DepartmentID) }} >Delete</button>

        </div>

    }
  ];


  useEffect(() => {
    fetch("http://localhost:5000/department")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      ).then((resp) => {
        departmentdatachange(resp);
      }).catch((err) => {
        console.log(err.message);
      })
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <div className="LayoutContainer">
                    <div className="card-body">
                        <div className="btn">
                            <Link to="/addDepartment" className="btn btn-success">Add New</Link>
                        </div>

                        <DataTable
                            columns={columns}
                            data={items}
                        />

                    </div>
                </div>

      </DashboardLayout>
    );
  }
}
export default Department;