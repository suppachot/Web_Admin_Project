const express = require('express')
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "databaseproject"
});

db.connect((err) => {
    if (!!err) {
        console.log('Error connecting to MySQL database = ', err);
    } else {
        console.log('MySql succes connected...');
    }
});

//title db
app.get('/title', (req, res) => {
    db.query("SELECT * FROM  title", (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    })
})
//employee db
app.get('/employee', (req, res) => {
    db.query("SELECT * FROM  employee ORDER BY `EmployeeID` ASC ;", (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    })
})
// serach name
app.get('/employee/:firstname', (req, res) => {
    const firstname = req.params.firstname;
    db.query("SELECT * FROM  employee WHERE FirstName = ? ;", [firstname], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    })
    
})

app.post('/addemployee', (req, res) => {
    const employeeid = req.body.employeeid;
    const titlename = req.body.titlename;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const phonenumber = req.body.phonenumber;
    const email = req.body.email;
    const departmentname = req.body.departmentname;
    const rolename = req.body.rolename;

    db.query("INSERT INTO employee (EmployeeID, TitleName, FirstName , LastName, PhoneNumber, Email, DepartmentName, RoleName) VALUES(?,?,?,?,?,?,?,?)",
        [employeeid, titlename, firstname, lastname, phonenumber, email, departmentname, rolename],
        (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                res.send("Values inserted");
            }
        }
    );
    console.log('Insert success');
})
//Update employe
app.put("/updateemployee", (req, res) => {
    const employeeid = req.body.employeeid;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const phonenumber = req.body.phonenumber;
    const email = req.body.email;
    const departmentname = req.body.departmentname;
    const rolename = req.body.rolename;


    db.query("UPDATE employee SET  FirstName = ? , LastName = ? , PhoneNumber = ? , Email = ? , DepartmentName = ? , RoleName = ? WHERE employeeid = ?",
     [firstname, lastname, phonenumber, email, departmentname, rolename,employeeid], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send("Values Updated");
        }
    })
    console.log('Update success');
})

// deleate empoyee  front end ยังทำงานไม่ได้
app.delete('/deleteemployee/:employeeid', (req, res) => {
    const employeeid = req.params.employeeid;
    db.query("DELETE FROM  employee WHERE EmployeeID = ?", employeeid, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    })
    console.log('Delete success');
})




//department db
app.get('/department', (req, res) => {
    db.query("SELECT * FROM  department ORDER BY `DepartmentID` ASC;", (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    })
})

//role db
app.get('/role', (req, res) => {
    db.query("SELECT * FROM  role", (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    })
})
//meeting_approve
app.get('/meeting_approve', (req, res) => {
    db.query("SELECT * FROM  meeting_approve", (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    })
})

//news db
app.get('/news', (req, res) => {
    db.query("SELECT * FROM  news", (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    })
})

//insert news
db.query("INSERT INTO `news`(`NewsNo`, `NewsDate`, `NewsDetail`, `CreateBy`, `UpdateDate`, `UpdateBy`) VALUES (?,?,?,?,?,?)",
        [],
        (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                res.send("Values inserted");
            }
        }
    );
    console.log('Insert success');

// account
app.get('/account', (req, res) => {
    db.query("SELECT * FROM  account", (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    })
})

//checkin db
app.get('/checkin', (req, res) => {
    db.query("SELECT * FROM  checkin", (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    })
})
//checkout
app.get('/checkout', (req, res) => {
    db.query("SELECT * FROM  checkout", (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    })
})

app.listen('5000', () => {
    console.log('Server is runing o n port 5000');
})

