const express = require('express')
const app = express();
const mysql = require('mysql2');
const cors = require('cors');
const jwt = require('jsonwebtoken');

// const multer = require("multer");
// const csvParser = require("csv-parser");
// const fs = require("fs");
// const csv = require('csv-parser');
// const jsonParser = bodyParser.json()


app.use(cors());
app.use(express.json());


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


//login
// app.post('/api/login', async (req, res) => {
//     const { employeeID, pincode } = req.body;

//     const query = 'SELECT * FROM account LEFT JOIN employee ON account.EmployeeID = employee.EmployeeID WHERE account.EmployeeID = ? AND employee.RoleName = "Administrator" ';
//     db.query(query, [employeeID], (err, results) => {
//         if (err) {
//             console.error(err);
//             return res.status(500).json({ error: 'Internal server error' });
//         }

//         if (results.length === 0) {
//             return res.status(401).json({ error: 'Invalid EmployeeID or Pincode' });
//         }

//         const account = results[0];
//         //const employee = results[0];
//         if (account.Pincode !== pincode) {
//             return res.status(401).json({ error: 'Invalid EmployeeID or Pincode' });
//         }

//        const token = jwt.sign({ id: account.AccountID }, 'your_jwt_secret', { expiresIn: '5h' });
//        res.json({ token });
//        //---ไม่เอา
//         //const token = jwt.sign({ id: account.AccountID , role: account.RoleName} ,process.env.JWT_SECRET, { expiresIn: '1h' });
//         // const token = jwt.sign({ id: AccountId, employeeId: EmployeeId }, process.env.JWT_SECRET, { expiresIn }); 
//     });
// });

app.post('/api/login', async (req, res) => {
    const { employeeID, pincode } = req.body;

    //const query = 'SELECT * FROM account LEFT JOIN employee ON account.EmployeeID = employee.EmployeeID WHERE account.EmployeeID = ? AND employee.RoleName = "Administrator"';
    const query = 'SELECT * FROM account LEFT JOIN employee ON account.EmployeeID = employee.EmployeeID WHERE account.EmployeeID = ?';
    db.query(query, [employeeID], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: 'Invalid EmployeeID or Pincode' });
        }

        const account = results[0];
        if (account.Pincode !== pincode) {
            return res.status(401).json({ error: 'Invalid EmployeeID or Pincode' });
        }

        const payload = {
            id: account.AccountID,
            emp: account.EmployeeID,
            firstName: account.FirstName,
            lastName: account.LastName,
        };
        const token = jwt.sign(payload, 'your_jwt_secret', { expiresIn: '5h' });
        res.json({
            token,
            emp: account.EmployeeID,
            firstName: account.FirstName,
            lastName: account.LastName,
        });
    });
});



// show profile user
app.get('/employee-id', async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Missing token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const query = 'SELECT EmployeeID FROM account WHERE AccountID = ?';
        const [rows] = await pool.execute(query, [decoded.id]);

        if (!rows.length) {
            return res.status(404).json({ error: 'User not found' });
        }

        const employeeId = rows[0].EmployeeID;
        res.json({ employeeId });
    } catch (err) {
        res.status(403).json({ error: 'Invalid token' });
    }
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

app.get('/dashboard/check-in', (req, res) => {
    db.query(`SELECT DATE(NOW()) AS date, 
                COUNT(DISTINCT checkin.EmployeeID) AS เข้างานแล้ว,
                (SELECT COUNT(*) FROM employee WHERE RoleName = 'Employee') - COUNT(DISTINCT checkin.EmployeeID) AS ยังไม่เข้างาน 
                FROM employee 
                LEFT JOIN checkin ON employee.EmployeeID = checkin.EmployeeID 
                WHERE employee.RoleName = 'Employee' 
                AND DATE(checkin.CheckInDate) = CURDATE(); `,
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
            }
            else {
                res.json([
                    {
                        status: 'เข้างานแล้ว',
                        attendance: result[0].เข้างานแล้ว
                    }
                    , {
                        status: 'ยังไม่เข้างาน',
                        attendance: result[0].ยังไม่เข้างาน
                    }
                ]);
            }
        });
});

app.get('/dashboard/check-out', (req, res) => {
    db.query(`SELECT DATE(NOW()) AS date, 
                COUNT(DISTINCT checkout.EmployeeID) AS ออกงานแล้ว,
                (SELECT COUNT(*) FROM employee WHERE RoleName = 'Employee') - COUNT(DISTINCT checkout.EmployeeID) AS ยังไม่ออกงาน 
                FROM employee 
                LEFT JOIN checkout ON employee.EmployeeID = checkout.EmployeeID 
                WHERE employee.RoleName = 'Employee' 
                AND DATE(checkout.CheckOutDate) = CURDATE(); `,
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
            }
            else {
                res.json([
                    {
                        status: 'ออกงานแล้ว',
                        attendance: result[0].ออกงานแล้ว
                    }
                    , {
                        status: 'ยังไม่ออกงาน',
                        attendance: result[0].ยังไม่ออกงาน
                    }
                ]);
            }
        });
});


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
                res.json({ message: 'Add Title  successfully', status: 'ok', result });
                //res.send("Values Title inserted");
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

//get title  for edit title
app.get('/gettitle/:titleID', (req, res) => {
    const titleID = req.params.titleID;
    db.query("SELECT * FROM  title WHERE TitleID = ? ;", [titleID], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
            // res.json({ message: ' User  ' ,status : 'ok',result});
        }
    })
    //console.log('edit page');
})

//Update title
app.put('/title/edit/:titleID', (req, res) => {
    const titleID = req.params.titleID;
    //const TitleID = req.body.TitleID;
    const TitleName = req.body.TitleName;
    const CreateDate = req.body.CreateDate;
    const CreateBy = req.body.CreateBy;
    const UpdateDate = req.body.UpdateDate;
    const UpdateBy = req.body.UpdateBy;

    db.query("UPDATE title SET  TitleName = ?  ,CreateDate = ? ,CreateBy = ?,UpdateDate = ?,UpdateBy = ?  WHERE TitleID = ? ",
        [TitleName, CreateDate, CreateBy, UpdateDate, UpdateBy, titleID], (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                // res.send("Values Updated");
                //res.json({ message: 'Update User  successfully', status: 'ok', result });
                res.send(result);
            }
        })
    console.log('Update title success');
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

    const query = "INSERT INTO employee (EmployeeID, TitleName, FirstName , LastName, PhoneNumber, Email, DepartmentName, RoleName,CreateDate,CreateBy,UpdateDate,UpdateBy) VALUES ? ";
    const values = data.map((row) => [row.EmployeeID, row.TitleName, row.FirstName, row.LastName, row.PhoneNumber, row.Email, row.DepartmentName, row.RoleName, row.CreateDate, row.CreateBy, row.UpdateDate, row.UpdateBy]);

    db.query(query, [values], (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(200).json({ status: 'ok', message: "Data imported successfully!" });
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
            if (err) {
                console.log(err);
                // res.status(201).json({ message: 'Add User  successfully' ,status : 'ok'});
            }
            else {
                //res.send("Values Emp inserted");
                res.json({ message: 'Add User  successfully', status: 'ok', result });
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
    //const EmployeeID = req.body.EmployeeID;
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
        [TitleName, FirstName, LastName, PhoneNumber, Email, DepartmentName, RoleName, CreateDate, CreateBy, UpdateDate, UpdateBy, employeeID], (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                // res.send("Values Updated");
                //res.json({ message: 'Update User  successfully', status: 'ok', result });
                res.send(result);
            }
        })
    console.log('Update  success');
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
    db.query("DELETE FROM employee WHERE EmployeeID = ? ", EmployeID, (err, result) => {
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
//Update dapartment
app.put('/dapartment/edit/:departmentID', (req, res) => {
    const departmentID = req.params.departmentID;
    //const EmployeeID = req.body.EmployeeID;
    const DepartmentName = req.body.DepartmentName;
    const CreateDate = req.body.CreateDate;
    const CreateBy = req.body.CreateBy;
    const UpdateDate = req.body.UpdateDate;
    const UpdateBy = req.body.UpdateBy;

    db.query("UPDATE department SET  DepartmentName = ?  ,CreateDate = ? ,CreateBy = ?,UpdateDate = ?,UpdateBy = ?  WHERE DepartmentID = ?",
        [DepartmentName, CreateDate, CreateBy, UpdateDate, UpdateBy, departmentID], (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                // res.send("Values Updated");
                //res.json({ message: 'Update User  successfully', status: 'ok', result });
                res.send(result);
            }
        })
    console.log('Update  success');
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
//get role for edit role
app.get('/getrole/:roleID', (req, res) => {
    const roleID = req.params.roleID;
    db.query("SELECT * FROM  role WHERE RoleID = ? ;", [roleID], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
            //res.json({ message: ' User  ' ,status : 'ok',result});
            //res.json(result);

        }
    })
    console.log('edit role page');

})
//Update role
app.put('/role/edit/:roleID', (req, res) => {
    const roleID = req.params.roleID;
    const RoleName = req.body.RoleName;
    const CreateDate = req.body.CreateDate;
    const CreateBy = req.body.CreateBy;
    const UpdateDate = req.body.UpdateDate;
    const UpdateBy = req.body.UpdateBy;

    db.query("UPDATE role SET  RoleName = ? ,CreateDate = ? ,CreateBy = ?,UpdateDate = ?,UpdateBy = ?  WHERE RoleID = ? ",
        [RoleName, CreateDate, CreateBy, UpdateDate, UpdateBy, roleID], (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                // res.send("Values Updated");
                //res.json({ message: 'Update User  successfully', status: 'ok', result });
                res.send(result);
            }
        })
    console.log('Update  success');
})

//meetinroom
app.get('/meetingroom', (req, res) => {
    db.query("SELECT * FROM  meetingroom", (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    })
})
//addmeetinroom
app.post('/meetingroom/add', (req, res) => {
    const RoomID = req.body.RoomID;
    const RoomName = req.body.RoomName;
    const Capacity = req.body.Capacity;
    const CreateDate = req.body.CreateDate;
    const CreateBy = req.body.CreateBy;
    const UpdateDate = req.body.UpdateDate;
    const UpdateBy = req.body.UpdateBy;
    db.query("INSERT INTO meetingroom(RoomID, RoomName, Capacity, CreateDate, CreateBy, UpdateDate, UpdateBy) VALUES(?,?,?,?,?,?,?);",
        [RoomID, RoomName, Capacity, CreateDate, CreateBy, UpdateDate, UpdateBy],
        (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                res.send("Values Meetingroom inserted");
            }
        }
    );
    console.log('Insert Meetingroom success');
})
//Update Meetingroom
app.put('/meetingroom/edit/:roomID', (req, res) => {
    const roomID = req.params.roomID;
    const RoomName = req.body.RoomName;
    const Capacity = req.body.Capacity;
    const CreateDate = req.body.CreateDate;
    const CreateBy = req.body.CreateBy;
    const UpdateDate = req.body.UpdateDate;
    const UpdateBy = req.body.UpdateBy;

    db.query("UPDATE meetingroom SET  RoomName = ? , Capacity = ? ,CreateDate = ? ,CreateBy = ?,UpdateDate = ?,UpdateBy = ?  WHERE RoomID = ?",
        [RoomName, Capacity, CreateDate, CreateBy, UpdateDate, UpdateBy, roomID], (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                // res.send("Values Updated");
                //res.json({ message: 'Update User  successfully', status: 'ok', result });
                res.send(result);
            }
        })
    console.log('Update emp2 success');
})

//get meetingroom for edit meetingroom
app.get('/getmeetingroom/:roomID', (req, res) => {
    const roomID = req.params.roomID;
    db.query("SELECT * FROM  meetingroom WHERE RoomID = ? ;", [roomID], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
            // res.json({ message: ' User  ' ,status : 'ok',result});
            // res.json(result);
        }
    })
    console.log('edit meeting page');
})

//deleate meeting
app.delete('/deletemeetingroom/:RoomID', (req, res) => {
    const RoomID = req.params.RoomID;
    db.query("DELETE FROM meetingroom WHERE RoomID = ?", RoomID, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    })
    console.log('Delete Room success');
})
//bookingApprove
app.get('/bookingmeeting', (req, res) => {
    db.query(`SELECT *
    FROM booking_approve b
    JOIN employee e ON b.EmployeeID = e.EmployeeID
    JOIN meetingroom m ON b.RoomID = m.RoomID;`,
        (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                res.send(result);
            }
        })
})
app.put("/booking/edit/:bookingID", (req, res) => {
    const bookingID = req.params.bookingID;
    const Status = req.body.Status;
    const Attendant = req.body.Attendant;
    const DateApprove = req.body.DateApprove;
    db.query("UPDATE booking_approve SET Status = ? , Attendant= ?, DateApprove= ? WHERE BookingID =? ;",
   //-----------------------------
    // const Attendant = req.body.Attendant;
    // db.query("UPDATE booking_approve SET  Attendant= ? WHERE BookingID =? ",
        [Status,Attendant,DateApprove,bookingID], (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                res.send("Values Updated");
            }
        })
    console.log('Update news success');
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
//get  news for edit
app.get('/getnews/:newsNo', (req, res) => {
    const newsNo = req.params.newsNo;
    db.query("SELECT * FROM  news WHERE NewsNo = ? ;", [newsNo], (err, result) => {
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
    db.query(`SELECT*
    FROM employee e
    INNER JOIN checkin c
    ON e.EmployeeID = c.EmployeeID
    WHERE CheckInDate >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH); `,
        (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                res.send(result);
            }
        })
})
//get detail
// app.get('/checkin/:TransactionID', (req, res) => {
//     const TransactionID = req.params.TransactionID;
//     db.query(`SELECT*
//     FROM employee e
//     INNER JOIN checkin c
//     ON e.EmployeeID = c.EmployeeID
//     WHERE CheckInDate >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH) AND c.TransactionID =? ; `, [TransactionID],
//         (err, result) => {
//             if (err) {
//                 console.log(err);
//             }
//             else {
//                 res.send(result);
//             }
//         })
// })
//checkout
app.get('/checkout', (req, res) => {
    db.query(`SELECT*
    FROM employee e
    INNER JOIN checkout c
    ON e.EmployeeID = c.EmployeeID
    WHERE CheckOutDate >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH); `,
        (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                res.send(result);
            }
        })
})

//get detail
// app.get('/checkout/:TransactionID', (req, res) => {
//     const TransactionID = req.params.TransactionID;
//     db.query(`SELECT*
//     FROM employee e
//     INNER JOIN checkout c
//     ON e.EmployeeID = c.EmployeeID
//     WHERE CheckOutDate >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH) AND c.TransactionID =? ; `, [TransactionID],
//         (err, result) => {
//             if (err) {
//                 console.log(err);
//             }
//             else {
//                 res.send(result);
//             }
//         })
// })
//day by day
app.get('/day/checkin', (req, res) => {
    db.query(`SELECT *FROM employee e 
    INNER JOIN checkin c ON e.EmployeeID = c.EmployeeID 
    WHERE e.RoleName='Employee' AND date(c.CheckInDate)=curdate();`
        , (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send('Internal Server Error');
            }
            else {
                res.send(result);
            }
        })
})


app.get('/day/checkout', (req, res) => {
    db.query(`SELECT *FROM employee e 
    INNER JOIN checkout c ON e.EmployeeID = c.EmployeeID 
    WHERE e.RoleName='Employee' AND date(c.CheckOutDate)=curdate();
    
    `, (err, result) => {
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

