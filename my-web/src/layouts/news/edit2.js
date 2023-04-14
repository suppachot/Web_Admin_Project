// // @mui material components
// import Grid from "@mui/material/Grid";
// import Card from "@mui/material/Card";

// // Material Dashboard 2 React components
// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";

// // Material Dashboard 2 React example components
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Axios from "axios";
// import { useParams } from 'react-router-dom';

// function Add() {
//     const{newsNo}=useParams();
//   const [NewsNo, setNewsNo] = useState("");
//   const [NewsDate, setNewsDate] = useState("");
//   const [TopicNews, setTopicNews] = useState("");
//   const [NewsDetail, setNewsDetail] = useState("");
//   const [CreateBy, setCreateBy] = useState("");
//   const [UpdateDate, setUpdateDate] = useState("");
//   const [UpdateBy, setUpdateBy] = useState("");
//   const [active, setactive] = useState(true);
//   const [validation, valchange] = useState(false);

//   const navigate = useNavigate();

//   const [newsList, setNewsList] = useState([]);
//   const getNews = () => {
//     Axios.get('http://localhost:5000/news'+newsNo).then((response) => {
//       setNewsList(response.data);
//     });
//   }
//   useEffect(() => {
//     fetch("http://localhost:5000/news/"+newsNo).then((res) => {
//       return res.json();
//     }).then((resp) => {
//         setNewsList(resp);
//     }).catch((err) => {
//       console.log(err.message);
//     })
//   }, [])
  
//   const handlesubmit = (e) => {
//     e.preventDefault();
//     Axios.put("http://localhost:5000/news/edit2/"+NewsNo, {
//       //NewsNo: NewsNo,
//       NewsDate: NewsDate,
//       TopicNews: TopicNews,
//       NewsDetail: NewsDetail,
//       CreateBy: CreateBy,
//       UpdateDate: UpdateDate,
//       UpdateBy: UpdateBy
//     }).then((res) => {
//       alert('Saved successfully.')
//       navigate('/news');
//     }).catch((err) => {
//       console.log(err.message)
//     })
//   }

//   return (
//     <DashboardLayout>
//       <DashboardNavbar />
//       no respose
//       <div className="row">
//         <div className="offset-lg-3 col-lg-6">
//           <form className="container" onSubmit={handlesubmit}>
//             <div className="card" style={{ "textAlign": "left" }}>
//               <div className="card-body">
//                 <div className="row">
             
//                   <div className="col-lg-12">
                 
//                     <div className="form-group">
//                       <label>NewsNo</label>
//                       <input
//                         required value={NewsNo}
//                         type="text"
//                         onChange={e => setNewsNo(e.target.value)}
//                         className="form-control"></input>
//                     </div>
                  
//                   </div>

//                   <div className="col-lg-12">
//                     <div className="form-group">
//                       <label>NewsDate</label>
//                       <input
//                         required value={NewsDate}
//                         type="date"
//                         onChange={e => setNewsDate(e.target.value)}
//                         className="form-control">

//                       </input>
//                       {NewsDate.length == 0 && validation && <span className="text-danger">Enter the date</span>}
//                     </div>
//                   </div>

//                   <div className="col-lg-12">
//                     <div className="form-group">
//                       <label>TopicNews</label>
//                       <input required value={TopicNews}
//                         onMouseDown={e => valchange(true)} type="text"
//                         onChange={e => setTopicNews(e.target.value)}
//                         className="form-control">

//                       </input>
//                       {TopicNews.length == 0 && validation && <span className="text-danger">Enter the topic news</span>}
//                     </div>
//                   </div>

//                   <div className="col-lg-12">
//                     <div className="form-group">
//                       <label>NewsDetail</label>
//                       <textarea value={NewsDetail}
//                         type="text"
//                         onChange={e => setNewsDetail(e.target.value)}
//                         className="form-control"></textarea>
//                     </div>
//                   </div>

//                   <div className="col-lg-12">
//                     <div className="form-group">
//                       <label>CreateBy</label>
//                       <input value={CreateBy}
//                         type="text"
//                         onChange={e => setCreateBy(e.target.value)}
//                         className="form-control">

//                       </input>
//                     </div>
//                   </div>

//                   <div className="col-lg-12">
//                     <div className="form-group">
//                       <label>UpdateDate</label>
//                       <input value={UpdateDate}
//                         type="datetime-local"
//                         onChange={e => setUpdateDate(e.target.value)}
//                         className="form-control">

//                       </input>
//                     </div>
//                   </div>

//                   <div className="col-lg-12">
//                     <div className="form-group">
//                       <label>UpdateBy</label>
//                       <input value={UpdateBy}
//                         type="text"
//                         onChange={e => setUpdateBy(e.target.value)}
//                         className="form-control">

//                       </input>
//                     </div>
//                   </div>

//                   {/* <div className="col-lg-12">
//                     <div className="form-check">
//                       <input checked={active} onChange={e => setactive(e.target.checked)} type="checkbox" className="form-check-input"></input>
//                       <label className="form-check-label">Is Active</label>
//                     </div>
//                   </div> */}

//                   <div className="col-lg-12">
//                     <div className="form-group ">
//                       <br></br>
//                       <Link to="/news" className="btn btn-danger">Back</Link>
//                       <button className="btn btn-success" type="submit">Save</button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>

//     </DashboardLayout>
//   );
// }
// export default Add;