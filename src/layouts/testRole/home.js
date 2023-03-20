
// // @mui material components
// import Grid from "@mui/material/Grid";
// import Card from "@mui/material/Card";

// // Material Dashboard 2 React components
// import MDBox from "components/MDBox";
// import MDBadge from "components/MDBadge";
// import MDTypography from "components/MDTypography";

// // Material Dashboard 2 React example components
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// import Axios from "axios";
// import { useState, useEffect } from "react";
// import DataTable from 'react-data-table-component';
// import { Button, Modal } from '@mui/material';
// import { Link, useNavigate } from 'react-router-dom';
// import { CSVLink, CSVDownload } from "react-csv";

// import * as React from 'react';
// import PropTypes from 'prop-types';
// import { useTheme } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableFooter from '@mui/material/TableFooter';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import IconButton from '@mui/material/IconButton';
// import FirstPageIcon from '@mui/icons-material/FirstPage';
// import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
// import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
// import LastPageIcon from '@mui/icons-material/LastPage';

// function TablePaginationActions(props) {
//     const theme = useTheme();
//     const { count, page, rowsPerPage, onPageChange } = props;

//     const handleFirstPageButtonClick = (event) => {
//         onPageChange(event, 0);
//     };

//     const handleBackButtonClick = (event) => {
//         onPageChange(event, page - 1);
//     };

//     const handleNextButtonClick = (event) => {
//         onPageChange(event, page + 1);
//     };

//     const handleLastPageButtonClick = (event) => {
//         onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
//     };

//     return (
//         <Box sx={{ flexShrink: 0, ml: 2.5 }}>
//             <IconButton
//                 onClick={handleFirstPageButtonClick}
//                 disabled={page === 0}
//                 aria-label="first page"
//             >
//                 {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
//             </IconButton>
//             <IconButton
//                 onClick={handleBackButtonClick}
//                 disabled={page === 0}
//                 aria-label="previous page"
//             >
//                 {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
//             </IconButton>
//             <IconButton
//                 onClick={handleNextButtonClick}
//                 disabled={page >= Math.ceil(count / rowsPerPage) - 1}
//                 aria-label="next page"
//             >
//                 {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
//             </IconButton>
//             <IconButton
//                 onClick={handleLastPageButtonClick}
//                 disabled={page >= Math.ceil(count / rowsPerPage) - 1}
//                 aria-label="last page"
//             >
//                 {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
//             </IconButton>
//         </Box>
//     );
// }

// TablePaginationActions.propTypes = {
//     count: PropTypes.number.isRequired,
//     onPageChange: PropTypes.func.isRequired,
//     page: PropTypes.number.isRequired,
//     rowsPerPage: PropTypes.number.isRequired,
// };

// function createData(name, calories, fat) {
//     return { name, calories, fat };
// }

// const rows = [
//     createData('Cupcake', 305, 3.7),
//     createData('Donut', 452, 25.0),
//     createData('Eclair', 262, 16.0),
//     createData('Frozen yoghurt', 159, 6.0),
//     createData('Gingerbread', 356, 16.0),
//     createData('Honeycomb', 408, 3.2),
//     createData('Ice cream sandwich', 237, 9.0),
//     createData('Jelly Bean', 375, 0.0),
//     createData('KitKat', 518, 26.0),
//     createData('Lollipop', 392, 0.2),
//     createData('Marshmallow', 318, 0),
//     createData('Nougat', 360, 19.0),
//     createData('Oreo', 437, 18.0),
// ].sort((a, b) => (a.calories < b.calories ? -1 : 1));


// function HomeR() {

//     const [page, setPage] = React.useState(0);
//     const [rowsPerPage, setRowsPerPage] = React.useState(5);

//     // Avoid a layout jump when reaching the last page with empty rows.
//     const emptyRows =
//         page > 0 ? Math.max(0, (1 + page) * rowsPerPage - items.length) : 0;

//     const handleChangePage = (event, newPage) => {
//         setPage(newPage);
//     };

//     const handleChangeRowsPerPage = (event) => {
//         setRowsPerPage(parseInt(event.target.value, 10));
//         setPage(0);
//     };

//     const [error, setError] = useState(null);
//     const [isLoaded, setIsLoaded] = useState(false);
//     const [items, setItems] = useState([]);

//     useEffect(() => {
//         fetch("http://localhost:5000/employee")
//             .then(res => res.json())
//             .then(
//                 (result) => {
//                     setIsLoaded(true);
//                     setItems(result);
//                     console.log(result);
//                 },
//                 (error) => {
//                     setIsLoaded(true);
//                     setError(error);
//                 })
//             .catch((err) => {
//                 console.log(err.message);
//             })

//     }, [])

//     return (
//         <DashboardLayout>
//             <DashboardNavbar />
//             <TableContainer component={Paper}>
//                 <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
//                     <TableHead>
//                         <TableRow>
//                             <TableCell align="right">EmployeeID</TableCell>
//                             <TableCell align="right">Title</TableCell>
//                             <TableCell align="right">FirstName</TableCell>
//                             <TableCell align="right">LastName</TableCell>
//                             <TableCell align="right">PhoneNumber</TableCell>
//                             <TableCell align="right">Email</TableCell>
//                             <TableCell align="right">Department</TableCell>
//                             <TableCell align="right">Role</TableCell>
//                             <TableCell align="right">Action</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {(rowsPerPage > 0
//                             ? items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                             : items
//                         ).map((row) => (
//                             <TableRow key={row.name}>
//                                 <TableCell component="th" scope="row">{row.EmployeeID}</TableCell>
//                                 <TableCell align="right">{row.TitleName}</TableCell>
//                                 <TableCell align="right">{row.FirstName}</TableCell>
//                                 <TableCell align="right">{row.LastName}</TableCell>
//                                 <TableCell align="right">{row.PhoneNumber}</TableCell>
//                                 <TableCell align="right">{row.Email}</TableCell>
//                                 <TableCell align="right">{row.DepartmentName}</TableCell>
//                                 <TableCell align="right">{row.Role}</TableCell>
//                                 <button className="btn btn-warning" onClick={() => { LoadEdit(row.EmployeeID) }} >Edit</button>
//                             </TableRow>
//                         ))}
//                     </TableBody>

//                     <TableFooter>
//                         <TableRow>
//                             <TablePagination
//                                 rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
//                                 colSpan={3}
//                                 count={items.length}
//                                 rowsPerPage={rowsPerPage}
//                                 page={page}
//                                 SelectProps={{
//                                     inputProps: {
//                                         'aria-label': 'rows per page',
//                                     },
//                                     native: true,
//                                 }}
//                                 onPageChange={handleChangePage}
//                                 onRowsPerPageChange={handleChangeRowsPerPage}
//                                 ActionsComponent={TablePaginationActions}
//                             />
//                         </TableRow>
//                     </TableFooter>
//                 </Table>
//             </TableContainer>
//         </DashboardLayout>

//     );

// }
// export default HomeR;



//------------------------------------------------------------------//

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
import { Modal } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { CSVLink, CSVDownload } from "react-csv";

import * as React from 'react';
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

function HomeR() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/employee")
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
                })
            .catch((err) => {
                console.log(err.message);
            })

    }, [])
    return (
        <DashboardLayout>
            <DashboardNavbar />

            <React.Fragment>
                <CssBaseline />
                <Container maxWidth="lg" sx={{ p: 2 }}>
                    <Paper sx={{ p: 2 }}>
                        <Box display="flex">
                            <Box sx={{ flexGrow: 1 }}>
                                <Typography variant="h6" gutterBottom component="div" >
                                    Emplotees list
                                </Typography>
                            </Box>
                            <Box>
                                <Button variant="contained">Create</Button>
                                <Link to="/addEmpolyee" className="btn btn-success">Add New</Link>
                            </Box>
                        </Box>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 550 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell >EmployeeID</TableCell>
                                        <TableCell >Title</TableCell>
                                        <TableCell >FirstName</TableCell>
                                        <TableCell >LastName</TableCell>
                                        <TableCell >PhoneNumber</TableCell>
                                        <TableCell >Email</TableCell>
                                        <TableCell >Department</TableCell>
                                        <TableCell >Role</TableCell>
                                        <TableCell >Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {items.map((row) => (
                                        <TableRow>
                                            {/* <TableCell component="th" scope="row">{row.EmployeeID}</TableCell> */}
                                            <TableCell>{row.EmployeeID}</TableCell>
                                            <TableCell >{row.TitleName}</TableCell>
                                            <TableCell >{row.TitleName}</TableCell>
                                            <TableCell >{row.FirstName}</TableCell>
                                            <TableCell >{row.LastName}</TableCell>
                                            <TableCell >{row.PhoneNumber}</TableCell>
                                            <TableCell >{row.Email}</TableCell>
                                            <TableCell >{row.DepartmentName}</TableCell>
                                            <TableCell >{row.Role}</TableCell>
                                            <button className="btn btn-warning" onClick={() => { LoadEdit(row.EmployeeID) }} >Edit</button>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Container>
            </React.Fragment>
        </DashboardLayout>

    );
}
export default HomeR;

