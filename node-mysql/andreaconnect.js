// JavaScript source code for testing
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();
var corsOptions = {
    origin: "http://localhost:3000"
};
var getUserRole = '';
//app.use(cors(corsOptions));

//app.use(express.json());
//app.use(cors());

//app.use(express.urlencoded({ extended: true }));
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
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
    user: "root",
    host: "127.0.0.1",
    password: "sql_pass123^*",
    database: "fyp_db",
});
app.get("/", (req, res) => {
    res.json({ message: "Welcome to bezkoder application." });
});

app.get("/test", (req, res) => {
    res.send({ message: "Welcome to bezkoder application." });
    console.log("lol");
});

app.get('/getCurrentUserRole', function (req, res) {
    db.query("SELECT RoleID FROM users WHERE UserID = ?;",
        [req.session.user[0].UserID],

        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    )
})


app.get('/Oppo', (req, res) => {
    db.query("SELECT*FROM opportunities ORDER BY OppID", (err, result) => {
        if (err) {
            console.log(err);
        } else { res.send(result) };

    });
});

app.post('/FavOppo', (req, res) => {
    const UserID = req.body.UserID;
    db.query("SELECT opportunities.OppID, Name, Description, Location, Address, Type FROM opportunities INNER JOIN users_have_fav ON opportunities.OppID = users_have_fav.OppID WHERE users_have_fav.UserID = 2 ORDER BY opportunities.OppID;",
        [UserID],
        (err, result) => {
        if (err) {
            console.log(err);
        } else { res.send(result) };

    });
});

app.post('/CheckFavOppo', (req, res) => {
    const UserID = req.body.UserID;
    const OppID = req.body.OppID;
    db.query("SELECT * FROM users_have_fav  WHERE UserID = 2 AND OppID = 0 ;",
        [UserID, OppID],
        (err, result) => {
            if (err) {
                console.log(err);
            } else { res.send(result) };

        });
});


app.get('/Check123FavOppo', (req, res) => {
    db.query("SELECT * FROM users_have_fav  WHERE EXISTS( SELECT users_have_fav WHERE UserID = 2 AND OppID = 696969 );", (err, result) => {
        if (err) {
            console.log(err);
        } else { res.send(result) };

    });
});
app.post('/deleteFav', (req, res) => {
    const OppID = req.body.OppID;
    const UserID = req.body.UserID;
    
    db.query('DELETE FROM users_have_fav WHERE OppID = ? AND UserID = ?;',
        [ OppID, UserID],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Deleted fav!");
            }
        }
    );

});

app.post('/addFav', (req, res) => {
    const OppID = req.body.OppID;
    const UserID = req.body.UserID;

    db.query('INSERT INTO users_have_fav (UserID, OppID) VALUE (?, ?);',
        [UserID, OppID ],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("added fav!");
            }
        }
    );

});
app.get('/getReview', (req, res) => {
    db.query("SELECT users_have_opp.UserID, users_have_opp.OppID, users_have_opp.Review, users_have_opp.Rating, opportunities.Name FROM users_have_opp INNER JOIN opportunities ON users_have_opp.OppID = opportunities.OppID WHERE Review IS NULL ORDER BY OppID", (err, result) => {
        if (err) {
            console.log(err);
        } else { res.send(result) };

    });
});

app.get('/getReview', (req, res) => {
    db.query("SELECT users_have_opp.UserID, users_have_opp.OppID, users_have_opp.Review, users_have_opp.Rating, opportunities.Name FROM users_have_opp INNER JOIN opportunities ON users_have_opp.OppID = opportunities.OppID WHERE Review IS NULL ORDER BY OppID", (err, result) => {
        if (err) {
            console.log(err);
        } else { res.send(result) };

    });
});
//SELECT users_have_opp.UserID, users_have_opp.OppID, users_have_opp.Review, users_have_opp.Rating, opportunities.Name FROM users_have_opp INNER JOIN opportunities ON users_have_opp.OppID = opportunities.OppID WHERE Review IS NULL ORDER BY OppID
//SELECT*FROM users_have_opp WHERE Review IS NULL ORDER BY OppID
app.post('/addReview', (req, res) => {
    const OppID = req.body.OppID;
    const UserID = req.body.UserID;
    const Review = req.body.Review;
    const Rating = req.body.Rating;
    db.query('UPDATE users_have_opp SET Review = ?, Rating = ?  WHERE OppID = ? AND UserID = ?;',
        [ Review, Rating, OppID, UserID],
        (err,result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Updateed review!");
            }
        }
    );

});

app.get('/Profile', (req, res) => {
    db.query("SELECT Name, Email, MobileNumber FROM users WHERE UserID =1", (err, result) => {
        if (err) {
            console.log(err);
        } else { res.send(result) };

    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

//============================================================================================================================

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

app.get("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return console.log(err);
        }
        res.send({ loggedIn: false });
        res.redirect("/login");
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
        }
    )
})


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


