var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var fs = require("fs");
var parse = require("url-parse");
var router = require("./src/router");
//var buffer = require("buffer");

var app = express();

app.listen(3030, function() {
    console.log("Application started");
});

app.use(express.static(path.join(__dirname, "public")));

router(app);
