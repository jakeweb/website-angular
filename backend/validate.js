var validate = function() {

    var patternName = /^.{1,255}$/;
    var patternPassword = /^[a-zA-Z0-9\s]{6,16}$/;
    var patternEmail = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
    var patternPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    var patternPrice = /^[0-9]+(\.[0-9]{1,2})?$/;
    var patternDescr = /^.{1,1000}$/;

    this.checkSignUp = function(req, res, next) {
        if (patternPassword.test(req.body.password) && patternEmail.test(req.body.email)) {
            next();
        } else {
            return res.status(406).send({
                message: 'Error 406 (Not Acceptable)'
            });
        }
    }
    this.checkPassword = function(req, res, next) {
        if (patternPassword.test(req.body.password)) {
            next();
        } else {
            return res.status(406).send({
                message: 'Error 406 (Not Acceptable)'
            });
        }
    }
    this.checkSettings = function(req, res, next) {
        if (patternEmail.test(req.body.email) && patternName.test(req.body.firstName) && patternName.test(req.body.lastName)) {
            next();
        } else {
            return res.status(406).send({
                message: 'Error 406 (Not Acceptable)'
            });
        }
    }
    this.checkProduct = function(req, res, next) {
        if (patternName.test(req.body.title) && patternPrice.test(req.body.price) && patternDescr.test(req.body.description)) {
            next();
        } else {
            return res.status(406).send({
                message: 'Error 406 (Not Acceptable)'
            });
        }
    }
};

module.exports = validate;
