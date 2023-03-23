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
import { Link, useParams } from "react-router-dom";
import moment from "moment/moment";


function DetailNews() {

    const { NewsNo } = useParams();
    const [newsdata, newsdatachange] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5000/news/detail/" + NewsNo)
            .then(res => res.json())
            .then((resp) => {
                newsdatachange(resp);
            }).catch((err) => {
                console.log(err.message);
            })
    }, []);


    return (
        <DashboardLayout>
            <DashboardNavbar />

            <div className="container">

                <div className="card row mb-3" style={{ "textAlign": "center" }}>
                    <div className="card-title">
                        <br></br>
                        <h2>News Detail</h2>
                    </div>
                    <div className="card-body"></div>
                    {newsdata && newsdata.map(val => (
                        <div style={{ textAlign: "left", paddingLeft: "80px" }}>
                            <h2>TopicNews : <b>{val.TopicNews}</b> ({val.NewsNo},{moment(val.NewsDate).format('DD-MM-YYYY')})</h2>
                            <h4>Detail list</h4>
                            <h6>NewsDetail : {val.NewsDetail}</h6>
                            <h6>CreateBy : {val.CreateBy}</h6>
                            <h6>UpdateDate : {moment(val.UpdateDate).format('DD-MM-YYYY HH:mm:ss A')}</h6>
                            <h6>UpdateBy : {val.UpdateBy}</h6>
                            <br></br>

                        </div>
                    ))}
                    <Link className="btn btn-danger" to="/news" >Back to Listing</Link>

                </div>
            </div>

        </DashboardLayout>
    );
}

export default DetailNews;