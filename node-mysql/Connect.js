const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const sessions = require("express-session");

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
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
}));


var session;

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
                    res.send({ err: err });
                }

                if (result.length > 0) {
                    session = req.session;
                    session.userid = req.body.email;
                    console.log(req.session);
                    res.send({ message: session.userid })
                    
                    
                   

                } else {
                    res.send({ message: "Wrong email or password" });
                }


            }
        )
    } else {
        res.send({ message: "Email or password not entered" });
    }

});

app.get("/login", (req, res) => {
    if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user});
    } else {
        res.send({ loggedIn: false });
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


app.post('/deleteOppPartner', (req, res) => {
    const oppId = req.body.oppId;

    db.query("DELETE FROM users_have_opp WHERE OppID = ?",
        [oppId],
        (err, result) => {
            if (err) {
                console.log(err);
            } else { res.send(result) };

        });
});




app.listen(3001, () => {
    console.log("running server");
});
