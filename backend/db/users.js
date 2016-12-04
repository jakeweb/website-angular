var db = require("./connection");
var users = function() {
    self = this;
    self.getUserById = function(id) {
        // console.log('getUserById typo', typeof(id));
        // console.log('getUserById', id);
        return db.query("SELECT * FROM users WHERE id = ${id};", { id: id });
    };
    self.getUserByEmail = function(user) {
        // console.log('getUserByEmail', user);
        return db.query("SELECT * FROM users WHERE email = ${email};", user);
    };
    self.addUser = function(user) {
        // console.log('addUser', user);
        return db.query("INSERT INTO users (${this~}) VALUES ( ${email} , ${password});", user);
    };
    self.updateUser = function(user) {
        // console.log("updateUser", user);
        return db.query("UPDATE users SET email = ${email}, \"firstName\" = ${firstName}, \"lastName\" = ${lastName},  phone= ${phone} WHERE id = ${userID};", user);
    };
    self.updatePassword = function(user) {
        // console.log("updateUser", user);
        return db.query("UPDATE users SET password = ${password} WHERE id = ${userID};", user);
    };
};

module.exports = users;
