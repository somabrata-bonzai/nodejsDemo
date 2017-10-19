module.exports = (function() {
    var mysql = require("mysql");
    var pool = mysql.createPool({
        connectionLimit: 10,
        host: "localhost",
        user: "root",
        password: "root",
        database: "test",
    });

    return {
        addUser: function(model, callback) {
            pool.getConnection(function(err, connection) {
                if (err) {
                    callback(err, {});
                }
                connection.query(
                    {
                        sql: "INSERT INTO users SET ?",
                        timeout: 20000, // 20s
                        values: model,
                    },
                    callback
                );
                connection.release();
            });
        },
        getUsers: function(callback) {
            pool.getConnection(function(err, connection) {
                if (err) {
                    callback(err, {});
                }
                connection.query(
                    {
                        sql: "SELECT * FROM users",
                        timeout: 10000, // 10s
                    },
                    callback
                );
                connection.release();
            });
        },
        getUser: function(filter, callback) {
            pool.getConnection(function(err, connection) {
                if (err) {
                    callback(err, {});
                }
                connection.query(
                    {
                        sql: "SELECT * FROM users where id = ?",
                        timeout: 10000, // 10s
                        values: filter.id,
                    },
                    callback
                );
                connection.release();
            });
        },
        updateUserDetails: function(id, model) {
            return (users[id] = model);
        },
        removeUser: function(id) {
            delete users[id];
        },
    };
})();
