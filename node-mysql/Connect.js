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


//Kai Ming
app.post("/registerUser", (req, res) => {
    const name = req.body.name;
    const password = req.body.password;
    const email = req.body.email;


    db.query(
        "INSERT INTO users (RoleID, Name, Password, Email, DateCreated, Confirmed) VALUES (1, ?, ?, ?, curdate(), 1);",
        [name, password, email],
        (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    res.sendStatus(409);
                } else {
                    console.log(err);
                }

            } else { res.send(result) };

        });
});

app.post("/registerPartner", (req, res) => {
    const name = req.body.name;
    const password = req.body.password;
    const email = req.body.email;
    db.query(
        "INSERT INTO users (RoleID, Name, Password, Email, DateCreated, Confirmed) VALUES (2, ?, ?, ?, curdate(), 0);",
        [name, password, email],
        (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    res.sendStatus(409);
                } else {
                    console.log(err);
                }

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

                if (result.length > 0 && result[0].Confirmed === 1) {
                    req.session.user = result;
                    res.send(result);
                    console.log(req.session.user);
                    next();

                } else if (result.length > 0 && result[0].Confirmed === 0) {
                    res.send({ message: "Account has not been verified yet" });
                }

                else {
                    res.send({ message: "Incorrect Combination" });
                }


            }
        )
    } else {
        res.send({ message: "Enter email and password" });
    }

});

app.get("/login", function (req, res) {
    if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user });

    } else {
        res.send({ loggedIn: false });
    }
});

app.get("/logout", function (req, res) {
    if (req.session.user) {
        db.query("UPDATE users SET LastLogged = curdate() WHERE UserID = ?;",
            [req.session.user[0].UserID],

            (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    res.send(result);
                }
            });
    }
    req.session.destroy(err => {
        if (err) {
            return console.log(err);
        }

    });
});

app.get("/oppListing", function (req, res) {
    if (req.session.user) {
        db.query("SELECT * FROM opportunities INNER JOIN partner_have_opp ON opportunities.OppID = partner_have_opp.OppID WHERE partner_have_opp.UserID = ? && Posted = 1 ORDER BY opportunities.OppID;",
            [req.session.user[0].UserID],

            (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    res.send(result);
                }
            });
    }
});


/*app.post("/addOppPartner", function (req, res) {
    const name = req.body.name;
    const description = req.body.description;
    const location = req.body.location;
    const address = req.body.address;
    const type = req.body.type;
    const qualification = req.body.qualification;
    const pay = req.body.pay;

    db.query(
        "INSERT INTO opportunities (Name, Description,Location, Address, Type, Qualification, Pay) VALUES (?, ?, ?, ?, ?, ?, ?);SET @id = LAST_INSERT_ID(); INSERT INTO partner_have_opp (UserID, OppID) VALUES (?, @id);",
        [name, description, location, address, type, qualification, pay, req.session.user[0].UserID],
        (err, result) => {
            if (err) {
                console.log(err);
            } else { res.send(result) };
        });
});*/


app.post("/deleteOppPartner", (req, res) => {
    const oppId = req.body.oppId;

    db.query("DELETE FROM partner_have_opp WHERE OppID = ? AND UserID = ?; DELETE FROM opportunities WHERE OppID = ?;DELETE FROM application WHERE OppID =?",
        [oppId, req.session.user[0].UserID, oppId, oppId],
        (err, result) => {
            if (err) {
                console.log(err);
            } else { res.send(result) };
        });
});


app.post("/updateOppPartner", (req, res) => {
    const oppId = req.body.oppId;
    const name = req.body.name;
    const description = req.body.description;
    const location = req.body.location;
    const address = req.body.address;
    const type = req.body.type;
    const qualification = req.body.qualification;
    const pay = req.body.pay;


    db.query("UPDATE opportunities SET Name = ?, Description = ?,Location = ?, Address = ?, Type = ?, Qualification =? , Pay = ? WHERE OppID = ?",
        [name, description, location, address, type, qualification, pay, oppId],
        (err, result) => {
            if (err) {
                console.log(err);
            } else { res.send(result) };

        });
});



app.get("/viewCompanyProfile", (req, res) => {
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


app.post("/getOppCards", (req, res) => {
    const UserID = req.body.UserID;
    db.query("SELECT * FROM opportunities INNER JOIN partner_have_opp ON opportunities.OppID = partner_have_opp.OppID WHERE partner_have_opp.UserID = ? && Posted = 1 ORDER BY opportunities.OppID;",
        [UserID],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        });
});


app.post("/getReviewRatingForCompany", (req, res) => {
    const UserID = req.body.UserID;
    db.query("SELECT *  FROM users_have_opp INNER JOIN partner_have_opp ON users_have_opp.OppID = partner_have_opp.OppID WHERE partner_have_opp.UserID = ? ORDER BY users_have_opp.OppID Desc; ",
        [UserID],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);

            }
        });
});


app.get("/getCompanyRatingStats", function (req, res) {
    db.query("SELECT * FROM users_have_opp INNER JOIN partner_have_opp ON users_have_opp.OppID = partner_have_opp.OppID WHERE partner_have_opp.UserID = ? && Rating IS NOT NULL ORDER BY users_have_opp.OppID Desc; ",
        [req.session.user[0].UserID],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
                console.log(result);
            }
        });
});

app.get("/getCompanyRatingStatsWithNull", function (req, res) {
    db.query("SELECT * FROM users_have_opp INNER JOIN partner_have_opp ON users_have_opp.OppID = partner_have_opp.OppID WHERE partner_have_opp.UserID = ? && Rating IS NULL ORDER BY users_have_opp.OppID Desc; ",
        [req.session.user[0].UserID],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
                console.log(result);
            }
        });
});

app.post('/AppForEmailConfirmation', (req, res) => {
    const AppID = req.body.AppID;
    db.query("SELECT application.AppID, opportunities.OppID, opportunities.Name, users.Email FROM application INNER JOIN opportunities ON application.OppID = opportunities.OppID INNER JOIN users ON application.UserID = users.UserID INNER JOIN partner_have_opp ON partner_have_opp.OppID = application.OppID WHERE AppID = ?;",
        [AppID],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
                console.log(result);
            }
        });
});
app.post('/OppForEmailConfirmation', (req, res) => {
    const OppID = req.body.OppID;
    db.query("SELECT users.Name, partner_have_opp.OppID FROM users INNER JOIN partner_have_opp ON users.UserID = partner_have_opp.UserID  WHERE OppID = ?;",
        [OppID],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
                console.log(result);
            }
        });
});

app.get("/oppListingWithStatus", function (req, res) {
    if (req.session.user) {
        db.query("SELECT opportunities.OppID, opportunities.Name, opportunities.Confirmed, Posted FROM opportunities INNER JOIN partner_have_opp ON opportunities.OppID = partner_have_opp.OppID WHERE partner_have_opp.UserID = ? && Posted = 0 ORDER BY opportunities.OppID;",
            [req.session.user[0].UserID],

            (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    res.send(result);
                }
            });
    }
});

app.post("/postApprovedOppo", function (req, res) {
        const OppID = req.body.OppID;
        db.query("UPDATE opportunities SET Posted = 1 WHERE OppID = ?;",
            [OppID],
            (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    res.send(result);
                }
            });  
});


//Andrea


app.post('/getSuggestedJobByType', function (req, res) {
    const OppID = req.body.OppID;
    const Type = req.body.Type;
    const Pay = req.body.Pay;
    db.query("SELECT Name, Location, Pay,OppID, ABS( Pay - ? ) AS Difference FROM opportunities WHERE OppID != ? AND confirmation = 1 AND posted = 1 AND Type = ? ORDER BY Difference LIMIT 3;",
        [Pay,OppID,Type],

        (err, result) => {
            if (err) {
                console.log(err)
                res.send(result);
            } else {
                res.send(result);
            }
        }
    )
})
app.post('/getOneOppoCompany', function (req, res) {
    const OppID = req.body.OppID;
    db.query("SELECT users.Name, users.UserBio, users.ContactNumber FROM opportunities INNER JOIN partner_have_opp ON partner_have_opp.OppID = opportunities.OppID INNER JOIN users ON users.UserID = partner_have_opp.UserID  WHERE opportunities.OppID = ? AND opportunities.confirmation = 1 AND opportunities.posted = 1;",
        [OppID],

        (err, result) => {
            if (err) {
                console.log(err)
                res.send(result);
            } else {
                res.send(result);
            }
        }
    )
})

app.post('/getOneOppo', function (req, res) {
    const OppID = req.body.OppID;
    db.query("SELECT * FROM opportunities WHERE OppID = ? AND opportunities.confirmation = 1 AND opportunities.posted = 1;",
        [OppID],

        (err, result) => {
            if (err) {
                console.log(err)
                res.send(result);
            } else {
                res.send(result);
            }
        }
    )
})
app.get('/getCurrentUserRole', function (req, res) {
    
    db.query("SELECT RoleID FROM users WHERE UserID = ?;",
        [req.session.user[0].UserID],

        (err, result) => {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                res.send(result);
            }
        });

});

app.post('/getOppoStatus', function (req, res) {
    const active = req.body.active;
    db.query("SELECT opportunities.OppID, opportunities.Name, opportunities.Description, opportunities.Location, opportunities.Address, opportunities.Type, opportunities.Qualification, opportunities.Pay FROM application INNER JOIN opportunities ON opportunities.OppID = application.OppID WHERE UserID = ? AND Status = ?;",
        [req.session.user[0].UserID, active],

        (err, result) => {
            if (err) {
                console.log(err)
                res.send(result);
            } else {
                res.send(result);
            }
        }
    )
})

app.get('/getUserOppoType', function (req, res) {
    db.query("SELECT opportunities.Type, COUNT(*) FROM users_have_opp INNER JOIN opportunities ON users_have_opp.OppID = opportunities.OppID WHERE users_have_opp.UserID = ? GROUP by opportunities.Type ORDER BY COUNT(*) DESC;;",
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
app.get('/getOppoStatusCount', function (req, res) {
    db.query("SELECT COUNT(*) AS Count FROM application WHERE UserID=? AND Status = 'Success' UNION ALL SELECT COUNT(*) AS Count FROM application WHERE UserID = ? AND Status = 'Pending' UNION ALL SELECT COUNT(*) AS Count FROM application WHERE UserID = ? AND Status = 'Rejected';",
        [req.session.user[0].UserID, req.session.user[0].UserID, req.session.user[0].UserID],

        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    )
})
app.post('/topOppo', (req, res) => {
    const topType = req.body.topType;
    db.query("SELECT*FROM opportunities WHERE TYPE = ?  UNION SELECT*FROM opportunities WHERE TYPE != ? AND confirmation = 1 AND posted = 1  ;",
        [topType, topType],
        (err, result) => {
            if (err) {
                console.log(err);
            } else { res.send(result) };

        });
});
app.post('/sortedOppo', (req, res) => {
    const topType = req.body.topType;
    db.query("SELECT*FROM opportunities WHERE TYPE != ? ORDER BY OppID  AND confirmation = 1 AND posted = 1  ",
        [topType],
        (err, result) => {
            if (err) {
                console.log(err);
            } else { res.send(result) };

        });
});

app.get('/Oppo', (req, res) => {
    db.query("SELECT OppID, Name, Location, Type, Qualification, Pay FROM opportunities WHERE   confirmation = 1 AND posted = 1  ORDER BY OppID", (err, result) => {
        if (err) {
            console.log(err);
        } else { res.send(result) };

    });
});

app.post('/FavOppo', (req, res) => {
    const UserID = req.body.UserID;
    db.query("SELECT opportunities.OppID, Name, Description, Location, Address, Type, Qualification, Pay FROM opportunities INNER JOIN users_have_fav ON opportunities.OppID = users_have_fav.OppID WHERE users_have_fav.UserID = ?  AND opportunities.confirmation = 1 AND opportunities.posted = 1  ORDER BY opportunities.OppID;",
        [req.session.user[0].UserID],
        (err, result) => {
            if (err) {
                console.log(err);
            } else { res.send(result) };

        });
});

app.post('/CheckFavOppo', (req, res) => {
    const UserID = req.body.UserID;
    const OppID = req.body.OppID;
    db.query("SELECT * FROM users_have_fav  WHERE UserID = ? AND OppID = ? AND opportunities.confirmation = 1 AND opportunities.posted = 1;",
        [req.session.user[0].UserID, OppID],
        (err, result) => {
            if (err) {
                console.log(err);
            } else { res.send(result) };

        });
});



app.post('/deleteFav', (req, res) => {
    const OppID = req.body.OppID;
    const UserID = req.body.UserID;

    db.query('DELETE FROM users_have_fav WHERE OppID = ? AND UserID = ?;',
        [OppID, req.session.user[0].UserID],
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
        [req.session.user[0].UserID, OppID],
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
    db.query("SELECT users_have_opp.UserID, users_have_opp.OppID, users_have_opp.Review, users_have_opp.Rating, opportunities.Name FROM users_have_opp INNER JOIN opportunities ON users_have_opp.OppID = opportunities.OppID WHERE Review IS NULL AND users_have_opp.UserID = ? AND opportunities.confirmation = 1 AND opportunities.posted = 1 ORDER BY OppID",
        [req.session.user[0].UserID],
        (err, result) => {
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
        [Review, Rating, OppID, req.session.user[0].UserID],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Updateed review!");
            }
        }
    );

});

//Xiao Quan

app.get('/Profile', (req, res) => {
    const emailcheck = req.body.emailcheck;
    db.query("SELECT Userid, Name, Email, ContactNumber, Resume, UserBio FROM users WHERE UserID = ?",
        [req.session.user[0].UserID],
        (err, result) => {
        if (err) {
            console.log(err);
        } else { res.send(result) };

    });
});

app.post('/EditUBio', (req, res) => {
    const Bio = req.body.Bio;
    db.query('UPDATE users SET Userbio = ? WHERE userid = ?;',
        [Bio, req.session.user[0].UserID],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Updated User Bio!");
            }
        }
    )
})

app.post('/EditUNumber', (req, res) => {
    const Number = req.body.Number;
    db.query('UPDATE users SET ContactNumber = ? WHERE userid = ?;',
        [Number, req.session.user[0].UserID],
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
    db.query('UPDATE users UserBio = ? WHERE UserID = ?;',
        [Bio, req.session.user[0].UserID],
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
    db.query('UPDATE users SET ContactNumber = ? WHERE UserID = ?;',
        [Number, req.session.user[0].UserID],
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
    db.query("SELECT UserID, Name, Email, UserBio, ContactNumber FROM users WHERE UserID = ?;",
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

app.get('/Applications', (req, res) => {
    db.query("SELECT application.AppID, opportunities.OppID, opportunities.Name, users.ContactNumber, users.Email, application.Description, application.Status FROM application INNER JOIN opportunities ON application.OppID = opportunities.OppID INNER JOIN users ON application.UserID = users.UserID INNER JOIN partner_have_opp ON partner_have_opp.OppID = application.OppID WHERE partner_have_opp.UserID = ? AND application.status='Pending';",
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

app.post('/EditUResume', (req, res) => {
    const Resume = req.body.Resume
    db.query("UPDATE users SET Resume = ? WHERE UserID = ?;",
        [Resume, req.session.user[0].UserID],
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
    db.query("INSERT INTO application (UserID, OppID, Description, Status) VALUES (?, ?, ?, 'Pending')",
        [req.session.user[0].UserID, OppID, desc],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Submitted Application!");
            }
        });
});


app.post('/AcceptApplication', (req, res) => {
    const AppID = req.body.AppID;
    db.query("UPDATE application SET Status = 'Success' WHERE AppID = ?;",
        [AppID],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result)
            };

        });
});

app.post('/RejectApplication', (req, res) => {
    const AppID = req.body.AppID;
    db.query("UPDATE application SET Status = 'Rejected' WHERE AppID = ?;",
        [AppID],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result)
            };

        });
});

app.post('/GetOppo1', (req, res) => {
    const OppID = req.body.OppID;
    db.query("SELECT * FROM opportunities WHERE OppID = ? AND confirmation = 1 AND posted = 1",
        [OppID],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result)
            };

        });
});

app.post('/NewOppo', (req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const location = req.body.location;
    const address = req.body.address;
    const type = req.body.type;
    const qualification = req.body.qualification;
    const pay = req.body.pay;
    db.query("INSERT INTO opportunities (Name,Description,Location,Address,Type, Qualification, Pay, confirmation, posted) VALUES (?, ?, ?, ?, ?, ?, ?, 0, 0)",
        [name, description, location, address, type, qualification, pay],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result)
            };

        });
});

const outputfile = "Resume.docx";


app.get('/getBlob', async function (req, res) {
    db.query("SELECT Resume FROM users WHERE userID = ?",
        [req.session.user[0].UserID],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                const data = result.data;
                const buf = new Buffer(data, "binary");
                fs.writeFileSync(outputfile, buf);
                console.log("New Output File: ", outputfile)
            };
        });
});

app.get('/CheckOppo', (req, res) => {
    db.query("SELECT * FROM opportunities WHERE confirmation = 0 ",
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result)
            }
        });
});

app.post('/AcceptOppo', (req, res) => {
    const OppID = req.body.OppID;
    db.query("UPDATE opportunities SET confirmation = 1 WHERE OppID = ?;",
        [OppID],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result)
            };
            
        });
});

app.post('/RejectOppo', (req, res) => {
    const OppID = req.body.OppID;
    db.query("UPDATE opportunities SET confirmation = 2 WHERE OppID = ?;",
        [OppID],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result)
            };

        });
});


//Zhi Wei

app.get('/apUser', (req, res) => {
    db.query("SELECT * FROM users INNER JOIN roles ON roles.RoleID = users.RoleID WHERE users.RoleID = 1 AND users.Confirmed = 1",
    (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result)
        }
    });
});

app.post('/apUser', (req, res) => {
    const RoleID = req.body.RoleID;
    const Name = req.body.name;
    const Password = req.body.password;
    const Email = req.body.email;
    const Age = req.body.age;
    const Gender = req.body.gender;
    const UserBio = req.body.userBio;
    const ContactNumber = req.body.contactNumber;
    const UserID = req.body.UserID;
    db.query("UPDATE users SET RoleID = ?, Name = ?, Password = ?, Email = ?, Age = ?, Gender = ?, UserBio = ?, ContactNumber = ? WHERE UserID = ?",
        [RoleID, Name, Password, Email, Age, Gender, UserBio, ContactNumber, UserID],
        (err, result) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving user."
                });
            } else {
                res.send("User edit success.");
            }
    });
});

app.post('/apUserDelete', (req, res) => {
    const UserID = req.body.UserID;
    db.query("DELETE FROM users_have_opp WHERE UserID = ?; DELETE FROM users_have_fav WHERE UserID = ?; DELETE FROM partner_have_opp WHERE UserID = ?; DELETE FROM application WHERE UserID = ?; DELETE FROM users WHERE UserID = ?;",
        [UserID, UserID, UserID, UserID, UserID],
        (err, result) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving user."
                });
            } else {
                res.send("User delete success.");
            }
    });
});

app.get('/apOppo', (req, res) => {
    db.query("SELECT * FROM opportunities",
    (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.post('/apOppo', (req, res) => {
    const Name = req.body.name;
    const Description = req.body.description;
    const Location = req.body.location;
    const Address = req.body.address;
    const Type = req.body.type;
    const Qualification = req.body.qualification;
    const Pay = req.body.pay;
    const OppID = req.body.OppID;
    db.query("UPDATE opportunities SET Name = ?, Description = ?, Location = ?, Address = ?, Type = ?, Qualification = ?, Pay = ? WHERE OppID = ?",
        [Name, Description, Location, Address, Type, Qualification, Pay, OppID],
        (err, result) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving opportunity."
                });
            } else {
                res.send("Oppo edit success.");
            }
    });
});

app.post('/apOppoDelete', (req, res) => {
    const OppID = req.body.OppID;
    db.query("DELETE FROM users_have_opp WHERE OppID = ?; DELETE FROM users_have_fav WHERE OppID = ?; DELETE FROM partner_have_opp WHERE OppID = ?; DELETE FROM application WHERE OppID = ?; DELETE FROM opportunities WHERE OppID = ?;",
        [OppID, OppID, OppID, OppID, OppID],
        (err, result) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving opportunity."
                });
            } else {
                res.send("Oppo delete success.");
            }
    });
});

app.get('/apPartner', (req, res) => {
    db.query("SELECT * FROM users INNER JOIN roles ON roles.RoleID = users.RoleID WHERE users.RoleID = 2 AND users.Confirmed = 1",
    (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.get('/apPartnerConfirm', (req, res) => {
    db.query("SELECT users.UserID, users.Name, users.Email, users.UserBio, users.ContactNumber FROM users INNER JOIN roles ON roles.RoleID = users.RoleID WHERE users.RoleID = 2 AND users.Confirmed = 0",
    (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.post('/apConfirmRegistration', (req, res) => {
    const UserID = req.body.UserID;
    db.query("UPDATE users SET Confirmed = 1 WHERE UserID = ?",
    [UserID],
    (err, result) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving user."
            });
        } else {
            res.send("Updated Partner Registration.");
        }
    });
});

app.post('/apPartner', (req, res) => {
    const RoleID = req.body.RoleID;
    const Name = req.body.name;
    const Password = req.body.password;
    const Email = req.body.email;
    const UserBio = req.body.userBio;
    const ContactNumber = req.body.contactNumber;
    const UserID = req.body.UserID;
    db.query("UPDATE users SET RoleID = ?, Name = ?, Password = ?, Email = ?, UserBio = ?, ContactNumber = ? WHERE UserID = ?",
        [RoleID, Name, Password, Email, UserBio, ContactNumber, UserID],
        (err, result) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving partner."
                });
            } else {
                res.send("Updated Partner Information.");
            }
    });
});

app.post('/apPartnerDelete', (req, res) => {
    const UserID = req.body.UserID;
    db.query("DELETE FROM users_have_opp WHERE UserID = ?; DELETE FROM users_have_fav WHERE UserID = ?; DELETE FROM partner_have_opp WHERE UserID = ?; DELETE FROM application WHERE UserID = ?; DELETE FROM users WHERE UserID = ?;",
        [UserID, UserID, UserID, UserID, UserID],
        (err, result) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieve partner."
                });
            } else {
                res.send("Partner Information Deleted.");
            }
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is currently running on port ${PORT}.`);
});