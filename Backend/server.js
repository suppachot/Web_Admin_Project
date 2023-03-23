const express = require('express')
const app = express();
const mysql = require('mysql2');
const cors = require('cors');

const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

// const multer = require("multer");
// const csvParser = require("csv-parser");
// const fs = require("fs");
// const csv = require('csv-parser');
// const jsonParser = bodyParser.json()


app.use(cors());
app.use(express.json());
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "databaseproject",
    port: "3306"
});

db.connect((err) => {
    if (!!err) {
        console.log('Error connecting to MySQL database = ', err);
    } else {
        console.log('MySql succes connected...');
    }
});


//------------------------
// app.post('/login/', (req, res) => {
//     const EmployeeID = req.body.EmployeeID;
//     const Pincode = req.body.Pincode;

//     db.query("SELECT * FROM account WHERE  EmployeeID= ? AND Pincode= ?",[EmployeeID, Pincode],
//         (err, result) => {
//             if (err) {
//                req.setEncoding({err:err});
//             }
//             else {
//                 if(result.length > 0){
//                     res.send(result);
//                 }else{
//                     res.send({message: "Wrong EmploeeId or Pincode"});
//                 }
//             }
//         }
//     );
//     console.log('login success');
// })

// app.post('/login', (req, res) => {
//     const { EmployeeID, Password } = req.body;
//     db.query('SELECT * FROM account WHERE EmployeeID = ? ', [EmployeeID], (error, results) => {
//       if (error) {
//         res.status(500).send({ error: 'An error occurred' });
//         return;
//       }
//       if (results.length === 0 || results[0].password !== password) {
//         res.status(401).send({ error: 'Invalid username or password' });
//         return;
//       }
//       const token = jwt.sign({ userId: results[0].id }, 'your-secret-key');
//       res.send({ token });
//     });
//   });

//   app.post('/login1', (req, res) => {
//     const { EmployeeID, Password } = req.body;

//     const sql = 'SELECT * FROM account WHERE EmployeeID = ? AND Password = ?';
//     db.query(sql, [EmployeeID,Password], (err, result) => {
//         if (err) {
//             res.status(400).send({ error: err.message });
//         } else if (result.length === 0) {
//             res.status(401).send({ error: 'Invalid username or password' });
//         } else {
//             const user = result[0];
//             if (bcrypt.compareSync(Password, user.Password)) {
//                 const token = jwt.sign({ EmployeeID: user.EmployeeID }, 'secret-key');
//                 res.status(200).send({ token });
//             } else {
//                 res.status(401).send({ error: 'Invalid username or password' });
//             }
//         }
//     });
// });

// app.post('/login2', (req, res) => {
//     const { EmployeeID, Password } = req.body;
//     db.query(
//       'SELECT * FROM account WHERE EmployeeID = ? AND Password = ?',
//       [EmployeeID, Password],
//       (error, results, fields) => {
//         if (error) {
//           console.error(error);
//           res.status(500).send('Error logging in');
//         } else if (results.length > 0) {
//           const token = jwt.sign({ EmployeeID }, 'secret');
//           res.send({ token });
//         } else {
//           res.status(401).send('Invalid login credentials');
//         }
//       }
//     );
//   });

  app.post('/api1/login', (req, res) => {
    const { EmployeeID, Pincode } = req.body;
    db.query(
      'SELECT * FROM account WHERE EmployeeID = ? AND Pincode = ?',
      [EmployeeID, Pincode],
      (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
          res.json({ login: true });
        } else {
          res.json({ login: false });
        }
      }
    );
  });

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    db.query(
      'SELECT * FROM user WHERE username = ? AND password = ?',
      [username, password],
      (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
          res.json({ success: true });
        } else {
          res.json({ success: false });
        }
      }
    );
  });





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

// ------------dashboard-----------//
app.get('/api/dashboard/check-in', async (req, res) => {
    const conn = await pool.getConnection();
    const [rows] = await conn.query('SELECT DATE(NOW()) AS date, COUNT(`EmployeeID`) AS checkin FROM checkin WHERE date(`CheckInDate`)=curdate();');
    conn.release();
    res.json(rows);
  });


app.get('/dashboard/check-in', (req, res) => {
   const query = 'SELECT DATE(NOW()) AS date, COUNT(`EmployeeID`) AS checkin FROM checkin WHERE date(`CheckInDate`)=curdate();';
   // const query = 'SELECT `EmployeeID`,`TransactionID` FROM `checkin`;';
    db.query(query, (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ message: 'Error querying database' });
      } else {
        res.json(results);
      }
    });
  });

app.get('/dashboard/check-out', (req, res) => {
    db.query("SELECT DATE(NOW()) AS date, COUNT(`EmployeeID`) AS checkout FROM checkout WHERE date(`CheckOutDate`)=curdate();", (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    })
    //console.log('dashboard check-out');
})


// ----------------------//

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
        [TitleID, TitleName, CreateDate, CreateBy, UpdateDate, UpdateBy],
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
//import file Emp ( 23-3-66)
app.post("/api/import", (req, res) => {
    const data = req.body;
  
    const query = "INSERT INTO employee (EmployeeID, TitleName, FirstName , LastName, PhoneNumber, Email, DepartmentName, RoleName,CreateDate,CreateBy,UpdateDate,UpdateBy) VALUES ?";
    const values = data.map((row) => [row.EmployeeID, row.TitleName, row.FirstName,row.LastName,row.PhoneNumber,row.Email,row.DepartmentName,row.RoleName,row.CreateDate,row.CreateBy,row.UpdateDate,row.UpdateBy]);
  
    db.query(query, [values], (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(200).json({status:'ok', message: "Data imported successfully!" });
      }
    });
    console.log('import File csv_Emp');
  });

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

    db.query("INSERT INTO employee (EmployeeID, TitleName, FirstName , LastName, PhoneNumber, Email, DepartmentName, RoleName,CreateDate,CreateBy,UpdateDate,UpdateBy) VALUES(?,?,?,?,?,?,?,?,?,?,?,?);",
        [EmployeeID, TitleName, FirstName, LastName, PhoneNumber, Email, DepartmentName, RoleName, CreateDate, CreateBy, UpdateDate, UpdateBy],
        (err, result) => {
            if (err)  {
                console.log(err);
               // res.status(201).json({ message: 'Add User  successfully' ,status : 'ok'});
            }
            else {
                //res.send("Values Emp inserted");
                res.json({ message: 'Add User  successfully' ,status : 'ok',result});
               // res.send(result);
               // console.log(result);
            }  
        }
    );
    console.log('Insert Emp success');

})
//Update employe
app.put('/employee/edit/:employeeID', (req, res) => {
    const employeeID = req.params.employeeID;
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
        [TitleName, FirstName, LastName, PhoneNumber, Email, DepartmentName, RoleName,CreateDate,CreateBy,UpdateDate,UpdateBy,employeeID], (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
               // res.send("Values Updated");
               res.json({ message: 'Update User  successfully' ,status : 'ok',result});
                //res.send(result);
            }
        })
    console.log('Update emp2 success');
})

//get Employee for edit employee
app.get('/getemployee/:employeeID', (req, res) => {
    const employeeID = req.params.employeeID;
    db.query("SELECT * FROM  employee WHERE EmployeeID = ? ;", [employeeID], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
           res.send(result);
          // res.json({ message: ' User  ' ,status : 'ok',result});
           // res.json(result);
        }
    })
    console.log('edit page');
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
app.get('/employee/detail/:Employeeid', (req, res) => {
    const Employeeid = req.params.Employeeid;
    db.query("SELECT * FROM employee WHERE EmployeeID = ? ;", [Employeeid], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    })
     console.log('Detail Emp');
    // console.log(res.data);
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
        [DepartmentID, DepartmentName, CreateDate, CreateBy, UpdateDate, UpdateBy],
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
//get department  for edit department
app.get('/getdepartment/:departmentID', (req, res) => {
    const departmentID = req.params.departmentID;
    db.query("SELECT * FROM  department WHERE DepartmentID = ? ;", [departmentID], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
           res.send(result);
          // res.json({ message: ' User  ' ,status : 'ok',result});
           // res.json(result);
        }
    })
    //console.log('edit page');
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
        [RoleID, RoleName, CreateDate, CreateBy, UpdateDate, UpdateBy],
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
app.put("/news/edit2/:newsNo", (req, res) => {
    const newsNo = req.params.newsNo;
    const NewsDate = req.body.NewsDate;
    const TopicNews = req.body.TopicNews;
    const NewsDetail = req.body.NewsDetail;
    const CreateBy = req.body.CreateBy;
    const UpdateDate = req.body.UpdateDate;
    const UpdateBy = req.body.UpdateBy;

    db.query("UPDATE news SET  NewsDate = ? , TopicNews = ?, NewsDetail = ?  ,CreateBy =? , UpdateDate = ? , UpdateBy = ? WHERE NewsNo = ?",
    [NewsDate, TopicNews, NewsDetail, CreateBy, UpdateDate, UpdateBy, newsNo], (err, result) => {
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

