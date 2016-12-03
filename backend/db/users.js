var db = require("./connection");
var users = function() {
    self = this;
    self.getUserById = function(id) {
        console.log('getUserById typo', typeof(id));
        console.log('getUserById', id);
        return db.query("SELECT \"full_name\",\"id\",\"role\",\"avatar\",\"email\" FROM \"users\" WHERE \"id\" = " + id + ";");
    };
    self.getUserByEmail = function(email) {
        console.log('getUserByEmail', email);
        return db.query("SELECT * FROM users WHERE email = ${email};", {
            email: email
        });
    };
    self.addUser = function(user) {
        console.log('addUser', user);
        return db.query("INSERT INTO users (${this~}) VALUES ( ${email} , ${password});", user);
    };
    self.updateUser = function(user) {
        console.log("updateUser", user);
        return db.query("UPDATE users SET email = ${email}, \"firstName\" = ${firstName}, \"lastName\" = ${lastName},  phone= ${phone} WHERE id = ${userID};", user);
    };
};

module.exports = users;
