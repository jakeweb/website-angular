var path = require('path');
var async = require('async');
var auth = new(require('./auth'));
var users = new(require('./db/users'));
var products = new(require('./db/products'));

var router = {
    init: function init(app) {

        app.post('/auth/signup', function(req, res) {
            async.waterfall([
                    function(done) {
                        console.log('run1');
                        users.getUserByEmail(req.body.email).then(function(data) {
                            // if email not presented in db
                            console.log(data[0]);
                            if (!data[0]) {
                                req.body.password = auth.hashData(req.body.password);
                                done(null, req.body, done);
                            } else {
                                console.log('Email already used!');
                                res.status(500).send('Email already used!');
                            }
                        }).catch(function(error) {
                            res.status(500).send(error);
                        });
                    },
                    function(user, done) {
                        console.log('run2');
                        users.addUser(user).then(function() {
                            res.status(200).send("signup successfull");
                        }).catch(function(error) {
                            console.log(error);
                            res.status(500).send(error);
                        });
                    }
                ],
                function(err) {
                    res.redirect('/');
                });
        });
        app.post('/auth/login', function(req, res) {
            users.getUserByEmail(req.body.email).then(function(data) {
                var response = auth.login(data, req.body);
                if (response) {
                    res.status(200).send(response);
                } else {
                    res.status(500).send('No user with such email or incorrect password');
                }
            }).catch(function(error) {
                console.log(error);
                res.status(500).send(error);
            });
        });
        app.put('/settings', auth.ensureAuthenticated, function(req, res) {
            users.updateUser(req.body).then(function(data) {
                res.status(200).send(data);
            }).catch(function(error) {
                console.log(error);
                res.status(500).send(error);
            });
        });
        app.post('/product', auth.ensureAuthenticated, function(req, res) {
            products.addProduct(req.body).then(function(data) {
                res.status(200).send(data);
            }).catch(function(error) {
                console.log(error);
                res.status(500).send(error);
            });
        });
        app.get('*', function(req, res) {
            res.status(200).sendFile(path.resolve('frontend/app/index.html'));
        });
    }
};

module.exports = router;
