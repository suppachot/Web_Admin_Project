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
import DataTable from 'react-data-table-component';

function News() {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  const [newsdata, newsdatachange] = useState(null);
  const navigate = useNavigate();

  const LoadDetail = (NewsNo) => {
    navigate("/news/detail/" + NewsNo);
  }
  const LoadEdit = (NewsNo) => {
    navigate("/news/edit/" + NewsNo);
  }
  const LoadEdit2 = (NewsNo) => {
    navigate("/news/edit2/" + NewsNo);
  }
  const Removefunction = (NewsNo) => {
    if (window.confirm('Do you want to remove?')) {
      Axios.delete("http://localhost:5000/deletenews/" + NewsNo, {
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
      id: 'newsNo',
      name: 'NewsNo',
      selector: row => row.NewsNo,
      width: '100px'
    },
    {
      id: 'newsDate',
      name: 'NewsDate',
      selector: row => row.NewsDate,
      width: '250px'
    },
    {
      id: 'topicNews',
      name: 'TopicNews',
      selector: row => row.TopicNews,
      width: '300px'
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
        width: '250px'
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

          <button className="btn btn-primary" onClick={() => { LoadDetail(row.NewsNo) }} >Detail</button>
          <button className="btn btn-warning" onClick={() => { LoadEdit2(row.NewsNo) }} >Edit</button>
          <button className="btn btn-danger" onClick={() => { Removefunction(row.NewsNo) }} >Delete</button>

        </div>

    }
  ];

  useEffect(() => {
    fetch("http://localhost:5000/news")
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
              <div className="btn" >
                <Link to="/addEmpolyee" className="btn btn-success">Add New</Link>
              </div>
            </div>
            <DataTable
              title="News"
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
        </div>
      </DashboardLayout>
    );
  }
}
export default News;