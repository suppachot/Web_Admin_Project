/*
const mysql = require('mysql');

const connection = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: '',
    database: 'databaseproject'
});

connection.connect((err) => {
    if (!!err) {
        console.log(err);
    } else {
        console.log('Connected...');
    }
  
  });

  module.exports = connection
  */

/*
const UpdateEmployee = (employeeid) => {
  Axios.put('http://localhost:5000/updateemployee', { firstname: newfirstname, lastname: newlastname, phonenumber: newphonenumber, email: newemail, departmentname: newdepartmentname, rolename: newrolename, employeeid: employeeid }).then((response) => {
    setEmployeeList(
      employeeList.map((val) => {
        return val.employeeid == employeeid ? {
          employeeid: val.employeeid,
          itleID: val.TitleName,
          FirstName: val.FirstName,
          LastName: val.LastName,
          PhoneNumber: val.PhoneNumber,
          Email: val.Email,
          DepartmentID: val.DepartmentName,
          RoleID: val.RoleName
        } : val;
      })
    )
  })

}
}

<div className="d-flex">
                <input type="text"
                  className="form-control" 
                  onChange={(event)=>{
                    setnewPhoneNumber(event.target.value)
                  }}
                  />
                <button className="btn btn-warning" onClick={()=>{UpdateEmployee(val.employeeid)}}>Update</button>
              </div>

              */