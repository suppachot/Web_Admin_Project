import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBadge from "components/MDBadge";
import React, { useState } from "react";
import Papa from 'papaparse';
import DataTable from 'react-data-table-component';
import { Axios } from "axios";
import axios from "axios";

function parseCsv(file) {
    return new Promise((resolve, reject) => {
        Papa.parse(file, {
            header: true,
            complete: (results) => {
                resolve(results.data);
            },
            error: (error) => {
                reject(error);
            },
        });
    });
}


function ExportEmp() {
    // 23-3-66 (1)
    const [file, setFile] = useState(null);
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = () => {
        if (!file) return;

        Papa.parse(file, {
            header: true,
            complete: (results) => {
                axios.post("http://103.253.73.66:5000/api/import", results.data)
                    .then(() => alert("Data imported successfully!"))
                    .catch((err) => console.error(err));
            },
        });
       
    };


    //-------import มาแสดงเฉยๆ---------------------------------
    const [data, setData] = useState([]);

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        const parsedData = await parseCsv(file);
        setData(parsedData);
    };

    const columns = [
        {
            id: 'employeeid',
            name: 'EmployeeID',
            selector: row => row.EmployeeID,
            sortable: true,
            width: '115px'
        },
        {
            id: 'title',
            name: 'Title',
            selector: row => row.TitleName,
            sortable: true,
            width: '80px'
        },
        {
            id: 'firstName',
            name: 'FirstName',
            selector: row => row.FirstName,
            sortable: true,
            width: '120px'
        },
        {
            id: 'lastName',
            name: 'LastName',
            selector: row => row.LastName,
            sortable: true,
            width: '120px'
        },
        {
            id: 'phonenumber',
            name: 'Phone',
            selector: row => row.PhoneNumber,
            sortable: true,
            width: '100px'
        },
        {
            id: 'email',
            name: 'Email',
            selector: row => row.Email,
            sortable: true,
            width: '150px'
        },
        {

            id: 'department',
            name: 'Department',
            selector: row => row.DepartmentName,
            sortable: true,
            width: '120px'
        },
        {
            id: 'role',
            name: 'Role',
            width: '120px',
            sortable: true,
            selector: row =>
                <div>
                    <MDBadge badgeContent={row.RoleName} color="success" variant="gradient" size="sm" />

                </div>
        },
        {
            id: 'createdate',
            name: 'CreateDate',
            selector: row => row.CreateDate,
            width: '200px'
        },
        {
            id: 'createby',
            name: 'CreateBy',
            selector: row => row.CreateBy,
            width: '100px'
        },
        {
            id: 'updatedate',
            name: 'UpdateDate',
            selector: row => row.UpdateDate,
            width: '250px'
        },
        {
            id: 'updateby',
            name: 'UpdateBy',
            selector: row => row.UpdateBy,
            width: '150px'
        }

    ];
    //-----------------
    // const [csvData, setCsvData] = useState(null);

    // const handleUpload = (event) => {
    //     const file = event.target.files[0];
    //     Papa.parse(file, {
    //         header: true,
    //         complete: (results) => {
    //             setCsvData(results.data);
    //         },
    //     });
    // };

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <div style={{ textAlign: "center" }}>
                <h1>REACTJS CSV IMPORT EXAMPLE </h1>
                <form  onSubmit={handleUpload}> 
                    {/* <div className="btn">
                        <input
                            type={"file"}
                            id={"csvFileInput"}
                            accept={".csv"}
                            onChange={handleOnChange}
                        />
                        <button
                            className="btn btn-primary"
                            onClick={(e) => {
                                handleOnSubmit(e);
                            }}
                        >
                            IMPORT CSV
                        </button>
                    </div> */}
                    <div className="btn">
                        <input type="file" onChange={handleFileUpload} />
                        {/* <DataTable columns={columns} data={data} /> */}
                        <DataTable
                            title="Employee List"
                            columns={columns}
                            data={data}
                            pagination
                            paginationPerPage={5}
                            paginationRowsPerPageOptions={[10, 15, 25, 50, 100]}
                            paginationComponentOptions={{
                                rowsPerPageText: 'Records per page:',
                                rangeSeparatorText: 'out of',
                            }}
                        />
                        {/* <button
                            className="btn btn-primary"
                            onClick={(e) => {
                                handleOnSubmit(e);
                            }}
                        >
                            IMPORT CSV
                        </button> */}
                        <input type="file" accept=".csv" onChange={handleFileChange} />
                        <button type="submit">Upload</button>
                    </div>
                </form>
            </div>


        </DashboardLayout>
    );
}
export default ExportEmp;
