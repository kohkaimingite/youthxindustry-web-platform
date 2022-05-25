const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "sql_pass123^*",
    database: "fyp_db",
});

app.post("/register", (req, res) => {
    const name = req.body.name
    const password = req.body.password
    const email = req.body.email
    const age = req.body.age
    const gender = req.body.gender

    db.query(
        "INSERT INTO users (Name, Password, Email, Age, Gender) VALUES (?, ?, ?, ?, ?)",
        [name, password, email, age, gender],
        (err, result) => {
            if (err) {
                res.send({ err: err })
            }

            if (result.length > 0) {
                res.send({ message: "Not inserted"})
            } else {
                res.send({ message: "Inserted" })
            }
        }
    );
});

app.post("/login", (req, res) => {
    const name = req.body.name
    const password = req.body.password


    db.query(
        "SELECT * FROM users WHERE name = ? AND password = ?",
        [name, password],
        (err, result) => {
            if (err) {
                res.send({err : err})
            }

                if (result.length > 0) {
                    res.send(result)
                } else {
                    res.send({ message: "Wrong name or password"})
                }
            
            
        }
    );
});


app.listen(3001, () => {
    console.log("running server");
});
