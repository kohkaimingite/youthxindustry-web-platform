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

