// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDBadge from "components/MDBadge";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import Axios from "axios";
import { useState, useEffect } from "react";
import DataTable from 'react-data-table-component';
import moment from "moment/moment";
import { Button, Modal } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { CSVLink, CSVDownload } from "react-csv";
import Paper from "@mui/material/Paper";



function Meeting() {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  const [newsdata, newsdatachange] = useState(null);
  const columns = [
    {
      id: 'Topic',
      name: 'Topic',
      selector: row => row.Topic,
      width: '300px'
    },
    {
      id: 'EmployeeID',
      name: 'EmployeeID',
      selector: row => row.EmployeeID,
      width: '150px'
    },
    {
      id: 'TimeStart',
      name: 'TimeStart',
      selector: row => row.TimeStart,
      width: '150px'
    },
    {
      id: 'TimeEnd',
      name: 'TimeEnd',
      selector: row => row.TimeEnd,
      width: '150px'
    },
    {
      id: 'Date',
      name: 'Date',
      selector: 'date',
      format: row => moment(row.Date).format('DD-MM-YYYY '),
      width: '150px'
    },
    {
      id: 'Status',
      name: 'Status',
      width: '150px',
      selector: row => 
      
        <div class="btn-group" role="group" aria-label="Basic example">
          <select
            placeholder="select Department"
            id='DepartmentName'
            value={row.Status}
            className="form-select"
          >
            <option value={row.Status}>Approve</option>
            <option value={row.Status}>No approve</option>
            <option value={row.Status}>Wait approve</option>
            
          </select>

        </div>

    },
    {
      id: 'Attendant',
      name: 'Attendant',
      selector: row => row.Attendant,
      width: '150px'
    },
    {
      id: 'DateApprove',
      name: 'DateApprove',
      selector: 'date',
      format: row => moment(row.DateApprove).format('DD-MM-YYYY'),
      width: '150px'
    }
  ];

  useEffect(() => {
    fetch("http://localhost:5000/meeting_approve")
      .then(res => res.json())
      // .then((resJson) => {
      //     const data = JSON.parse(resJson);
      // })
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
        newsdatachange(resp);
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

          <div className="card-body" >
            <div className="card-body" >
            </div>
            <Paper sx={{ p: 1 }} style={{ backgroundColor: '#F2F3F4' }}>
              <div className="card-body" >
                <DataTable
                  title="Meetingroom Approve"
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
        </div >
      </DashboardLayout >
    );
  }
}
export default Meeting;