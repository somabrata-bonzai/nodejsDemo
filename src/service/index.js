module.exports = (function () {
    var mysql = require("./mysql");
    var users = {};
    
    function generateNewId() {
        return Object.keys(users).length + 1001;
    }    
    
    return {
        addUser: function(model, callback) {
            var id = generateNewId();
            users[id] = model;
            callback(null, users[id]);
        },
        getUsers: function(callback) {
            callback(null, users);
        },
        getUser: function(id) {
            return users[id];
        },
        updateUserDetails: function(id, model) {
            return users[id] = model;
        },
        removeUser: function(id) {
            delete users[id];
        }
    };
})();

