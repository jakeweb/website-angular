var jwt = require('jwt-simple');
var moment = require('moment');
var bcrypt = require('bcrypt-nodejs');

var config = require("./config");

var auth = function() {
    this.login = function(dataFromDB, req) {
        var response = {
            user: {},
            token: ''
        };
        console.log(dataFromDB);
        if (bcrypt.compareSync(req.user.password, dataFromDB[0].password)) {
            response.user = dataFromDB[0];
            response.token = createJWT(dataFromDB, req.remember);
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

function createJWT(user, remember) {
    var payload = {
        id: user[0].id,
        iat: moment().unix()
    };
    if (remember) {
        console.log("remember");
        payload.exp = moment().add(14, 'days').unix();
    }
    else {
        console.log("don't remember");
        payload.exp = moment().add(14, 'hours').unix();
    }
    return jwt.encode(payload, config.TOKEN_SECRET);
}

module.exports = auth;
