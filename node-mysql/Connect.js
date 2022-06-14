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



app.post("/registerUser", (req, res) => {
    const name = req.body.name;
    const password = req.body.password;
    const email = req.body.email;

    db.query(
        "INSERT INTO users (RoleID, Name, Password, Email, DateCreated) VALUES (1, ?, ?, ?, curdate())",
        [name, password, email],
        (err, result) => {
            if (err) {
                console.log(err);
            } else { res.send(result) };

        });
});

app.post("/registerPartner", (req, res) => {
    const name = req.body.name;
    const password = req.body.password;
    const email = req.body.email;

    db.query(
        "INSERT INTO users (RoleID, Name, Password, Email, DateCreated) VALUES (2, ?, ?, ?, curdate())",
        [name, password, email],
        (err, result) => {
            if (err) {
                console.log(err);
            } else { res.send(result) };

        });
});

app.post("/checkUser", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;

    db.query(
        "SELECT * FROM users WHERE Name = ? OR Email = ?",
        [name, email],
        (err, result) => {
            if (err) {
                console.log(err);
            } else { res.send(result) };

        });
});


app.post("/login", (req, res) => {
    const email = req.body.email
    const password = req.body.password

    if (email && password) {
        db.query(
            "SELECT * FROM users WHERE Email = ? AND Password = ?",
            [email, password],
            (err, result) => {
                if (err) {
                    res.send({ err: err })
                }

                if (result.length > 0) {
                    res.send({ message: "Correct Combination" })



                } else {
                    res.send({ message: "Wrong name or password" })
                }


            }
        )
    } else {
        res.send({ message: "Email or password not entered" })
    }

});



app.get('/oppListing', (req, res) => {
    const UserID = req.body.UserID;
    db.query("SELECT opportunities.OppID, Name, Description, Location, Address, Type FROM opportunities INNER JOIN users_have_opp ON opportunities.OppID = users_have_opp.OppID WHERE users_have_opp.UserID = 2 ORDER BY opportunities.OppID;",
        [UserID],

        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    )
})


app.post("/addOppPartner", (req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const location = req.body.location;
    const address = req.body.address;
    const type = req.body.type;

    db.query(
        "INSERT INTO opportunities (Name, Description, Location, Address, Type) VALUES (?, ?, ?, ?, ?)",
        [name, description, location, address, type],
        (err, result) => {
            if (err) {
                console.log(err);
            } else { res.send(result) };

        });
});



app.listen(3001, () => {
    console.log("running server");
});
