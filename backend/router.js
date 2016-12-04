var path = require('path');
var async = require('async');
var auth = new(require('./auth'));
var users = new(require('./db/users'));
var products = new(require('./db/products'));
var baseUrl = "/api";
var router = {
    init: function init(app) {

        app.post(baseUrl + '/auth/signup', function(req, res) {
            async.waterfall([
                    function(done) {
                        users.getUserByEmail(req.body.email).then(function(data) {
                            // if email not presented in db
                            if (!data[0]) {
                                req.body.password = auth.hashData(req.body.password);
                                done(null, req.body, done);
                            } else {
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
            users.getUserByEmail(req.body.user).then(function(dataFromDB) {
                var response = auth.login(dataFromDB, req.body);
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
        app.get(baseUrl + '/profile', auth.ensureAuthenticated, function(req, res) {
            users.getUserById(req.body.userID).then(function(data) {
                delete data[0].password;
                delete data[0].id;
                res.status(200).send(data);
            }).catch(function(error) {
                console.log(error);
                res.status(500).send(error);
            });
        });

        app.put(baseUrl + '/settings', auth.ensureAuthenticated, function(req, res) {
            users.updateUser(req.body).then(function(data) {
                res.status(200).send(data);
            }).catch(function(error) {
                console.log(error);
                res.status(500).send(error);
            });
        });
        app.put(baseUrl + '/password', auth.ensureAuthenticated, function(req, res) {
            req.body.password = auth.hashData(req.body.password);
            users.updatePassword(req.body).then(function(data) {
                res.status(200).send(data);
            }).catch(function(error) {
                console.log(error);
                res.status(500).send(error);
            });
        });
        app.get(baseUrl + '/products', auth.ensureAuthenticated, function(req, res) {
            var startItem = Number(req.query.startItem);
            var itemsPerPage = Number(req.query.itemsPerPage);
            async.waterfall([
                    function(done) {
                        console.log('run1');
                        products.getCountProducts().then(function(data) {
                            done(null, data[0], done);
                        }).catch(function(error) {
                            console.log(error);
                            res.status(500).send(error);
                        });
                    },
                    function(count, done) {
                        products.getProducts(startItem, itemsPerPage).then(function(data) {
                            var response = {
                                count: count.count,
                                data: data
                            }
                            res.status(200).send(response);
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
        app.post(baseUrl + '/product', auth.ensureAuthenticated, function(req, res) {
            products.addProduct(req.body).then(function(data) {
                res.status(200).send(data);
            }).catch(function(error) {
                console.log(error);
                res.status(500).send(error);
            });
        });
        app.put(baseUrl + '/product', auth.ensureAuthenticated, function(req, res) {
            products.updateProduct(req.body).then(function(data) {
                res.status(200).send(data);
            }).catch(function(error) {
                console.log(error);
                res.status(500).send(error);
            });
        });
        app.delete(baseUrl + '/products', auth.ensureAuthenticated, function(req, res) {
            var startItem = Number(req.query.startItem);
            var itemsPerPage = Number(req.query.itemsPerPage);

            var list = [];
            for (var i = req.query.products.length - 1; i >= 0; i--) {
                list.push(Number(req.query.products[i]));
            }
            async.waterfall([
                    // delete products
                    function(done) {
                        products.deleteProducts(list).then(function() {
                            done(null);
                        }).catch(function(error) {
                            console.log(error);
                            res.status(500).send(error);
                        });
                    },
                    // get new count of products
                    function(done) {
                        products.getCountProducts().then(function(data) {
                            done(null, data[0], done);
                        }).catch(function(error) {
                            console.log(error);
                            res.status(500).send(error);
                        });
                    },
                    // get products new list
                    function(count, done) {
                        products.getProducts(startItem, itemsPerPage).then(function(data) {
                            var response = {
                                count: count.count,
                                data: data
                            }
                            res.status(200).send(response);
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
        app.get('*', function(req, res) {
            res.status(200).sendFile(path.resolve('frontend/app/index.html'));
        });
    }
};

module.exports = router;
