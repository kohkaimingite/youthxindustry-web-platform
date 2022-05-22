const express = require("express");
const mysql = require("mysql");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "sql_pass123^*",
    database: "fyp_db"
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("MySQL Connected!");
});

const app = express();


app.listen('8080', () => {
    console.log('Server started on port 8080')
})

