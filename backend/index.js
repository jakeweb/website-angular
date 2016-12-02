var express = require('express');
var app = express();
var router = require('./router');
var bodyParser = require('body-parser');

app.use(express.static('./frontend'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.listen(5000, function() {
    console.log('Example app listening on port 5000!');
});
router.init(app);
