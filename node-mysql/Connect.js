const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const app = express();

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true

}));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));


const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
}));



const db = mysql.createConnection({
    multipleStatements: true,
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
        "INSERT INTO users (RoleID, Name, Password, Email, DateCreated) VALUES (1, ?, ?, ?, curdate());",
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
        "INSERT INTO users (RoleID, Name, Password, Email, DateCreated) VALUES (2, ?, ?, ?, curdate());",
        [name, password, email],
        (err, result) => {
            if (err) {
                console.log(err);
            } else { res.send(result) };

        });
});

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
        res.send({ loggedIn: true, message: req.session.user[0].Name + " is logged in!" });

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

    });
});

app.get('/oppListing', function (req, res) {
    db.query("SELECT opportunities.OppID, Name, Description, Location, Address, Type FROM opportunities INNER JOIN users_have_opp ON opportunities.OppID = users_have_opp.OppID WHERE users_have_opp.UserID = ? ORDER BY opportunities.OppID;",
        [req.session.user[0].UserID],

        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        });
});


app.post("/addOppPartner", function (req, res) {
    const name = req.body.name;
    const description = req.body.description;
    const location = req.body.location;
    const address = req.body.address;
    const type = req.body.type;

    db.query(
        "INSERT INTO opportunities (Name, Description, Location, Address, Type) VALUES (?, ?, ?, ?, ?);SET @id = LAST_INSERT_ID(); INSERT INTO users_have_opp (UserID, OppID) VALUES (?, @id);",
        [name, description, location, address, type, req.session.user[0].UserID],
        (err, result) => {
            if (err) {
                console.log(err);
            } else { res.send(result) };
        });
});


app.post('/deleteOppPartner', (req, res) => {
    const oppId = req.body.oppId;

    db.query("DELETE FROM users_have_opp WHERE OppID = ? AND UserID = ?;DELETE FROM opportunities WHERE OppID = ?;",
        [oppId, req.session.user[0].UserID, oppId],
        (err, result) => {
            if (err) {
                console.log(err);
            } else { res.send(result) };
        });
});


app.post('/updateOppPartner', (req, res) => {
    const oppId = req.body.oppId;
    const name = req.body.name;
    const description = req.body.description;
    const location = req.body.location;
    const address = req.body.address;
    const type = req.body.type;

    db.query("UPDATE opportunities SET Name = ?, Description = ?, Location = ?, Address = ?, Type = ? WHERE OppID = ?",
        [name, description, location, address, type, oppId],
        (err, result) => {
            if (err) {
                console.log(err);
            } else { res.send(result) };

        });
});



app.get('/viewCompanyProfile', (req, res) => {
    db.query("SELECT * FROM users WHERE RoleID = ?;",
        [2],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        });
});


app.post('/getOppCards', (req, res) => {
    const UserID = req.body.UserID;
    db.query("SELECT opportunities.OppID, Name, Description, Location, Address, Type FROM opportunities INNER JOIN users_have_opp ON opportunities.OppID = users_have_opp.OppID WHERE users_have_opp.UserID = ? ORDER BY opportunities.OppID;",
        [UserID],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        });
});

app.listen(3001, () => {
    console.log("running server");
});
