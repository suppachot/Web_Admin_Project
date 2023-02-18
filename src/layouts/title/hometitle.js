
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
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';



function HomeTitle() {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    const [titledata, titledatachange] = useState(null);
    const navigate = useNavigate();
    
    const LoadDetail = (TitleID) => {
        navigate("/title/detail/" + TitleID);
    }
    const LoadEdit = (TitleID) => {
        navigate("/title/edit/" + TitleID);
    }
    const Removefunction = (TitleID) => {
        if (window.confirm('Do you want to remove?')) {
            Axios.delete("http://localhost:5000/deletetitle/" + TitleID, {
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
            id: 'titleID',
            name: 'TitleID',
            selector: row => row.TitleID,
            width: '100px'
        },
        {
            id: 'title',
            name: 'Title',
            selector: row => row.TitleName,
            width: '100px'
        },
        {
            id: 'titleName',
            name: 'TitleName',
            selector: row => row.TitleName,
            width: '100px'
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
            width: '150px'
        },
        {
            id: 'updatedate',
            name: 'UpdateDate',
            selector: row => row.UpdateDate,
            width: '200px'
        },
        {
            id: 'updateby',
            name: 'UpdateBy',
            selector: row => row.UpdateBy,
            width: '150px'
        },
        {
            name: 'Action',
            selector: row =>
            
                <div class="btn-group" role="group" aria-label="Basic example">

                    <button className="btn btn-primary" onClick={(clickHandler) => { LoadDetail(row.TitleID) }} >Detail</button>
                    <button className="btn btn-warning" onClick={() => { LoadEdit(row.TitleID) }} >Edit</button>
                    <button className="btn btn-danger" onClick={() => { Removefunction(row.TitleID) }} >Delete</button>

                </div>
            
        }

    ];
   
    useEffect(() => {
        fetch("http://localhost:5000/title")
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
                titledatachange(resp);
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
                            <Link to="/addTitle" className="btn btn-success">Add New</Link>
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
export default HomeTitle;