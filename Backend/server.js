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
// create Emp
app.post('/addemployee', (req, res) => {
    const EmployeeID = req.body.EmployeeID;
    const TitleName = req.body.TitleName;
    const FirstName = req.body.FirstName;
    const LastName = req.body.LastName;
    const PhoneNumber = req.body.PhoneNumber;
    const Email = req.body.Email;
    const DepartmentName = req.body.DepartmentName;
    const RoleName = req.body.RoleName;
    // const CreateDate = req.body.CreateDate;
    // const CreateBy = req.body.CreateBy;
    // const UpdateDate = req.body.UpdateDate;
    // const UpdateBy = req.body.UpdateBy;

    db.query("INSERT INTO employee (EmployeeID, TitleName, FirstName , LastName, PhoneNumber, Email, DepartmentName, RoleName ) VALUES(?,?,?,?,?,?,?,?)",
        [EmployeeID, TitleName, FirstName, LastName, PhoneNumber, Email, DepartmentName, RoleName],
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
app.put("/updateemployee/:EmployeeID", (req, res) => {
    const EmployeeID = req.body.EmployeeID;
    const TitleName = req.body.TitleName;
    const FirstName = req.body.FirstName;
    const LastName = req.body.LastName;
    const PhoneNumber = req.body.PhoneNumber;
    const Email = req.body.Email;
    const DepartmentName = req.body.DepartmentName;
    const RoleName = req.body.RoleName;

    db.query("UPDATE employee SET TitleName=? , FirstName = ? , LastName = ? , PhoneNumber = ? , Email = ? , DepartmentName = ? , RoleName = ? WHERE EmployeeID = ?",
        [TitleName, FirstName, LastName, PhoneNumber, Email, DepartmentName, RoleName,EmployeeID], (err, result) => {
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
app.delete('/deleteemployee/:EmployeeID', (req, res) => {
    const EmployeeID = req.params.EmployeeID;
    db.query("DELETE FROM employee WHERE EmployeeID = ?", EmployeeID, (err, result) => {
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
//details
app.get('/news/:NewsNo', (req, res) => {
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
//Delete news
app.delete('/deletenews/:NewsNo', (req, res) => {
    const NewsNo = req.params.NewsNo;
    db.query("DELETE FROM news WHERE NewsNo = ?", NewsNo, (err, result) => {
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
app.put("/updatenews", (req, res) => {
    const NewsNo = req.body.NewsNo;
    const NewsDate = req.body.NewsDate;
    const TopicNews = req.body.TopicNews;
    const NewsDetail = req.body.NewsDetail;
    const CreateBy = req.body.CreateBy;
    const UpdateDate = req.body.UpdateDate;
    const UpdateBy = req.body.UpdateBy;

    db.query("UPDATE news SET  NewsDate = ? , TopicNews = ? , NewsDetail = ? , CreateBy = ? , UpdateDate = ? , UpdateBy = ? WHERE NewsNo = ?",
        [NewsDate, TopicNews, NewsDetail, CreateBy, UpdateDate, UpdateBy, NewsNo], (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                res.send("Values Updated");
            }
        })
    console.log('Update success');
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

