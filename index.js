var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var fs = require("fs");
var parse = require("url-parse");
var router = require("./src/router");
//var buffer = require("buffer");

var app = express();

app.listen((process.env.PORT || 3030), function() {
    console.log("Application started at " + app.get("port"));
});

app.use(express.static(path.join(__dirname, "public")));

router(app);
