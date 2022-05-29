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


app.post("/addlisting", (req, res) => {
    const name = req.body.name
    const description = req.body.description
    const location = req.body.location
    const address = req.body.Address
    const type = req.body.Type

    db.query(
        "INSERT INTO opportunities (Name, Description, Location, Address, Type) VALUES (?, ?, ?, ?, ?)",
        [name, description, location, address, type],
        (err, result) => {
            if (err) {
                console.log(err);
            } else { res.send(result) };

        });
});

app.post("/updatelisting", (req, res) => {
    const name = req.body.name
    const description = req.body.description
    const location = req.body.location
    const address = req.body.Address
    const type = req.body.Type
    const oppID = req.body.oppID

    db.query(
        "UPDATE opportunities SET Name = ?, Description = ?, Location = ?, Address = ?, Type = ? WHERE OppID = ? ",
        [name, description, location, address, type, oppID],
        (err, result) => {
            if (err) {
                console.log(err);
            } else { res.send(result) };

        });
});

app.post("/deletelisting", (req, res) => {
    const oppID = req.body.oppID

    db.query(
        "DELETE FROM opportunities WHERE OppID = ?",
        [OppID],
        (err, result) => {
            if (err) {
                console.log(err);
            } else { res.send(result) };

        });
});





app.listen(3001, () => {
    console.log("running server");
});
