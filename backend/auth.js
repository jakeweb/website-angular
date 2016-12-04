var jwt = require('jwt-simple');
var moment = require('moment');
var bcrypt = require('bcrypt-nodejs');

var config = require("./config");

var auth = function() {
    this.login = function(data, req) {
        var response = {
            user: {},
            token: ''
        };
        console.log(data);
        if (bcrypt.compareSync(req.password, data[0].password)) {
            response.user = data[0];
            response.token = createJWT(data);
            // delete important data
            delete response.user.password;
            delete response.user.id;
            
            return response;
        } else {
            return false;
        }
    };
    this.hashData = function(data) {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(data, salt);
        return hash;
    }
    this.ensureAuthenticated = function(req, res, next) {
        if (!req.header('Authorization')) {
            return res.status(401).send({ message: 'Please make sure your request has an Authorization header' });
        }
        var token = req.header('Authorization').split(' ')[1];
        var payload = null;
        try {
            payload = jwt.decode(token, config.TOKEN_SECRET);
        } catch (err) {
            return res.status(401).send({
                message: err.message
            });
        }
        if (payload.exp <= moment().unix()) {
            return res.status(401).send({
                message: 'Token has expired'
            });
        }
        req.body.userID = payload.id;
        next();
    };

};

function createJWT(user) {
    var payload = {
        id: user[0].id,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix()
    };
    return jwt.encode(payload, config.TOKEN_SECRET);
}

module.exports = auth;
