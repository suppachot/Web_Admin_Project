
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

function Checkout() {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  const columns = [
    {
      name: 'TransactionID',
      selector: row => row.TransactionID,
      width: '150px'
    },
    {
      name: 'EmployeeID',
      selector: row => row.EmployeeID,
      width: '200px'
    },
    {
      name: 'CheckOutDate',
      selector: row => row.CheckOutDate,
      width: '250px'
    },
    {
      name: 'CheckOutTime',
      selector: row => row.CheckOutTime,
      width: '150px'
    },
    {
      name: 'Location',
      selector: row => row.Location,
      width: '250px'
    },
    {
      name: 'Model',
      selector: row => row.Model,
      width: '150px'
    }
  ];

  useEffect(() => {
    fetch("http://localhost:5000/checkout")
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
export default Checkout;