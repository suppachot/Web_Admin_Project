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
import { Link, useNavigate, useParams } from "react-router-dom";
import { Axios } from "axios";


function EditsNews() {
    const { newsno } = useParams();

    useEffect(() => {
        // Axios.post("http://localhost:5000/updatenews/" + newsno).then((res) => {
        fetch("http://localhost:5000/updatenews/" + newsno).then((res) => {
            return res.json();
        }).then((resp) => {
            setNewsNo(resp.NewsNo);
            setNewsDate(resp.NewsDate);
            setTopicNews(resp.TopicNews);
            setNewsDetail(resp.NewsDetail)
            setCreateBy(resq.CreateBy);
            setUpdateDate(resq.UpdateDate);
            setUpdateBy(resq.UpdateBy);
            valchange(resp.validation);
        }).catch((err) => {
            console.log(err.message);
        })
    }, []);

    const [NewsNo, setNewsNo] = useState("");
    const [NewsDate, setNewsDate] = useState("");
    const [TopicNews, setTopicNews] = useState("");
    const [NewsDetail, setNewsDetail] = useState("");
    const [CreateBy, setCreateBy] = useState("");
    const [UpdateDate, setUpdateDate] = useState("");
    const [UpdateBy, setUpdateBy] = useState("");
    const [active, setactive] = useState(true);
    const [validation, valchange] = useState(false);

    const navigate = useNavigate();

    const handlesubmit = (e) => {
        e.preventDefault();
        Axios.post("http://localhost:5000/updatenews/" + newsno, {
        }).then((res) => {
            alert('Saved successfully.')
            navigate("/editsnews");
        }).catch((err) => {
            console.log(err.message)
        })
    }

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <div className="row">
                <div className="offset-lg-3 col-lg-6">
                    <form className="container" onSubmit={handlesubmit}>

                        <div className="card" style={{ "textAlign": "left" }}>
                            <div className="card-title text-center">
                                <br></br>
                                <h2>News Edit</h2>
                            </div>
                            <div className="card-body">

                                <div className="row">

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>NewsNo</label>
                                            <input value={NewsNo} disabled="disabled" className="form-control"></input>
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>NewsDate</label>
                                            <input required value={NewsDate} type="date" onMouseDown={e => setNewsDate(true)} onChange={e => namechange(e.target.value)} className="form-control"></input>
                                            {NewsDate.length == 0 && validation && <span className="text-danger">Enter Date</span>}
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>TopicNews</label>
                                            <input value={TopicNews} type ="text" onChange={e => setTopicNews(e.target.value)} className="form-control"></input>
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>CreateBy</label>
                                            <input value={CreateBy}  type ="text"  onChange={e => setCreateBy(e.target.value)} className="form-control"></input>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>UpdateDate</label>
                                            <input value={UpdateDate} type="datetime-local" onChange={e => setUpdateDate(e.target.value)} className="form-control"></input>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>UpdateBy</label>
                                            <input value={UpdateBy} type ="text"  onChange={e => setUpdateBy(e.target.value)} className="form-control"></input>
                                        </div>
                                    </div>

                                    {/* <div className="col-lg-12">
                                    <div className="form-check">
                                    <input checked={active} onChange={e=>activechange(e.target.checked)} type="checkbox" className="form-check-input"></input>
                                        <label  className="form-check-label">Is Active</label>
                                        
                                    </div>
                                </div> */}
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <br></br>
                                            <Link to="/news" className="btn btn-danger">Back</Link>
                                            <Link to='/news' className="btn btn-success" type="submit">Save</Link>
                                            
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </form>

                </div>
            </div>
        </DashboardLayout>
    );

}

export default EditsNews;