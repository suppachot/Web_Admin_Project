// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { Box } from "@mui/material";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import jwtDecode from "jwt-decode";
import Swal from 'sweetalert2';

function CreateNews() {
  const [NewsDate, setNewsDate] = useState("");
  const [TopicNews, setTopicNews] = useState("");
  const [NewsDetail, setNewsDetail] = useState("");
  const [CreateBy, setCreateBy] = useState("");
  const [UpdateDate, setUpdateDate] = useState("");
  const [UpdateBy, setUpdateBy] = useState("");
  const [active, setactive] = useState(true);
  const [validation, valchange] = useState(false);
  const [Pin, setPin] = useState(false);

  const navigate = useNavigate();

  const [newsList, setNewsList] = useState([]);
  const getNews = () => {
    Axios.get('http://103.253.73.66:5001/news').then((response) => {
      setNewsList(response.data);
    });
  }
  const token = localStorage.getItem("jwt");
  const decodedToken = jwtDecode(token);
  const { emp, firstName, lastName } = decodedToken;

  useEffect(() => {
    const moment = require('moment-timezone');
    const date = new Date();
    const timezone = 'Asia/Bangkok'; // ตามที่ต้องการ
    const formattedDate = moment(date).tz(timezone).format('YYYY-MM-DDTHH:mm:ss');
    const formattedDatee = moment(date).tz(timezone).format('YYYY-MM-DD');
    const username = emp; // แก้ไขเป็นชื่อผู้ใช้จริงที่ต้องการใช้งาน
    setCreateBy(username);
    setNewsDate(formattedDatee);
    setUpdateDate(formattedDate);
    setUpdateBy(username);
  }, []);
  const handlesubmit = (e) => {
    e.preventDefault();
    Axios.post("http://103.253.73.66:5001/createnews", {
      NewsDate: NewsDate,
      TopicNews: TopicNews,
      NewsDetail: NewsDetail,
      Pin: Pin ? 1 : 0,
      CreateBy: CreateBy,
      UpdateDate: UpdateDate,
      UpdateBy: UpdateBy
    }).then((res) => {
      Swal.fire({
        title: 'Saved successfully.',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        navigate('/news');
      });
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
              <div className="card-body">
                <div className="row">



                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>NewsDate</label>
                      <input
                        required value={NewsDate}
                        type="date"
                        onChange={e => setNewsDate(e.target.value)}
                        className="form-control">

                      </input>
                      {NewsDate.length == 0 && validation && <span className="text-danger">กรุณาเลือกวันที่</span>}
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>TopicNews</label>
                      <input required value={TopicNews}
                        onMouseDown={e => valchange(true)} type="text"
                        onChange={e => setTopicNews(e.target.value)}
                        className="form-control">
                      </input>
                      {TopicNews.length == 0 && validation && <span className="text-danger">กรุณากรอกหัวข้อข่าวสาร !</span>}
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>NewsDetail</label>
                      <textarea value={NewsDetail}
                        type="text"
                        onChange={e => setNewsDetail(e.target.value)}
                        className="form-control" style={{ height: '150px' }}>
                      </textarea>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <div>
                        <label>Pin the news</label>
                        <input type="checkbox" checked={Pin} onChange={() => setPin(!Pin)} />
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>CreateBy</label>
                      <input value={CreateBy}
                        type="text"
                        onChange={e => setCreateBy(e.target.value)}
                        className="form-control">

                      </input>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>UpdateDate</label>
                      <input value={UpdateDate}
                        type="datetime-local"
                        onChange={e => setUpdateDate(e.target.value)}
                        className="form-control">

                      </input>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>UpdateBy</label>
                      <input value={UpdateBy}
                        type="text"
                        onChange={e => setUpdateBy(e.target.value)}
                        className="form-control">

                      </input>
                    </div>
                  </div>

                  <Box display="flex">
                    <Box sx={{ flexGrow: 4 }}>
                      <div className="card-body col-lg-4" >
                        <Link to="/news" className="btn btn-danger">Back</Link>
                      </div>
                    </Box>
                    <Box>
                      <div className="card-body col-lg-4" >
                        <button className="btn btn-success" type="submit">Save</button>
                      </div>
                    </Box>
                  </Box>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

    </DashboardLayout>
  );
}
export default CreateNews;