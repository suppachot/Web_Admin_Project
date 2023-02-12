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


function DetailNews() {

    const { NewsNo } = useParams();
    const [newsdata, newsdatachange] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5000/news/" + NewsNo).then((res) => {
            return res.json();
        }).then((resp) => {
            newsdatachange(resp);
        }).catch((err) => {
            console.log(err.message);
        })
    }, []);
    

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <div className="container">

                <div className="card row" style={{ "textAlign": "left" }}>
                    <div className="card-title">
                        <h2>News Detail</h2>
                    </div>
                    <div className="card-body"></div>
                    {newsdata &&
                        <div>
                            <h2>TopicNews : <b>{newsdata.TopicNews}</b> ({newsdata.NewsNo},{newsdata.NewsDate})</h2>
                            <h4>Detail list</h4>
                            <h6>Detail : {newsdata.NewsDetail}</h6>
                            <h6>Email is : {newsdata.CreateBy}</h6>
                            <h6>UpdateDate : {newsdata.UpdateDate}</h6>
                            <h6>UpdateBy : {newsdata.UpdateBy}</h6>
                            <Link className="btn btn-danger" to="/news" >Back to Listing</Link>
                        </div>
                    }
                </div>
            </div>

        </DashboardLayout>
    );
}

export default DetailNews;