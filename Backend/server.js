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
// ------------dashboard-----------
// count admin
app.get('/employee/admin_count', (req, res) => {
    db.query("SELECT COUNT(`EmployeeID`) AS Admin FROM employee WHERE `RoleName`='Administrator'", (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    })
})
// count employee
app.get('/employee/emp_count', (req, res) => {
    db.query("SELECT COUNT(`EmployeeID`) AS Employee FROM employee WHERE `RoleName`='Employee';", (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    })
})
// count employee user_app
app.get('/account/user_app', (req, res) => {
    db.query("SELECT COUNT(`AccountID`) AS Use_App FROM account WHERE `AccountID`;", (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    })
})

//title db
app.get('/title', (req, res) => {
    db.query("SELECT * FROM  title ORDER BY `TitleID` ASC ;", (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    })
})
// create Title
app.post('/title/add', (req, res) => {
    const TitleID = req.body.TitleID;
    const TitleName = req.body.TitleName;
    const CreateDate = req.body.CreateDate;
    const CreateBy = req.body.CreateBy;
    const UpdateDate = req.body.UpdateDate;
    const UpdateBy = req.body.UpdateBy;

    db.query("INSERT INTO title (TitleID, TitleName ,CreateDate,CreateBy,UpdateDate,UpdateBy) VALUES(?,?,?,?,?,?);",
        [TitleID, TitleName,CreateDate,CreateBy,UpdateDate,UpdateBy],
        (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                res.send("Values Title inserted");
            }
        }
    );
    console.log('Insert Title success');
})

//details title
app.get('/title/detail/:TitleID', (req, res) => {
    const TitleID = req.params.TitleID;
    db.query("SELECT * FROM title WHERE TitleID = ? ;", [TitleID], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    })
})
// deleate title  
app.delete('/deletetitle/:TitleID', (req, res) => {
    const TitleID = req.params.TitleID;
    db.query("DELETE FROM title WHERE TitleID = ?", TitleID, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    })
    console.log('Delete Title success');
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
// create Emp
app.post('/employee/add', (req, res) => {
    const EmployeeID = req.body.EmployeeID;
    const TitleName = req.body.TitleName;
    const FirstName = req.body.FirstName;
    const LastName = req.body.LastName;
    const PhoneNumber = req.body.PhoneNumber;
    const Email = req.body.Email;
    const DepartmentName = req.body.DepartmentName;
    const RoleName = req.body.RoleName;
    const CreateDate = req.body.CreateDate;
    const CreateBy = req.body.CreateBy;
    const UpdateDate = req.body.UpdateDate;
    const UpdateBy = req.body.UpdateBy;

    db.query("INSERT INTO employee (EmployeeID, TitleName, FirstName , LastName, PhoneNumber, Email, DepartmentName, RoleName,CreateDate,CreateBy,UpdateDate,UpdateBy) VALUES(?,?,?,?,?,?,?,?,now(),?,now(),?);",
        [EmployeeID, TitleName, FirstName, LastName, PhoneNumber, Email, DepartmentName, RoleName ,CreateDate,CreateBy,UpdateDate,UpdateBy],
        (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                res.send("Values Emp inserted");
            }
        }
    );
    console.log('Insert Emp success');
})
//Update employe
app.put("/empolyee/edit/:EmployeeID", (req, res) => {
    const Employeeid = req.body.Employeeid;
    const EmployeeID = req.body.EmployeeID;
    const TitleName = req.body.TitleName;
    const FirstName = req.body.FirstName;
    const LastName = req.body.LastName;
    const PhoneNumber = req.body.PhoneNumber;
    const Email = req.body.Email;
    const DepartmentName = req.body.DepartmentName;
    const RoleName = req.body.RoleName;
    const CreateDate = req.body.CreateDate;
    const CreateBy = req.body.CreateBy;
    const UpdateDate = req.body.UpdateDate;
    const UpdateBy = req.body.UpdateBy;

    db.query("UPDATE employee SET TitleName=? , FirstName = ? , LastName = ? , PhoneNumber = ? , Email = ? , DepartmentName = ? , RoleName = ? ,CreateDate = ? ,CreateBy = ?,UpdateDate = ?,UpdateBy = ?  WHERE EmployeeID = ?",
        [TitleName, FirstName, LastName, PhoneNumber, Email, DepartmentName, RoleName,CreateDate,CreateBy,UpdateDate,UpdateBy,EmployeeID], (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                res.send("Values Updated");
            }
        })
    console.log('Update Emp success');
})

// deleate empoyee  
app.delete('/deleteemployee/:EmployeID', (req, res) => {
    const EmployeID = req.params.EmployeID;
    db.query("DELETE FROM employee WHERE EmployeeID = ?", EmployeID, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    })
    console.log('Delete Emp success');
})

//details empolyee
app.get('/empolyee/detail/:Employeeid', (req, res) => {
    const Employeeid = req.params.Employeeid;
    db.query("SELECT * FROM employee WHERE EmployeeID = ? ;", [Employeeid], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    })
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
// create department
app.post('/department/add', (req, res) => {
    const DepartmentID = req.body.DepartmentID;
    const DepartmentName = req.body.DepartmentName;
    const CreateDate = req.body.CreateDate;
    const CreateBy = req.body.CreateBy;
    const UpdateDate = req.body.UpdateDate;
    const UpdateBy = req.body.UpdateBy;

    db.query("INSERT INTO department (DepartmentID, DepartmentName ,CreateDate,CreateBy,UpdateDate,UpdateBy) VALUES(?,?,?,?,?,?);",
        [DepartmentID, DepartmentName,CreateDate,CreateBy,UpdateDate,UpdateBy],
        (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                res.send("Values Department inserted");
            }
        }
    );
    console.log('Insert Department success');
})

//details department
app.get('/department/detail/:DepartmentID', (req, res) => {
    const DepartmentID = req.params.DepartmentID;
    db.query("SELECT * FROM department WHERE DepartmentID = ? ;", [DepartmentID], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    })
})
// deleate department  
app.delete('/deletedepartment/:DepartmentID', (req, res) => {
    const DepartmentID = req.params.DepartmentID;
    db.query("DELETE FROM department WHERE DepartmentID = ?", DepartmentID, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    })
    console.log('Delete Department success');
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
// create role
app.post('/role/add', (req, res) => {
    const RoleID = req.body.RoleID;
    const RoleName = req.body.RoleName;
    const CreateDate = req.body.CreateDate;
    const CreateBy = req.body.CreateBy;
    const UpdateDate = req.body.UpdateDate;
    const UpdateBy = req.body.UpdateBy;

    db.query("INSERT INTO role (RoleID, RoleName ,CreateDate,CreateBy,UpdateDate,UpdateBy) VALUES(?,?,?,?,?,?);",
        [RoleID, RoleName,CreateDate,CreateBy,UpdateDate,UpdateBy],
        (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                res.send("Values Role inserted");
            }
        }
    );
    console.log('Insert Role success');
})

//details role
app.get('/role/detail/:RoleID', (req, res) => {
    const RoleID = req.params.RoleID;
    db.query("SELECT * FROM role WHERE RoleID = ? ;", [RoleID], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    })
})
// deleate role  
app.delete('/deleterole/:RoleID', (req, res) => {
    const RoleID = req.params.RoleID;
    db.query("DELETE FROM role WHERE RoleID = ?", RoleID, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    })
    console.log('Delete role success');
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

//news 
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
//details news
app.get('/news/detail/:NewsNo', (req, res) => {
    const NewsNo = req.params.NewsNo;
    db.query("SELECT * FROM  news WHERE NewsNo = ? ;", [NewsNo], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    })
})

//insert news
app.post('/createnews', (req, res) => {
    const NewsNo = req.body.NewsNo;
    const NewsDate = req.body.NewsDate;
    const TopicNews = req.body.TopicNews;
    const NewsDetail = req.body.NewsDetail;
    const CreateBy = req.body.CreateBy;
    const UpdateDate = req.body.UpdateDate;
    const UpdateBy = req.body.UpdateBy;

    db.query("INSERT INTO news (NewsNo, NewsDate, TopicNews,NewsDetail, CreateBy, UpdateDate, UpdateBy) VALUES (?,?,?,?,?,?,?)",
        [NewsNo, NewsDate, TopicNews, NewsDetail, CreateBy, UpdateDate, UpdateBy],
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
//edit details news
app.get('/news/editdetail/:NewsNo', (req, res) => {
    const NewsNo = req.params.NewsNo;
    db.query("SELECT * FROM  news WHERE NewsNo = ? ;", [NewsNo], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    })
})
//Delete news
app.delete('/deletenews/:NewsNo', (req, res) => {
    const NewsNo = req.params.NewsNo;
    db.query("DELETE FROM news WHERE NewsNo = ?", [NewsNo], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    })
    console.log('Delete success');
})
//Update news

// app.get('/news/edit/:newsno', (req, res) => {
//     const newsno = req.params.newsno;
//     db.query("SELECT * FROM  news WHERE NewsNo = ? ;", [newsno], (err, result) => {
//         if (err) {
//             console.log(err);
//         }
//         else {
//             res.send(result);
//         }
//     })
// })
app.put("/news/edit/:newsNo", (req, res) => {
  //  const newsid = req.params.newsid;
    const NewsNo = req.body.NewsNo;
    const NewsDate = req.body.NewsDate;
    const TopicNews = req.body.TopicNews;
    const NewsDetail = req.body.NewsDetail;
    const CreateBy = req.body.CreateBy;
    const UpdateDate = req.body.UpdateDate;
    const UpdateBy = req.body.UpdateBy;

    // const NewsNo = req.body.NewsNo;
    // const new_NewsDate = req.body.new_NewsDate;
    // const new_TopicNews = req.body.new_TopicNews;
    // const new_NewsDetail = req.body.new_NewsDetail;
    // const CreateBy = req.body.CreateBy;
    // const new_UpdateDate = req.body.new_UpdateDate;
    // const new_UpdateBy = req.body.new_UpdateBy;

    db.query("UPDATE news SET  NewsDate = ? , TopicNews = ? ,CreateBy =?, NewsDetail = ?  , UpdateDate = ? , UpdateBy = ? WHERE NewsNo = ?",
        [NewsDate, TopicNews, NewsDetail,CreateBy, UpdateDate, UpdateBy, NewsNo],(err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                res.send("Values Updated");
            }
        })
    console.log('Update news success');

    // db.query("UPDATE news SET  NewsDate = ? , TopicNews = ? , NewsDetail = ? , CreateBy=? , UpdateDate = ? , UpdateBy = ? WHERE NewsNo = ?",
    //     [new_NewsDate, new_TopicNews, new_NewsDetail, CreateBy, new_UpdateDate,new_UpdateBy, NewsNo],(err, result) => {
    //         if (err) {
    //             console.log(err);
    //         }
    //         else {
    //             res.send("Values Updated");
    //         }
    //     })
    // console.log('Update news success');
})


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

