var db = require("./connection");
var products = function() {
    self = this;
    self.getProducts = function() {
        return db.query("SELECT * FROM \"products\";");
    };
    self.addProduct = function(product) {
        console.log('addProduct', product);
        return db.query("INSERT INTO products (title, price, description) VALUES ( ${title} , ${price}, ${description});", product);
    };
    self.updateProduct = function(product) {
        console.log("updateProduct", product);
        return db.query("UPDATE products SET title = ${title}, price = ${price}, description = ${description} WHERE id = ${productID};", product);
    };
};

module.exports = products;
