var express = require("express");
var router = express.Router();
const fs = require("fs");
const { join } = require("path");

/* Visit http://localhost:3000/resume to download resume */
router.get("/", function (req, res, next) {
  // Line 61 of this file shows how to get a Buffer from blob in mysql
  // https://gist.github.com/akirattii/86e2eda8e110976cce144c991e9cada8#file-example-read-write-mysql-blob-js-L61
  // In this example I create a Buffer from a file that I have locally, but you should be creating a Buffer as per example linked above

  const buf = Buffer.from(
    fs.readFileSync(join(__dirname, "..", "assets", "dummy.pdf"), "binary"), // This line should be replaced by blob data read from mysql
    "binary"
  );

  const fileName = "resume.pdf";
  res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
  res.setHeader("Content-Type", "application/pdf");
  res.send(buf);
});

module.exports = router;
