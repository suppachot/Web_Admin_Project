const express = require('express')
const app = express();
const mysql = require('mysql2');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');

app.use(cors());
app.use(express.json());

const mammoth = require('mammoth');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// const upload = multer();
// app.use(upload.none());

function readDocFile(file) {
    return new Promise((resolve, reject) => {
        mammoth.convertToHtml({ buffer: file.buffer })
            .then((result) => {
                const html = result.value;
                const messages = result.messages;
                resolve({ html, messages });
            })
            .catch((err) => reject(err));
    });
}

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Koonmos123",
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

app.post('/api/login', async (req, res) => {
    const { employeeID, password } = req.body;
    const query = `SELECT * FROM account_admin LEFT JOIN employee ON account_admin.EmployeeID = employee.EmployeeID
     WHERE account_admin.EmployeeID = ? AND employee.RoleName = "Administrator" `;
    db.query(query, [employeeID], async (err, results) => {
        try {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Internal server error' });
            }

            if (results.length === 0) {
                return res.status(401).json({ error: 'Invalid EmployeeID or Pincode' });
            }

            const account_admin = results[0];
            const isMatch = await bcrypt.compare(password, account_admin.Password);
            if (!isMatch) {
                return res.status(401).json({ error: 'Invalid EmployeeID or Pincode' });
            }

            const payload = {
                id: account_admin.AccountID,
                emp: account_admin.EmployeeID,
                firstName: account_admin.FirstName,
                lastName: account_admin.LastName,
            };
            const token = jwt.sign(payload, 'your_jwt_secret', { expiresIn: '30m' });
            res.json({
                token,
                emp: account_admin.EmployeeID,
                firstName: account_admin.FirstName,
                lastName: account_admin.LastName,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error logging in' });
        }
    });
});

// register เข้ารหัส
app.post('/api/register', async (req, res) => {
    try {
        const employeeID = req.body.employeeID;
        const email = req.body.email;
        const password = req.body.password;

        // generate salt for password
        const salt = await bcrypt.genSalt(10);
        // hash password with salt
        const encryptedPassword = await bcrypt.hash(password, salt);

        db.query("INSERT INTO account_admin( EmployeeID, Email, Password) VALUES(?,?,?);",
            [employeeID, email, encryptedPassword],
            (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ message: 'Error registering user' });
                } else {
                    res.status(201).json({ message: 'User registered successfully', status: 'ok', result });
                }
            }
        );
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error registering user' });
    }
});
//reset password
app.post('/api/forgot-password', async (req, res) => {
    try {
        const email = req.body.email;

        // generate reset token
        const resetToken = crypto.randomBytes(20).toString('hex');
        const resetTokenExpiry = Date.now() + 60 * 60 * 1000; // 1 hour from now

        // update reset token and expiry time in database
        db.query("UPDATE account_admin SET ResetToken = ?, ResetTokenExpiry = ? WHERE Email = ?;",
            [resetToken, resetTokenExpiry, email],
            (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ message: 'Error sending reset password email' });
                } else {
                    // send reset password email
                    const transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: "s6204062620054@email.kmutnb.ac.th",
                            pass: "",
                        }
                    });

                    const mailOptions = {
                        from: 'your_email@gmail.com',
                        to: email,
                        subject: 'Reset Password',
                        html: `<p>Click <a href="http://103.253.73.66/resetpassword/${resetToken}">here</a> to reset your password.</p>`
                    };
                    transporter.sendMail(mailOptions, (err, info) => {
                        if (err) {
                            console.log(err);
                            res.status(500).json({ message: 'Error sending reset password email' });
                        } else {
                            console.log(info);
                            res.status(200).json({ message: 'Reset password email sent' });
                        }
                    });
                }
            }
        );
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error sending reset password email' });
    }
});

  app.post('/api/reset-password/', async (req, res) => {
    try {
        const resetToken = req.body.resetToken;
        const password = req.body.password;
      // check if reset token is valid and not expired
      db.query("SELECT * FROM account_admin WHERE ResetToken = ? AND ResetTokenExpiry > ?;",
        [resetToken, Date.now()],
        (err, result) => {
          if (err) {
            console.log(err);
            res.status(500).json({ message: 'Error resetting password' });
          } else if (result.length === 0) {
            res.status(400).json({ message: 'Invalid reset token' });
          } else {
            // update password and clear reset token and expiry time in database
            const hashedPassword = bcrypt.hashSync(password, 10);
            db.query("UPDATE account_admin SET Password = ?, ResetToken = NULL, ResetTokenExpiry = NULL WHERE ResetToken = ?;",
              [hashedPassword, resetToken],
              (err, result) => {
                if (err) {
                  console.log(err);
                  res.status(500).json({ message: 'Error resetting password' });
                } else {
                  res.status(200).json({ message: 'Password reset successful' });
                }
              }
            );
          }
        }
      );
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error resetting password' });
    }
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
        const [rows] = await db.execute(query, [decoded.id]);

        if (!rows.length) {
            return res.status(404).json({ error: 'User not found' });
        }

        const employeeId = rows[0].EmployeeID;
        res.json({ employeeId });
    } catch (err) {
        res.status(403).json({ error: 'Invalid token' });
    }
    console.log('regis success');
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
    db.query("SELECT COUNT(`EmployeeID`) AS Employee FROM employee ;", (err, result) => {
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
                WHERE  DATE(checkin.CheckInDate) = CURDATE(); `,
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
                WHERE DATE(checkout.CheckOutDate) = CURDATE(); `,
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
    //const TitleID = req.body.TitleID;
    const TitleName = req.body.TitleName;
    const CreateDate = req.body.CreateDate;
    const CreateBy = req.body.CreateBy;
    const UpdateDate = req.body.UpdateDate;
    const UpdateBy = req.body.UpdateBy;

    db.query("INSERT INTO title ( TitleName ,CreateDate,CreateBy,UpdateDate,UpdateBy) VALUES(?,?,?,?,?);",
        [TitleName, CreateDate, CreateBy, UpdateDate, UpdateBy],
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
    db.query(`SELECT  EmployeeID, TitleName, FirstName, LastName, PhoneNumber, Email, DepartmentName, RoleName, CreateDate, CreateBy, UpdateDate, UpdateBy 
    FROM  employee ORDER BY EmployeeID ASC ;`,
     (err, result) => {
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
//import file Emp 
app.post('/import/employee', (req, res) => {
    const data = req.body;
    const values = data.map(({ EmployeeID, TitleName, FirstName, LastName, PhoneNumber, Email, DepartmentName, RoleName, CreateBy, UpdateBy }) =>
        `('${EmployeeID}', '${TitleName}', '${FirstName}', '${LastName}', '${PhoneNumber}', '${Email}', '${DepartmentName}', '${RoleName}', CURRENT_TIMESTAMP(), '${CreateBy}', CURRENT_TIMESTAMP(), '${UpdateBy}')`
    ).join(', ');
    const sql = `INSERT INTO employee (EmployeeID, TitleName, FirstName, LastName, PhoneNumber, Email, DepartmentName, RoleName, CreateDate, CreateBy, UpdateDate, UpdateBy) VALUES ${values}`;

    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error importing employee data");
        } else {
            console.log(result);
            res.status(200).send("Employee data imported successfully");
        }
    });
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
    // const DepartmentID = req.body.DepartmentID;
    const DepartmentName = req.body.DepartmentName;
    const CreateDate = req.body.CreateDate;
    const CreateBy = req.body.CreateBy;
    const UpdateDate = req.body.UpdateDate;
    const UpdateBy = req.body.UpdateBy;

    db.query("INSERT INTO department ( DepartmentName ,CreateDate,CreateBy,UpdateDate,UpdateBy) VALUES(?,?,?,?,?);",
        [DepartmentName, CreateDate, CreateBy, UpdateDate, UpdateBy],
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
    //const RoleID = req.body.RoleID;
    const RoleName = req.body.RoleName;
    const CreateDate = req.body.CreateDate;
    const CreateBy = req.body.CreateBy;
    const UpdateDate = req.body.UpdateDate;
    const UpdateBy = req.body.UpdateBy;

    db.query("INSERT INTO role ( RoleName ,CreateDate,CreateBy,UpdateDate,UpdateBy) VALUES(?,?,?,?,?);",
        [RoleName, CreateDate, CreateBy, UpdateDate, UpdateBy],
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
    db.query("SELECT * FROM  meetingroom ORDER BY RoomID ASC", (err, result) => {
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
    // const RoomID = req.body.RoomID;
    const RoomName = req.body.RoomName;
    const Capacity = req.body.Capacity;
    const CreateDate = req.body.CreateDate;
    const CreateBy = req.body.CreateBy;
    const UpdateDate = req.body.UpdateDate;
    const UpdateBy = req.body.UpdateBy;
    db.query("INSERT INTO meetingroom( RoomName, Capacity, CreateDate, CreateBy, UpdateDate, UpdateBy) VALUES(?,?,?,?,?,?);",
        [RoomName, Capacity, CreateDate, CreateBy, UpdateDate, UpdateBy],
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
    JOIN meetingroom m ON b.RoomID = m.RoomID
    WHERE b.Date >= DATE_SUB(CURRENT_DATE, INTERVAL 1 WEEK)
    ORDER BY BookingID DESC;`,
        (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                res.send(result);
            }
        })
})
app.get('/bookingmeetingAll', (req, res) => {
    db.query(`SELECT *
    FROM booking_approve b
    JOIN employee e ON b.EmployeeID = e.EmployeeID
    JOIN meetingroom m ON b.RoomID = m.RoomID
    WHERE b.Date >= DATE_SUB(CURRENT_DATE, INTERVAL 1 MONTH)
    ORDER BY BookingID ASC;`,
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
        [Status, Attendant, DateApprove, bookingID], (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                res.send("Values Updated");
            }
        })
    console.log('Update Aprrove success');
})
//news 
app.get('/news', (req, res) => {
    db.query("SELECT * FROM  news ORDER BY NewsNo ASC", (err, result) => {
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
    const Pin = req.body.Pin;
    const CreateBy = req.body.CreateBy;
    const UpdateDate = req.body.UpdateDate;
    const UpdateBy = req.body.UpdateBy;

    db.query("INSERT INTO news ( NewsDate, TopicNews,NewsDetail, Pin ,CreateBy, UpdateDate, UpdateBy) VALUES (?,?,?,?,?,?,?)",
        [ NewsDate, TopicNews, NewsDetail,Pin, CreateBy, UpdateDate, UpdateBy],
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
app.put("/news/edit/:newsNo", (req, res) => {
    const newsNo = req.params.newsNo;
    const NewsDate = req.body.NewsDate;
    const TopicNews = req.body.TopicNews;
    const NewsDetail = req.body.NewsDetail;
    const Pin = req.body.Pin;
    const CreateBy = req.body.CreateBy;
    const UpdateDate = req.body.UpdateDate;
    const UpdateBy = req.body.UpdateBy;

    db.query("UPDATE news SET  NewsDate = ? , TopicNews = ?, NewsDetail = ? ,Pin=? ,CreateBy =? , UpdateDate = ? , UpdateBy = ? WHERE NewsNo = ?",
        [NewsDate, TopicNews, NewsDetail,Pin, CreateBy, UpdateDate, UpdateBy, newsNo], (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                res.send("Values Updated");
            }
        })
    console.log('Update news success');
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
    db.query(`SELECT e.EmployeeID, e.TitleName, e.FirstName, e.LastName, e.DepartmentName, e.RoleName ,
         c.TransactionID,c.CheckInDate,c.CheckInTime,c.Location,c.Model
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

//checkout
app.get('/checkout', (req, res) => {
    db.query(`SELECT e.EmployeeID, e.TitleName, e.FirstName, e.LastName, e.DepartmentName, e.RoleName ,
    c.TransactionID,c.CheckOutDate,c.CheckOutTime,c.Location,c.Model
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

//day by day
app.get('/day/checkin', (req, res) => {
    db.query(`SELECT e.EmployeeID, e.TitleName, e.FirstName, e.LastName, e.DepartmentName, e.RoleName ,
    c.TransactionID,c.CheckInDate,c.CheckInTime,c.Location,c.Model
    FROM employee e 
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
    db.query(`SELECT e.EmployeeID, e.TitleName, e.FirstName, e.LastName, e.DepartmentName, e.RoleName ,
    c.TransactionID,c.CheckOutDate,c.CheckOutTime,c.Location,c.Model
    FROM employee e 
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
// แจ้งเตือน
app.get('/notificationCount', (req, res) => {
    db.query(`SELECT COUNT(Status) AS count FROM booking_approve b
    WHERE Status='Wait' AND b.Date >= DATE_SUB(CURRENT_DATE, INTERVAL 1 WEEK);`,
        (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                res.send(result);
            }
        })
})


// app.post('/uploadnews', upload.single('file'), async (req, res) => {
//     try {
//         const file = req.file;
//         const { html } = await readDocFile(file);

//         const sql = 'INSERT INTO news ( NewsDate, TopicNews,NewsDetail, CreateBy, UpdateDate, UpdateBy) VALUES (?,?,?,?,?,?)';
//         connection.query(sql, [NewsDate, TopicNews, NewsDetail, CreateBy, UpdateDate, UpdateBy], (err, results, fields) => {
//             if (err) {
//                 console.error('Error writing to database: ', err.stack);
//                 return res.status(500).json({ message: 'Internal server error' });
//             }

//             res.status(200).json({ message: 'Data inserted into database' });
//         });
//     } catch (err) {
//         console.error('Error processing file: ', err.stack);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

app.post('/import-doc', (req, res) => {

    const data = req.body;

    // Write data to MySQL database
    const sql = 'INSERT INTO `news`(`NewsDate`, `TopicNews`, `NewsDetail`, `CreateBy`, `UpdateDate`, `UpdateBy`) VALUES (?,?,?,?,?,?)';

    // db.query(sql, [ NewsDate, TopicNews, NewsDetail, CreateBy, UpdateDate, UpdateBy], (err, results, fields) => {
    db.query(sql, [data.NewsDate, data.TopicNews, data.NewsDetail, data.CreateBy, data.UpdateDate, data.UpdateBy], (err, results, fields) => {
        if (err) {
            console.error('Error writing to database: ', err.stack);
            res.status(500).json({ error: 'Error writing to database' });
        } else {
            res.status(200).json({ message: 'Data inserted successfully' });
        }
    });
    console.log('susecc');
});

app.listen('5001', () => {
    console.log('Server is runing o n port 5001');
})

