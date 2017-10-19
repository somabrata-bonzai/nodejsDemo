var service = require("./service/mysql");
var geocodeService = require("./service/geocode");
var XLSX = require("node-xlsx");

var bodyParser = require("body-parser");
var parse = require("url-parse");
const fileUpload = require("express-fileupload");

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app) {
    app.use(bodyParser.json());
    app.use(fileUpload());

    app.use(function(req, res, next) {
        res.setHeader("Content-Type", "application/json");
        next();
    });

    app.post("/map/uplaodFile", function(req, res) {
        console.log(req.files.excel.data);
        // Or var xlsx = require('node-xlsx').default;

        // Parse a buffer
        const workSheetsFromBuffer = XLSX.parse(req.files.excel.data);
        var data = workSheetsFromBuffer[0].data;
        var resObj = [];
        data.map(function(addr, index) {
            if (index === 0) {
                return;
            }
            var address = addr[0] + addr[1] + addr[2] + addr[3];
            geocodeService.getLatLng({ address: address }, function(err, results) {
                resObj.push(err ? null : results[0]);
                if (resObj.length === data.length - 1) {
                    res.send({
                        status: true,
                        msg: "User created",
                        result: resObj,
                    });
                }
            });
        });
    });

    app.post("/map/getLatLng", urlencodedParser, function(req, res) {
        var address = req.body.address;
        var key = req.body.key;
        geocodeService.getLatLng({ address: address, key: key }, function(err, results) {
            if (err) {
                res.send({
                    status: false,
                    msg: "API Failed",
                    result: null,
                });
            } else {
                res.send({
                    status: true,
                    msg: "User created",
                    result: results[0].geometry.location,
                });
            }
        });
    });

    app.post("/user", urlencodedParser, function(req, res) {
        try {
            var model = {
                fname: req.body.fname,
                lname: req.body.lname,
                age: req.body.age,
            };
            service.addUser(model, function(err, user) {
                if (err) {
                    res.send({
                        status: false,
                        msg: "API Failed",
                        result: null,
                    });
                } else {
                    res.send({
                        status: true,
                        msg: "User created",
                        result: user,
                    });
                }
            });
        } catch (e) {
            console.log(e);
            res.send({
                status: false,
                msg: "API Failed",
                result: null,
            });
        }
    });

    app.get("/user", function(req, res) {
        try {
            service.getUsers(function(error, userDetails) {
                console.log(userDetails);
                userDetails
                    ? res.send({
                          result: userDetails,
                          status: 200,
                          msg: "user details fetched",
                      })
                    : res.send({
                          result: null,
                          status: 201,
                          msg: "user details not found",
                      });
            });
        } catch (e) {
            console.log(e);
            res.send({
                status: false,
                msg: "API Failed",
                result: null,
            });
        }
    });

    app.put("/user", urlencodedParser, function(req, res) {
        try {
            var model = {
                fname: req.body.fname,
                lname: req.body.lname,
                age: req.body.age,
            };
            var id = req.body.id;
            var responseObj = service.updateUserDetails(id, model);
            res.send({
                status: true,
                msg: "User details updated",
                result: responseObj,
            });
        } catch (e) {
            console.log(e);
            res.send({
                status: false,
                msg: "API Failed",
                result: null,
            });
        }
    });

    app.delete("/user", jsonParser, function(req, res) {
        try {
            var id = req.body.id;
            var responseObj = service.removeUser(id);
            responseObj
                ? res.send({
                      result: responseObj,
                      status: 200,
                      msg: "user deleted",
                  })
                : res.send({
                      result: null,
                      status: 201,
                      msg: "user details not found",
                  });
        } catch (e) {
            console.log(e);
            res.send({
                status: false,
                msg: "API Failed",
                result: null,
            });
        }
    });
};
