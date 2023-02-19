import Axios from "axios";
import { useState } from "react";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

export default function data() {

  const [meetingroomList, setMeetingroomList] = useState([]);
  const getMeetingroom = () => {
    Axios.get('http://localhost:3003/meeting_approve').then((response) => {
      setMeetingroomList(response.data);
    });
  }

  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );

  return {
    columns: [
      { Header: "Topic", accessor: "Topic", width: "45%", align: "left" },
      { Header: "function", accessor: "function", align: "left" },
      { Header: "Room", accessor: "Room", align: "left" },
      { Header: "Name", accessor: "Name", align: "left" },
      { Header: "Timestart", accessor: "Timestart", align: "left" },
      { Header: "Timeend", accessor: "Timeend", align: "left" },
      { Header: "Date", accessor: "Date", align: "left" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "Attendant", accessor: "Attendant", align: "left" },
      { Header: "Dateapprove", accessor: "Dateapprove", align: "left" },
      
    ],

    rows: [
      {
        Topic: <Author image={team2} name="John Michael" email="john@creative-tim.com" />,
        function: <Job title="Manager" description="Organization" />,
        Room: (
          <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
            
          </MDTypography>
        ),
        Name: (
          <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
            Emp001
          </MDTypography>
        ),
        Timestart: (
          <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
            15:30:00
          </MDTypography>
        ),
        Timeend: (
          <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
            17:30:00
          </MDTypography>
        ),
        Date: (
          <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
            2023-01-16
          </MDTypography>
        ),
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="Approve" color="success" variant="gradient" size="sm" />
          </MDBox>
        ),
        Attendant: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Emp001
          </MDTypography>
        ),
        Dateapprove: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            2023-01-16
          </MDTypography>
        ),
      },
      {
        Topic: <Author image={team3} name="Alexa Liras" email="alexa@creative-tim.com" />,
        function: <Job title="Programator" description="Developer" />,
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="Noapprove" color="error" variant="gradient" size="sm" />
          </MDBox>
        ),
        Attendant: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Emp001
          </MDTypography>
        ),
        Dateapprove: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            2023-01-11
          </MDTypography>
        ),
      },
      {
        Topic: <Author image={team4} name="Laurent Perrier" email="laurent@creative-tim.com" />,
        function: <Job title="Executive" description="Projects" />,
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="Approve" color="success" variant="gradient" size="sm" />
          </MDBox>
        ),
        Attendant: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Emp001
          </MDTypography>
        ),
        Dateapprove: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            2022-12-25
          </MDTypography>
        ),
      },
      {
        Topic: <Author image={team3} name="Michael Levi" email="michael@creative-tim.com" />,
        function: <Job title="Programator" description="Developer" />,
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="Approve" color="wait" variant="gradient" size="sm" />
          </MDBox>
        ),
        Attendant: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Emp001
          </MDTypography>
        ),
        Dateapprove: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            2022-12-12
          </MDTypography>
        ),
      },
      {
        Topic: <Author image={team3} name="Richard Gran" email="richard@creative-tim.com" />,
        function: <Job title="Manager" description="Executive" />,
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="Approve" color="dark" variant="gradient" size="sm" />
          </MDBox>
        ),
        Attendant: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Emp001
          </MDTypography>
        ),
        Dateapprove: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            2022-12-01
          </MDTypography>
        ),
      },
      {
        Topic: <Author image={team4} name="Miriam Eric" email="miriam@creative-tim.com" />,
        function: <Job title="Programator" description="Developer" />,
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="offline" color="dark" variant="gradient" size="sm" />
          </MDBox>
        ),
        Attendant: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Emp001
          </MDTypography>
        ),
        Dateapprove: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            2022-11-11
          </MDTypography>
        ),
      },
    ],
  };
}
