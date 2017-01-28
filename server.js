var connection = require("./config/connection.js");
var express = require('express');
var exphbs = require('express-handlebars');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var orm = require('./config/orm.js');
var app = express();
// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(process.cwd() + "/public"));
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));
// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));
//layout is a handlebars template with handlebars placeholder
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
var burgers = [{
    eachBurger: "Bacon Burger."
}, {
    eachBurger: "Pizza Burger."
}];
// view got through default layout of main
app.set('view engine', 'handlebars');
var PORT = process.env.PORT || 3000;
var bgData;
// Routes
app.get("/", function (req, res) {
    var queryString = "SELECT * FROM ?? WHERE devoured = 0";
    connection.query(queryString, ['burgers'], function (err, data) {
        if (err) throw err;
        console.log(data);
        var queryString2 = "SELECT * FROM ?? WHERE devoured = 1";
        connection.query(queryString2, ['burgers'], function (err, data2) {
            if (err) throw err;
            console.log(data2);
            res.render('index', {
                burgerSelected: data,
                burgerDevoured: data2
            });
        });
    });
});
app.post("/", function (req, res) {
    console.log(req.body);
    console.log(req.body.burger_name);
    connection.query("INSERT INTO burgers (burger_name, devoured) VALUES (?, ?)", [
        req.body.burger_name, 0
    ], function (err, result) {
        if (err) {
            throw err;
        }
        console.log('successfull insert!');
        res.redirect("/");
    });
});
app.put("/:id", function (req, res) {
    connection.query("UPDATE burgers SET devoured = ? WHERE id = ?", [
        1, req.params.id
    ], function (err, result) {
        if (err) {
            throw err;
        }
        res.redirect("/");
    });
});

function getDevoured() {
    app.get("/", function (req, res) {
        var queryString = "SELECT * FROM ?? WHERE devoured = 1";
        connection.query(queryString, ['burgers'], function (err, data2) {
            if (err) throw err;
            res.render('index', {
                burgerDevoured: data2
            });
        });
    });
}
app.listen(PORT);