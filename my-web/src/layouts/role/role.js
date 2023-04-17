
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
import moment from "moment";
import { Link, useNavigate } from 'react-router-dom';
import { Paper } from "@mui/material";
import Swal from 'sweetalert2'

function Role() {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  const [roledata, roledatachange] = useState(null);
  const navigate = useNavigate();

  const LoadDetail = (RoleID) => {
    navigate("/role/detail/" + RoleID);
  }
  const LoadEdit = (RoleID) => {
    navigate("/role/edit/" + RoleID);
  }
  const Removefunction = (RoleID) => {
    Swal.fire({
      title: 'Do you want to remove?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete("http://localhost:5000/deleterole/" + RoleID, {}).then((res) => {
          Swal.fire({
            title: 'Removed successfully.',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            window.location.reload();
          });
        }).catch((err) => {
          console.log(err.message)
        })
      }
    })
  }
  
  
  const columns = [
    {
      name: 'RoleID',
      selector: row => row.RoleID,
      sortable: true,
      width: '150px'
    },
    {
      name: 'RoleName',
      selector: row => row.RoleName,
      sortable: true,
      width: '150px'
    },
    {
      name: 'CreateDate',
      selector: row => moment(row.CreateDate).format('DD/MM/YYYY HH:mm:ss A'),
      sortable: true,
      width: '250px'
    },
    {
      name: 'CreateBy',
      selector: row => row.CreateBy,
      sortable: true,
      width: '150px'
    },
    {
      name: 'UpdateDate',
      selector: row => moment(row.UpdateDate).format('DD/MM/YYYY HH:mm:ss A'),
      sortable: true,
      width: '250px'
    },
    {
      name: 'UpdateBy',
      selector: row => row.UpdateBy,
      sortable: true,
      width: '150px'
    },
    {
      name: 'Action',
      selector: row =>

        <div class="btn-group" role="group" aria-label="Basic example">

          {/* <button className="btn btn-primary" onClick={(clickHandler) => { LoadDetail(row.RoleID) }} >Detail</button> */}
          <button className="btn btn-warning" onClick={() => { LoadEdit(row.RoleID) }} >Edit</button>
          <button className="btn btn-danger" onClick={() => { Removefunction(row.RoleID) }} >Delete</button>

        </div>

    }
  ];


  useEffect(() => {
    fetch("http://localhost:5000/role")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
          console.log(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      // ).then((resp) => {
      //   roledatachange(resp);
      // }
      ).catch((err) => {
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
              <Link to="/addRole" className="btn btn-success">Add New</Link>
            </div>

            <Paper sx={{ p: 1 }} style={{ backgroundColor: '#F2F3F4' }}>
              <div className="card-body" >
                <DataTable
                  title="Role"
                  columns={columns}
                  data={items}
                  highlightOnHover
                  pagination
                  paginationPerPage={5}
                  paginationRowsPerPageOptions={[5, 15, 25, 50]}
                  paginationComponentOptions={{
                    rowsPerPageText: 'Records per page:',
                    rangeSeparatorText: 'out of',
                  }}
                />
              </div>
            </Paper>

          </div>
        </div>

      </DashboardLayout>
    );
  }
}
export default Role;