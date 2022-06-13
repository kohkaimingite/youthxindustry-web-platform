
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
//app.use(cors());

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

app.get('/Profile', (req, res) => {
    const emailcheck = req.body.emailcheck;
    db.query("SELECT userid, name, email, MobileNumber, userbio FROM users WHERE UserID = 1",(err, result) => {
        if (err) {
            console.log(err);
        } else { res.send(result) };

    });
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

app.post('/EditProfile', (req, res) => {
    const Email = req.body.Email;
    const Number = req.body.Number;
    const Bio = req.body.Bio;
    db.query('UPDATE users SET email = ?, MobileNumber = ?, Userbio = ? WHERE userid = 1;',
    [Email, Number, Bio],
        (err, result) => {
            if(err) {
                console.log(err);
            } else {
                res.send("Updated Information!");
            }
        }
    )
})

app.post('/EditCompany', (req, res) => {
    const Email = req.body.Email;
    const Number = req.body.Number;
    const Bio = req.body.Bio;
    db.query('UPDATE partners SET Email = ?, ContactNumber = ?, PartnerBio = ? WHERE PartnerID = 1;',
        [Email, Number, Bio],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Updated Information!");
            }
        }
    )
})


app.get('/Company', (req, res) => {
    db.query("SELECT partnerID, Name, Email, PartnerBio, ContactNumber FROM partners WHERE PartnerID = 1;",
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    )
})

app.get('/Applications', (req, res) => {
    db.query("SELECT OppID, Status, Name, Location FROM application INNER JOIN Opportunities ON application.OppID = opportunities.OppID WHERE UserID = 1;",
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    )
})