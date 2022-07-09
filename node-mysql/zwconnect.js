// JavaScript source code for testing
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();
var corsOptions = {
    origin: "http://localhost:3000",
    credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "Welcome to bezkoder application." });
});

app.get("/test", (req, res) => {
    res.send({ message: "Welcome to bezkoder application." });
    console.log("lol");
});

const db = mysql.createConnection({
    user: "root",
    host: "127.0.0.1",
    password: "sql_pass123^*",
    database: "fyp_db",
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is currently running on port ${PORT}.`);
});


app.get('/user', (req, res) => {
    db.query("SELECT * from users INNER JOIN roles ON roles.RoleID = users.RoleID WHERE users.RoleID = 1",
    (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result)
        };
    });
});

app.post('/userEdit', (req, res) => {
    const UserID = req.body.UserID;
    const RoleID = req.body.RoleID;
    const Name = req.body.Name;
    const Password = req.body.Password;
    const Email = req.body.Email;
    const Age = req.body.Age;
    const Gender = req.body.Gender;
    const UserBio = req.body.UserBio;
    const MobileNumber = req.body.MobileNumber;
    db.query("UPDATE users SET RoleID = ?, Name = ?, Password = ?, Email = ?, Age = ?, Gender = ?, UserBio = ?, ContactNumber = ? WHERE UserID = ?",
        [RoleID, Name, Password, Email, Age, Gender, UserBio, MobileNumber, UserID],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Updated User Information!");
            }
        }
    )
})

app.post('/userDelete', (req, res) => {
    const UserID = req.body.UserID;
    db.query("DELETE FROM users WHERE UserID = ?",
        [UserID],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("User Information Deleted.");
            }
        }
    )
})

app.get('/oppo', (req, res) => {
    db.query("SELECT * FROM opportunities",
    (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        };
    });
});

app.post('/EditOppo', (req, res) => {
    const OppID = req.body.OppID;
    const Name = req.body.Name;
    const Description = req.body.Description;
    const Location = req.body.Location;
    const Address = req.body.Address;
    const Type = req.body.Type;
    const Qualification = req.body.Qualification;
    const Pay = req.body.Pay;
    db.query("UPDATE opportunities SET OppID = ?, Name = ?, Description = ?, Location = ?, Address = ?, Type = ?, Qualification = ?, Pay = ? WHERE OppID = ?",
        [OppID, Name, Description, Location, Address, Type, Qualification, Pay],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Updated User Information!");
            }
        }
    )
})

app.post('/oppoDelete', (req, res) => {
    const OppID = req.body.OppID;
    const Name = req.body.Name;
    db.query("DELETE FROM opportunities WHERE OppID = ?",
        [OppID],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Opportunity Information Deleted.");
            }
        }
    )
})

app.get('/partner', (req, res) => {
    db.query("SELECT u.UserID, u.Name, u.UserBio, u.ContactNumber FROM users u INNER JOIN roles r ON r.RoleID = u.RoleID WHERE u.RoleID = 2", (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    )
})

// app.post('/partnerEdit', (req, res) => {
//     db.query("DELETE FROM user INNER JOIN roles ON roles.RoleID = user.RoleID WHERE user.RoleID = 2", (err, result) => {
//             if (err) {
//                 console.log(err);
//             } else {
//                 res.send("Partner successfully deleted!");
//             }
//         }
//     )
// })

app.post('/partnerDelete', (req, res) => {
    db.query("DELETE FROM user INNER JOIN roles ON roles.RoleID = user.RoleID WHERE user.RoleID = 2", (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Partner successfully deleted!");
            }
        }
    )
})