// JavaScript source code for testing
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const { createSearchParams } = require("react-router-dom");
const app = express();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
var corsOptions = {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
};

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
}));

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

//================================================================================

app.get('/getCurrentUserRole', function (req, res) {
    db.query("SELECT RoleID FROM users WHERE UserID = ?;",
        [req.session.user[0].UserID],

        (err, result) => {
            if (err) {
                console.log(err)
                res.send(result);
            }else {
                res.send(result);
            }
        }
    )
})

app.post("/login", (req, res, next) => {
    const email = req.body.email
    const password = req.body.password

    if (email && password) {
        db.query(
            "SELECT * FROM users WHERE Email = ? AND Password = ?;",
            [email, password],
            (err, result) => {
                if (err) {
                    res.send({ err: err });
                }

                if (result.length > 0) {
                    req.session.user = result;
                    res.send(result);
                    console.log(req.session.user);
                    getUserRole = req.session.user[0].RoleID;
                    console.log(getUserRole);
                    next();

                } else {
                    res.send({ message: "Incorrect Combination!" });
                }


            }
        )
    } else {
        res.send({ message: "Please enter email and password!" });
    }

});

app.get("/login", function (req, res) {
    if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user });

    } else {
        res.send({ loggedIn: false });
    }
});

app.get("/logout", function (req, res) {
    var loggedOutName = req.session.user[0].Name
    req.session.destroy(err => {
        if (err) {
            return console.log(err);
        }
        res.send({ message: loggedOutName + " is logged out!" });
        getUserRole = '0';
        console.log(getUserRole);

    });
});

//================================================================================

app.get('/apUser', (req, res) => {
    db.query("SELECT * FROM users INNER JOIN roles ON roles.RoleID = users.RoleID WHERE users.RoleID = 1 AND users.Confirmed = 1",
    (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result)
        }
    });
});

app.post('/apUser', (req, res) => {
    const RoleID = req.body.RoleID;
    const Name = req.body.name;
    const Password = req.body.password;
    const Email = req.body.email;
    const Age = req.body.age;
    const Gender = req.body.gender;
    const UserBio = req.body.userBio;
    const ContactNumber = req.body.contactNumber;
    const UserID = req.body.UserID;
    db.query("UPDATE users SET RoleID = ?, Name = ?, Password = ?, Email = ?, Age = ?, Gender = ?, UserBio = ?, ContactNumber = ? WHERE UserID = ?",
        [RoleID, Name, Password, Email, Age, Gender, UserBio, ContactNumber, UserID],
        (err, result) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving user."
                });
            } else {
                res.send("User edit success.");
            }
    });
});

app.post('/apUserDelete', (req, res) => {
    const UserID = req.body.UserID;
    db.query("DELETE FROM users_have_opp WHERE UserID = ?; DELETE FROM users_have_fav WHERE UserID = ?; DELETE FROM partner_have_opp WHERE UserID = ?; DELETE FROM application WHERE UserID = ?; DELETE FROM users WHERE UserID = ?;",
        [UserID, UserID, UserID, UserID, UserID],
        (err, result) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving user."
                });
            } else {
                res.send("User delete success.");
            }
    });
});

app.get('/apOppo', (req, res) => {
    db.query("SELECT * FROM opportunities WHERE Confirmed = 1",
    (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.post('/apOppo', (req, res) => {
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
                    message: err.message || "Some error occurred while retrieving opportunity."
                });
            } else {
                res.send("Oppo edit success.");
            }
    });
});

app.post('/apOppoDelete', (req, res) => {
    const OppID = req.body.OppID;
    db.query("DELETE FROM users_have_opp WHERE OppID = ?; DELETE FROM users_have_fav WHERE OppID = ?; DELETE FROM partner_have_opp WHERE OppID = ?; DELETE FROM application WHERE OppID = ?; DELETE FROM opportunities WHERE OppID = ?;",
        [OppID, OppID, OppID, OppID, OppID],
        (err, result) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving opportunity."
                });
            } else {
                res.send("Oppo delete success.");
            }
    });
});

app.get('/apPartner', (req, res) => {
    db.query("SELECT * FROM users INNER JOIN roles ON roles.RoleID = users.RoleID WHERE users.RoleID = 2 AND users.Confirmed = 1",
    (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.get('/apPartnerConfirm', (req, res) => {
    db.query("SELECT users.UserID, users.Name, users.Email, users.UserBio, users.ContactNumber FROM users INNER JOIN roles ON roles.RoleID = users.RoleID WHERE users.RoleID = 2 AND users.Confirmed = 0",
    (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.post('/apConfirmRegistration', (req, res) => {
    const UserID = req.body.UserID;
    db.query("UPDATE users SET Confirmed = 1 WHERE UserID = ?",
    [UserID],
    (err, result) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving user."
            });
        } else {
            res.send("Updated Partner Registration.");
        }
    });
});

app.post('/apPartner', (req, res) => {
    const RoleID = req.body.RoleID;
    const Name = req.body.name;
    const Password = req.body.password;
    const Email = req.body.email;
    const UserBio = req.body.userBio;
    const ContactNumber = req.body.contactNumber;
    const UserID = req.body.UserID;
    db.query("UPDATE users SET RoleID = ?, Name = ?, Password = ?, Email = ?, UserBio = ?, ContactNumber = ? WHERE UserID = ?",
        [RoleID, Name, Password, Email, UserBio, ContactNumber, UserID],
        (err, result) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving partner."
                });
            } else {
                res.send("Updated Partner Information.");
            }
    });
});

app.post('/apPartnerDelete', (req, res) => {
    const UserID = req.body.UserID;
    db.query("DELETE FROM users_have_opp WHERE UserID = ?; DELETE FROM users_have_fav WHERE UserID = ?; DELETE FROM partner_have_opp WHERE UserID = ?; DELETE FROM application WHERE UserID = ?; DELETE FROM users WHERE UserID = ?;",
        [UserID, UserID, UserID, UserID, UserID],
        (err, result) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieve partner."
                });
            } else {
                res.send("Partner Information Deleted.");
            }
    });
});

app.get('/apReview', (req, res) => {
    db.query("SELECT users_have_opp.UserID, users.Name, users_have_opp.OppID, users_have_opp.Review, users_have_opp.Rating FROM users_have_opp INNER JOIN users on users.UserID = users_have_opp.UserID WHERE users_have_opp.Review IS NOT NULL AND users_have_opp.Rating IS NOT NULL;",
    (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});