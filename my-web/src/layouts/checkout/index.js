
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { Box } from "@mui/material";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import Axios from "axios";
import { useState, useEffect } from "react";
import DataTable from 'react-data-table-component';
import moment from "moment/moment";
import Paper from "@mui/material/Paper";

import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';


// ประกาศตัวแปรสำหรับสไตล์ Modal
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-35%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '20px',
};

// สร้าง Modal Component ที่ใช้แสดงข้อมูลเพิ่มเติม
const DetailModal = ({ open, handleClose, transaction }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <IconButton
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: '5px',
            top: '5px',
            color: 'grey.500',
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ marginBottom: '15px' }}
        >
          Checkin Detail
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              Transaction ID :
            </Typography>
            <Typography variant="body1">{transaction.TransactionID}</Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              Employee ID :
            </Typography>
            <Typography variant="body1">{transaction.EmployeeID}</Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              Name :
            </Typography>
            <Typography variant="body1">
              {transaction.TitleName} {transaction.FirstName} {transaction.LastName}
            </Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              Department :
            </Typography>
            <Typography variant="body1">{transaction.DepartmentName}</Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              Role :
            </Typography>
            <Typography variant="body1">{transaction.RoleName}</Typography>


          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              Check Out Date :
            </Typography>
            <Typography variant="body1">
              {moment(transaction.CheckOutDate).format('DD/MM/YYYY')}
            </Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              Check Out Time :
            </Typography>
            <Typography variant="body1">
              {moment(transaction.CheckOutTime, 'HH:mm:ss').format('HH:mm:ss A')}
            </Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              Location :
            </Typography>
            <Typography variant="body1">{transaction.Location}</Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              Model :
            </Typography>
            <Typography variant="body1">{transaction.Model}</Typography>
          </Grid>
        </Grid>

        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-danger"
            onClick={handleClose}
            data-dismiss="modal"
            sx={{
              marginTop: '15px',
              marginLeft: 'auto',
              display: 'block',
            }}
          >
            Close
          </button>
        </div>
      </Box>
    </Modal>
  );
};

function Checkout() {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  const [filterText, setFilterText] = useState('');
  const filteredData = items.filter((item) =>
    item.EmployeeID.toLowerCase().includes(filterText.toLowerCase())

  );

  const handleFilter = (e) => {
    setFilterText(e.target.value);
  };

  const handleClearFilter = () => {
    setFilterText('');
  };
  //ทำ modal
  const [open, setOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // ฟังก์ชันเปิด Modal และกำหนด selectedTransaction เมื่อคลิกปุ่มดูรายละเอียด
  const handleOpenModal = (transaction) => {
    setSelectedTransaction(transaction);
    setOpen(true);
  };

  // ฟังก์ชันปิด Modal และล้าง selectedTransaction
  const handleCloseModal = () => {
    setSelectedTransaction(null);
    setOpen(false);
  };

  //-------------------------//
  const columns = [
    {
      name: 'TransactionID',
      selector: row => row.TransactionID,
      sortable: true,
      width: '150px'
    },
    {
      name: 'EmployeeID',
      selector: row => row.EmployeeID,
      sortable: true,
      width: '200px'
    },
    {
      name: 'CheckOutDate',
      selector: row => moment(row.CheckOutDate).format('DD/MM/YYYY'),
      sortable: true,
      width: '200px'
    },
    {
      name: 'CheckOutTime',
      selector: row => row.CheckOutTime,
      sortable: true,
      width: '200px'
    },
    {
      name: 'Location',
      selector: row => row.Location,
      sortable: true,
      width: '250px'
    },
    {
      name: 'Model',
      selector: row => row.Model,
      sortable: true,
      width: '200px'
    },
    {
      name: 'Action',
      selector: row =>

        <div class="btn-group" role="group" aria-label="Basic example">
          <button className="btn btn-primary" onClick={() => handleOpenModal(row)}>Detail</button>
        </div>

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

        <Box display="flex">
          <Box sx={{ flexGrow: 2 }} >
            <div class="input-group col-lg-4" >
              <input type="text"
                className="form-control"
                placeholder="Search"
                value={filterText}
                onChange={handleFilter}
              >
              </input>
              <button
                className="btn btn-danger"
                onClick={handleClearFilter}
              >
                Clear
              </button>
            </div>

          </Box>
        </Box>

        <Paper sx={{ p: 1 }} style={{ backgroundColor: '#F2F3F4' }}>
          <div className="card-body" >

            <DataTable
              title="check-out"
              columns={columns}
              //data={items}
              data={filteredData}
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
        {selectedTransaction && (
          <DetailModal
            open={open}
            handleClose={handleCloseModal}
            transaction={selectedTransaction}
          />
        )}
      </DashboardLayout>
    );
  }
}
export default Checkout;