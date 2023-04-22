// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import moment from "moment/moment";
import Typography from '@mui/material/Typography';

function DetailNews() {

    const { NewsNo } = useParams();
    const [newsdata, newsdatachange] = useState(null);

    useEffect(() => {
        fetch("http://103.253.73.66:5000/news/detail/" + NewsNo)
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
                <div className="card row mb-3" >
                    <div className="card-title" style={{paddingLeft :"30px"}}>
                        <br></br>
                        <h4>News Detail</h4>
                    </div>
                    <div className="card-body" ></div>
                    {newsdata && newsdata.map(val => (
                        <Grid container spacing={2} style={{paddingLeft :"100px",paddingRight:"50px"}}>
                            <Grid item xs={2}>
                                <MDTypography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                    Topic :
                                </MDTypography>
                            </Grid>
                            <Grid item xs={10}>
                                <Typography variant="subtitle1">{val.TopicNews}</Typography>
                            </Grid>

                            <Grid item xs={2}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                    Date :
                                </Typography>
                            </Grid>
                            <Grid item xs={10}>
                                <Typography variant="subtitle1">
                                    {moment(val.NewsDate).format('DD/MM/YYYY')}
                                </Typography>
                            </Grid>

                            <Grid item xs={2}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                    Detail :
                                </Typography>
                            </Grid>
                            <Grid item xs={10}>
                                <Typography variant="body1">{val.NewsDetail}</Typography>
                            </Grid>

                            <Grid item xs={2}>
                                <Typography variant="subtitle1" sx={{
                                    fontWeight: 'bold'
                                }}>
                                    CreateBy :
                                </Typography>
                            </Grid>
                            <Grid item xs={10}>
                                <Typography variant="subtitle1">{val.CreateBy}</Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                    UpdateDate :
                                </Typography>
                            </Grid>
                            <Grid item xs={10}>
                                <Typography variant="subtitle1">
                                    {moment(val.UpdateDate).format('DD/MM/YYYY HH:mm:ss A')}
                                </Typography>
                            </Grid>

                            <Grid item xs={2}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                    UpdateBy :
                                </Typography>
                            </Grid>
                            <Grid item xs={10}>
                                <Typography variant="subtitle1">{val.UpdateBy}</Typography>
                            </Grid>
                        </Grid>
                    ))}
                    <br></br>
                    <Link className="btn btn-danger" to="/news" >Back</Link>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default DetailNews;