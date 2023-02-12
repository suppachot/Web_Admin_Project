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

function News() {

  const [newsdata, newsdatachange] = useState(null);


  useEffect(() => {
    fetch("http://localhost:5000/news").then((res) => {
      return res.json();
    }).then((resp) => {
      newsdatachange(resp);
    }).catch((err) => {
      console.log(err.message);
    })
  }, [])
  /*
    useEffect(() => {
      fetch("http://localhost:5000/news")
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
  */
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div className="LayoutContainer">
        <div className="card">
          <div className="card-title ">
            <h2>News</h2>
          </div>
          <div className="card-body">
            <div className="btn">
              <Link to="/news/create" className="btn btn-success">Add New</Link>
            </div>
            <table className="table table-bordered">
              <thead className="bg-dark text-white">
                <tr>
                  <td>NewsNo</td>
                  <td>NewsDate</td>
                  <td>NewsDetail</td>
                  <td>CreateBy</td>
                  <td>UpdateDate</td>
                  <td>UpdateBy</td>
                  <td>Action</td>
                </tr>
              </thead>
              <tbody>
                {newsdata &&
                  newsdata.map(item => (
                    <tr key={item.NewsNo}>
                      <td>{item.NewsNo}</td>
                      <td>{item.NewsDate}</td>
                      <td>{item.NewsDetail}</td>
                      <td>{item.CreateBy}</td>
                      <td>{item.UpdateDate}</td>
                      <td>{item.UpdateBy}</td>
                      <td><a onClick={() => { LoadEdit(item.NewsNo) }} className="btn btn-success">Edit</a>
                        <a onClick={() => { Removefunction(item.NewsNo) }} className="btn btn-danger">Remove</a>
                        <a onClick={() => { LoadDetail(item.NewsNo) }} className="btn btn-primary">Details</a>
                      </td>
                    </tr>
                  ))
                }
              </tbody>

            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
export default News;