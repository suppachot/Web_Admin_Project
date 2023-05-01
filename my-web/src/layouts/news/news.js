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
import Axios from "axios";
import DataTable from 'react-data-table-component';
import moment from "moment/moment";
import CreateNews from './createnews';
import { Paper } from "@mui/material";
import Swal from "sweetalert2";
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-35%, -50%)',
//   width: 1000,
//   bgcolor: 'background.paper',
//   boxShadow: 24,
//   p: 4,
//   borderRadius: '20px',
// };

// const DetailModal = ({ opennews, handleClose, news }) => {
//   return (
//     <Modal
//       open={opennews}
//       onClose={handleClose}
//       aria-labelledby="modal-modal-title"
//       aria-describedby="modal-modal-description"
//     >
//       <MDBox sx={style}>
//         <IconButton
//           onClick={handleClose}
//           sx={{
//             position: 'absolute',
//             right: '5px',
//             top: '5px',
//             color: 'grey.500',
//           }}
//         >
//           <CloseIcon />
//         </IconButton>
//         <MDTypography
//           variant="h6"
//           component="h2"
//           sx={{ marginBottom: '15px' }}
//         >
//           Booking Detail
//         </MDTypography>

//         <Grid item xs={3}>
//           <MDTypography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
//             Topic : {news.TopicNews}
//           </MDTypography>
//           <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
//             Date  :
//           </Typography>
//           <Typography variant="body1">{moment(news.NewsDate).format('DD/MM/YYYY')}</Typography>
//           <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
//             Detail  :
//           </Typography>
//           <Typography variant="body1">{news.NewsDetail}</Typography>
//           <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
//             CreateBy   :
//           </Typography>
//           <Typography variant="body1">{news.CreateBy}</Typography>
//           <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
//             UpdateDate  :
//           </Typography>
//           <Typography variant="body1">
//             {moment(news.UpdateDate).format('DD/MM/YYYY HH:mm:ss A')}
//           </Typography>
//           <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
//             UpdateBy   :
//           </Typography>
//           <Typography variant="body1">{news.UpdateBy}</Typography>
//         </Grid>

//         <div class="modal-footer">
//           <button
//             type="button"
//             class="btn btn-danger"
//             onClick={handleClose}
//             data-dismiss="modal"
//             sx={{
//               marginTop: '15px',
//               marginLeft: 'auto',
//               display: 'block',
//             }}
//           >
//             Close
//           </button>
//         </div>
//       </MDBox>
//     </Modal>
//   );
// };
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-40%, -40%)',
  width: '80%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '20px',
};

const DetailModal = ({ opennews, handleClose, news }) => {
  return (
    <Modal
      open={opennews}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <MDBox sx={style}>
        <IconButton
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: '5px',
            top: '5px',
            color: 'grey.500',
          }}
        >
          <CloseIcon />
        </IconButton>
        <MDTypography
          variant="h4"
          component="h2"
          sx={{ marginBottom: '15px' }}
        >
          Booking Detail
        </MDTypography>

        <Grid container spacing={2}>
          <Grid item xs={2}>
            <MDTypography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              Topic:
            </MDTypography>
          </Grid>
          <Grid item xs={10}>
            <Typography variant="subtitle1">{news.TopicNews}</Typography>
          </Grid>

          <Grid item xs={2}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              Date:
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <Typography variant="subtitle1">
              {moment(news.NewsDate).format('DD/MM/YYYY')}
            </Typography>
          </Grid>

          <Grid item xs={2}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              Detail:
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <Typography variant="body1">{news.NewsDetail}</Typography>
          </Grid>

          <Grid item xs={2}>
            <Typography variant="subtitle1" sx={{
              fontWeight: 'bold'
            }}>
              CreateBy:
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <Typography variant="subtitle1">{news.CreateBy}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              UpdateDate:
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <Typography variant="subtitle1">
              {moment(news.UpdateDate).format('DD/MM/YYYY HH:mm:ss A')}
            </Typography>
          </Grid>

          <Grid item xs={2}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              UpdateBy:
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <Typography variant="subtitle1">{news.UpdateBy}</Typography>
          </Grid>
        </Grid>

        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-danger"
            onClick={handleClose}
            data-dismiss="modal"
            sx={{
              marginTop: '15px',
              marginLeft: 'auto',
              display: 'block',
            }}
          >
            Close
          </button>
        </div>
      </MDBox>
    </Modal >

  );
};


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

  const Removefunction = (NewsNo) => {
    Swal.fire({
      title: 'Do you want to remove?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete("http://103.253.73.66:5001/deletenews/" + NewsNo, {
        }).then(() => {
          Swal.fire({
            title: 'Removed successfully!',
            icon: 'success'
          })
          window.location.reload()
        })
          .catch((error) => {
            Swal.fire({
              title: 'Error!',
              text: error.message,
              icon: 'error',
              confirmButtonText: 'OK'
            })
          })
      }
    })
  }
  //ทำ modal Detail
  const [opennews, setOpennews] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);

  // ฟังก์ชันเปิด Modal และกำหนด selectedBooking เมื่อคลิกปุ่มดูรายละเอียด
  const handleOpenModal = (news) => {
    setSelectedNews(news);
    setOpennews(true);
  };

  // ฟังก์ชันปิด Modal และล้าง selectedBooking
  const handleCloseModal = () => {
    setSelectedNews(null);
    setOpennews(false);
  };
  const columns = [
    {
      id: 'newsNo',
      name: 'NewsNo',
      sortable: true,
      selector: row => row.NewsNo,
      width: '100px'
    },
    {
      id: 'newsDate',
      name: 'NewsDate',
      sortable: true,
      selector: row => moment(row.NewsDate).format('DD/MM/YYYY '),
      width: '150px'
    },
    {
      id: 'topicNews',
      name: 'TopicNews',
      sortable: true,
      selector: row => row.TopicNews,
      width: '300px'
    },
    {
      id: 'createby',
      name: 'CreateBy',
      sortable: true,
      selector: row => row.CreateBy,
      width: '120px'
    },
    {
      id: 'updatedate',
      name: 'UpdateDate',
      sortable: true,
      selector: row => moment(row.UpdateDate).format('DD/MM/YYYY HH:mm:ss A'),
      width: '220px'
    },
    {
      id: 'updateby',
      name: 'UpdateBy',
      sortable: true,
      selector: row => row.UpdateBy,
      width: '120px'
    },
    {
      name: 'Action',
      selector: row =>

        <div class="btn-group" role="group" aria-label="Basic example">
          {/* <button className="btn btn-primary" onClick={() => handleOpenModal(row)}>Detail</button> */}
          <button className="btn btn-primary" onClick={() => { LoadDetail(row.NewsNo) }} >Detail</button>
          <button className="btn btn-warning" onClick={() => { LoadEdit(row.NewsNo) }} >Edit</button>
          <button className="btn btn-danger" onClick={() => { Removefunction(row.NewsNo) }} >Delete</button>

        </div>

    }
  ];

  const [file, setFile] = useState(null);
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    // formData.append('file', file, file.name);
    Axios.post('http://103.253.73.66:5001/import-doc', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        console.log(response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //const [file, setFile] = useState(null);

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const formData = new FormData();
  //   formData.append('file', file);
  //   Axios.post('http://103.253.73.66:5001/import-doc1', formData, {
  //     headers: {
  //       'Content-Type': 'multipart/form-data',
  //     },
  //   })
  //     .then((response) => {
  //       console.log(response.data);
  //       window.location.reload();
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };


  useEffect(() => {
    fetch("http://103.253.73.66:5001/news")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
          console.log(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      ).catch((err) => {
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

          <div className="LayoutContainer">
            <form>
              <div className="card-body">
                <div className="btn">
                  <Link to="/CreateNews" className="btn btn-success">Add New</Link>
                </div>
              </div>
            </form>

            {/* <form onSubmit={handleSubmit} >
              <div>
                <label htmlFor="file">Choose a file:</label>
                <input
                  type="file"
                  id="file"
                  accept=".doc,.docx"
                  onChange={(e) => setFile(e.target.files[0])}
                />
                 <button type="submit">Upload</button>
              </div>
            </form> */}

            <Paper sx={{ p: 1 }} style={{ backgroundColor: '#F2F3F4' }}>
              <div className="card-body" >
                <DataTable
                  title="News"
                  columns={columns}
                  data={items}
                  highlightOnHover
                  pagination
                  paginationPerPage={10}
                  paginationRowsPerPageOptions={[10, 15, 25, 50]}
                  paginationComponentOptions={{
                    rowsPerPageText: 'Records per page:',
                    rangeSeparatorText: 'out of',
                  }}
                />
              </div>
            </Paper>
            {selectedNews && (
              <DetailModal
                opennews={opennews}
                handleClose={handleCloseModal}
                news={selectedNews}
              />
            )}

          </div>
        </div>
      </DashboardLayout >
    );
  }
}
export default News;