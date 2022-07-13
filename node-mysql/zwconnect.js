// JavaScript source code for testing
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const { createSearchParams } = require("react-router-dom");
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
    multipleStatements: true,
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

app.post('/oppoEdit', (req, res) => {
    const Name = req.body.name;
    const Description = req.body.description;
    const Location = req.body.location;
    const Address = req.body.address;
    const Type = req.body.type;
    const Qualification = req.body.qualification;
    const Pay = req.body.pay;
    const OppID = req.body.OppID;
    db.query("UPDATE opportunities SET Name = ?, Description = ?, Location = ?, Address = ?, Type = ?, Qualification = ?, Pay = ? WHERE OppID = ?",
        [Name, Description, Location, Address, Type, Qualification, Pay, OppID],
        (err, result) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving oppo."
                });
            } else {
                res.send("Updated Opportunity Information");
            }
        }
    )
})

app.post('/oppoDelete', (req, res) => {
    const OppID = req.body.OppID;
    db.query("DELETE FROM users_have_opp WHERE OppID = ?; DELETE FROM users_have_fav WHERE OppID = ?; DELETE FROM partner_have_opp WHERE OppID = ?; DELETE FROM opp_have_application WHERE OppID = ?; DELETE FROM opportunities WHERE OppID = ?;",
        [OppID, OppID, OppID, OppID, OppID],
        (err, result) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving oppo."
                });
            } else {
                res.send("Deleted Opportunity Information");
            }
        }
    )
    
})

// app.post('/oppoDelete', (req, res) => {
//     db.query("DELETE FROM users_have_fav WHERE OppID = ?",
//         [OppID],
//         (err, result) => {
//             if (err) {
//                 console.log(err);
//             } else {
//                 res.send("users_have_fav");
//             }
//         }
//     )
// })

// app.post('/oppoDelete', (req, res) => {
//     db.query("DELETE FROM partner_have_opp WHERE OppID = ?",
//         [OppID],
//         (err, result) => {
//             if (err) {
//                 console.log(err);
//             } else {
//                 res.send("partner_have_opp");
//             }
//         }
//     )
// })

// app.post('/oppoDelete', (req, res) => {
//     db.query("DELETE FROM opp_have_application WHERE OppID = ?",
//         [OppID],
//         (err, result) => {
//             if (err) {
//                 console.log(err);
//             } else {
//                 res.send("opp_have_application");
//             }
//         }
//     )
// })

// app.post('/oppoDelete', (req, res) => {
//     db.query("DELETE FROM opportunities WHERE OppID = ?",
//         [OppID],
//         (err, result) => {
//             if (err) {
//                 console.log(err);
//             } else {
//                 res.send("opportunities");
//             }
//         }
//     )
// })

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