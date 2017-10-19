module.exports = (function () {
    var mysql = require("./mysql");
    var users = {};
    
    function generateNewId() {
        return Object.keys(users).length + 1001;
    }    
    
    return {
        addUser: function(model) {
            var id = generateNewId();
            users[id] = model;
            return users[id];
        },
        getUsers: function() {
            return users;
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

