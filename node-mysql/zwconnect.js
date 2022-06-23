// JavaScript source code for testing
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();
var corsOptions = {
    origin: "http://localhost:3000"
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
    console.log(`Server is running on port ${PORT}.`);
});


app.get('/user', (req, res) => {
    db.query("SELECT * from users", (err, result) => {
        if (err) {
            console.log(err);
        } else { res.send(result) };

    });
});

app.post('/EditUser', (req, res) => {
    const UserID = req.body.UserID;
    const RoleID = req.body.RoleID;
    const Name = req.body.Name;
    const Password = req.body.Password;
    const Email = req.body.Email;
    const Age = req.body.Age;
    const Gender = req.body.Gender;
    const UserBio = req.body.UserBio;
    const MobileNumber = req.body.MobileNumber;
    db.query("UPDATE users SET RoleID = ?, Name = ?, Password = ?, Email = ?, Age = ?, Gender = ?, UserBio = ?, ContactNumber = ? WHERE UserID =?",
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

app.post('/DeleteUser', (req, res) => {
    const UserID = req.body.UserID;
    db.query("DELETE FROM users WHERE UserID = ?",
        [UserID],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("User Information Deleted");
            }
        }
    )
})

app.get('/GetOppo', (req, res) => {
    db.query("SELECT * FROM opportunities",
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    )
})

app.post('/EditOppo', (req, res) => {
    const Name = req.body.Name;
    const OppID = req.body.OppID;
    db.query("UPDATE opportunities WHERE Name = ? AND OppID = ?",
        [Name, OppID],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Updated User Information!");
            }
        }
    )
})

app.post('/DeleteOppo', (req, res) => {
    const Name = req.body.Name;
    const OppID = req.body.OppID;
    db.query("DELETE FROM opportunities WHERE Name = ? AND OppID = ?",
        [Name, OppID],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Opportunity Information Deleted");
            }
        }
    )
})

app.post('/DeleteOppo', (req, res) => {
    db.query("DELETE FROM opportunities WHERE Name = ? AND OppID = ?",
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Opportunity Information Deleted");
            }
        }
    )
})