// JavaScript source code for testing
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();

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

app.post('/EditUser', (req, res) => {
    db.query("UPDATE users SET RoleID = ?, Name = ?, Password = ?, Email = ?, Age = ?, Gender = ?, UserBio = ?, MobileNumber = ?"
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
    db.query("DELETE FROM users WHERE Name = ? AND UserID = ?"
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("User Information Deleted");
            }
        }
    )
})

app.post('/EditOppo', (req, res) => {
    db.query("UPDATE opportunities WHERE Name = ? AND OppID = ?"
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
    db.query("DELETE FROM opportunities WHERE Name = ? AND OppID = ?"
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Opportunity Information Deleted");
            }
        }
    )
})