
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
    db.query("SELECT Userid, Name, Email, ContactNumber, Resume, UserBio FROM users WHERE UserID = 2",(err, result) => {
        if (err) {
            console.log(err);
        } else { res.send(result) };

    });
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

app.post('/EditUBio', (req, res) => {
    const Bio = req.body.Bio;
    db.query('UPDATE users SET Userbio = ? WHERE userid = 2;',
    [Bio],
        (err, result) => {
            if(err) {
                console.log(err);
            } else {
                res.send("Updated User Bio!");
            }
        }
    )
})

app.post('/EditUNumber', (req, res) => {
    const Number = req.body.Number;
    db.query('UPDATE users SET ContactNumber = ? WHERE userid = 2;',
        [Number],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Updated Mobile Number!");
            }
        }
    )
})

app.post('/EditCBio', (req, res) => {
    const Bio = req.body.Bio;
    db.query('UPDATE users UserBio = ? WHERE UserID = 1;',
        [Bio],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Updated Company Bio!");
            }
        }
    )
})

app.post('/EditCNumber', (req, res) => {
    const Number = req.body.Number;
    db.query('UPDATE users SET ContactNumber = ? WHERE UserID = 1;',
        [Number],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Updated Company Contact Number!");
            }
        }
    )
})


app.get('/Company', (req, res) => {
    db.query("SELECT UserID, Name, Email, UserBio, ContactNumber FROM users WHERE UserID = 1;",
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

app.post('/EditUResume', (req, res) => {
    const Resume = req.body.Resume
    db.query("UPDATE users SET Resume = ? WHERE UserID = 2;",
        [Resume],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Updated Resume!");
            }
        }
    )

})

app.post('/DeleteApplication', (req, res) => {
    const ID = req.body.ID
    db.query("DELETE FROM application WHERE UserID = 1 AND AppID = ?",
        [ID],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Updated Resume!");
            }
        }
    )
})

app.post('/SubmitApplication', (req, res) => {
    const desc = req.body.desc
    const OppID = req.body.OppID
    const UserID = req.body.UserID
    db.query("INSERT INTO application (OppID, UserID, Description, Status) VALUES (?, ?, ?, 'pending')"),
        [OppID, UserID, desc],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Submitted Application!");
            }
        }
    }
)

