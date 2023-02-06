
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



function Department() {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
	const [perPage, setPerPage] = useState(10);


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
      )
  }, [])
  
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <DataTable
          columns={columns}
          data={items}
        />

      </DashboardLayout>
    );
  }
}
export default Department;