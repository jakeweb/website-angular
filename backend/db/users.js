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
        return db.query("SELECT (email) FROM users WHERE email = ${email};", {
            email: email
        });
        // return db.query("SELECT * FROM \"users\" WHERE \"email\" = \'" + email + "\';");
    };
    self.addUser = function(user) {
        console.log('addUser', user);
        return db.query("INSERT INTO users (${this~}) VALUES ( ${password}, ${email});", user);
    };
    self.updateUser = function(user) {
        return db.query("UPDATE \"users\" SET \"full_name\" = \'" + user.full_name +
            "\', \"avatar\" = \'" + user.avatar + "\', \"reset_password_token\" = \'" + user.reset_password_token +
            "\', \"reset_password_expires\" = \'" + user.reset_password_expires + "\', \"password\" = \'" + user.password +
            "\', \"email\" = \'" + user.email + "\'" + " WHERE \"id\" = " + user.id + ";");
    };
};

module.exports = users;
