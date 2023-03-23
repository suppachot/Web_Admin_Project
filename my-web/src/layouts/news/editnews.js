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
    const { NewsNo } = useParams();
    const [newsdata, newsdatachange] = useState(null);

    useEffect(() => {
        // Axios.get("http://localhost:5000/updatenews/" + newsno).then((res) => {
        fetch("http://localhost:5000/news/editdetail/" + NewsNo)
            .then(res => res.json())
            .then((resp) => {
                newsdatachange(resp);
            }).then((resp) => {
                //setNewsNo(resp.NewsNo);
                setNewsDate(resp.NewsDate);
                setTopicNews(resp.TopicNews);
                setNewsDetail(resp.NewsDetail);
                setCreateBy(resq.CreateBy);
                setUpdateDate(resq.UpdateDate);
                setUpdateBy(resq.UpdateBy);
                valchange(resp.validation);
            }).catch((err) => {
                console.log(err.message);
            })
    }, []);

    // useEffect(() => {
    //     fetch("http://localhost:5000/news/edit/" + NewsNo)
    //         .then(res => res.json())
    //         .then((resp) => {
    //             newsdatachange(resp);
    //         }).catch((err) => {
    //             console.log(err.message);
    //         })
    // }, []);

    //const [NewsNo, setNewsNo] = useState("");
    const [NewsDate, setNewsDate] = useState("");
    const [TopicNews, setTopicNews] = useState("");
    const [NewsDetail, setNewsDetail] = useState("");
    const [CreateBy, setCreateBy] = useState("");
    const [UpdateDate, setUpdateDate] = useState("");
    const [UpdateBy, setUpdateBy] = useState("");
    const [active, setactive] = useState(true);
    const [validation, valchange] = useState(false);

    const navigate = useNavigate();

    const [new_NewsDate, setnew_NewsDate] = useState("");
    const [new_TopicNews, setnew_TopicNews] = useState("");
    const [new_NewsDetail, setnew_NewsDetail] = useState("");
    const [new_UpdateDate, setnew_UpdateDate] = useState("");
    const [new_UpdateBy, setnew_UpdateBy] = useState("");

    const handlesubmit = (e) => {
        e.preventDefault();
        Axios.put("http://localhost:5000/news/edit/" + NewsNo, {
            NewsNo: NewsNo,
            NewsDate: NewsDate,
            TopicNews: TopicNews,
            NewsDetail: NewsDetail,
            CreateBy: CreateBy,
            UpdateDate: UpdateDate,
            UpdateBy: UpdateBy
            // NewsDate: new_NewsDate,
            // TopicNews: new_TopicNews,
            // NewsDetail: new_NewsDetail,
            // CreateBy: CreateBy,
            // UpdateDate: new_UpdateDate,
            // UpdateBy: new_UpdateBy
        }).then((res) => {
            alert('Saved successfully.')
            navigate('/news/');
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
                                {newsdata && newsdata.map(val => (
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <label>NewsNo</label>
                                                <input value={val.NewsNo}
                                                    disabled="disabled"
                                                    // onChange={e => setNewsNo(e.target.value)}
                                                    className="form-control">
                                                </input>
                                            </div>
                                        </div>

                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <label>NewsDate</label>
                                                <input required value={val.NewsDate}
                                                    type="text-local"
                                                    onChange={e => setNewsDate(e.target.value)}
                                                    className="form-control">
                                                </input>
                                                {NewsDate.length == 0 && validation && <span className="text-danger">Enter Date</span>}
                                            </div>
                                        </div>

                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <label>TopicNews</label>
                                                <input value={val.TopicNews}
                                                    type="text"
                                                    onChange={e => setTopicNews(e.target.value)}
                                                    className="form-control">
                                                </input>
                                            </div>
                                        </div>

                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <label>NewsDetail</label>
                                                <textarea value={val.NewsDetail}
                                                    type="text"
                                                    onChange={e => setNewsDetail(e.target.value)}
                                                    className="form-control">
                                                </textarea>
                                            </div>
                                        </div>

                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <label>CreateBy</label>
                                                <input value={val.CreateBy}
                                                    type="text"
                                                    disabled="disabled"
                                                    //onChange={e => setCreateBy(e.target.value)}
                                                    className="form-control">
                                                </input>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <label>UpdateDate</label>
                                                <input value={val.UpdateDate}
                                                    type="datetime-local"
                                                    onChange={e => setUpdateDate(e.target.value)}
                                                    className="form-control">
                                                </input>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <label>UpdateBy</label>
                                                <input value={val.UpdateBy}
                                                    type="text"
                                                    onChange={e => setUpdateBy(e.target.value)}
                                                    className="form-control">
                                                </input>
                                            </div>
                                        </div>

                                        {/* <div className="col-lg-12">
                                        <div className="form-check">
                                            <input checked={active} onChange={e=>activechange(e.target.checked)} 
                                                type="checkbox" className="form-check-input">
                                            </input>
                                            <label  className="form-check-label">Is Active</label>
                                        </div>
                                    </div> */}

                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <br></br>
                                                <Link to="/news" className="btn btn-danger">Back</Link>
                                                <button className="btn btn-success" type="submit" >Save</button>
                                                {/* <Link to='/news' className="btn btn-success" type="submit">Save</Link>  */}
                                                {/* <button className="btn btn-success" onClick={() => { handlesubmit(e.target.NewsNo) }} >Save</button> */}

                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>

                    </form>
                </div>
            </div>
        </DashboardLayout>
    );

}

export default EditsNews;