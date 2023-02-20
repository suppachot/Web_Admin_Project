import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

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
        return (
            <DashboardLayout>
                <DashboardNavbar />
                hello
            </DashboardLayout>
        );
    }
    export default ExportEmp;
