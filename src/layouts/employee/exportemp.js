import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React, { useState } from "react";

// const excelJS = require('exceljs');
// const exportEmp = async (req, res) => {
//     try {
//         const workbook = new excelJS.Workbook();
//         const worksheet = workbook.addWorksheet("My Employees");

//         worksheet.columns = [
//             { header: "EmployeeID", key: "employeeid" },
//             { header: "TitleName", key: "titlename" },
//             { header: "FirstName", key: "firstName" },
//             { header: "LastName", key: "lastName" },
//             { header: "PhoneNumber", key: "phonenumber" },
//             { header: "Email", key: "email" },
//             { header: "DepartmentName", key: "department" },
//             { header: "RoleName", key: "role" },
//             { header: "CreateDate", key: "createdate" },
//             { header: "CreateBy", key: "createby" },
//             { header: "UpdateDate", key: "updatedate" },
//             { header: "UpdateBy", key: "updateby" }
//         ];
//         res.setHeader(
//             "Content-Type",
//             "application/vnd.openxmlfomats-officedocument.spreadsheatml.sheet"
//         );
//         res.setHeader(
//             "Content-Disposition", `attachment; filename=Emp.csv`
//         );
//         return workbook.csv.write(res).then(() => {
//             res.status(200);
//         });
//     } catch (error) {
//         console.log(error.message);
//     }
// }

function ExportEmp() {
    const [file, setFile] = useState();

    const fileReader = new FileReader();

    const handleOnChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();

        if (file) {
            fileReader.onload = function (event) {
                const csvOutput = event.target.result;
            };

            fileReader.readAsText(file);
        }
    };
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <div style={{ textAlign: "center" }}>
                <h1>REACTJS CSV IMPORT EXAMPLE </h1>
                <form>
                    <div className="btn">
                        <input
                            type={"file"}
                            id={"csvFileInput"}
                            accept={".csv"}
                            onChange={handleOnChange}
                        />
                        <button
                            className="btn btn-primary"
                            onClick={(e) => {
                                handleOnSubmit(e);
                            }}
                        >
                            IMPORT CSV
                        </button>
                    </div>
                </form>
            </div>

           
        </DashboardLayout>
    );
}
export default ExportEmp;
