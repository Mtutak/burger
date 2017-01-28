var connection = require("../config/connection.js");
var orm = {
    // The last variable cb (callback) represents the anonymous function being passed from server.js
    selectAll: function (tableInput, cb) {
        var queryString = "SELECT * FROM ??";
        connection.query(queryString, [tableInput], function (err, result) {
            if (err) throw err;
            cb(result);
        });
    },
    insertOne: function (tableInput, burger, cb) {
        var queryString = "INSERT INTO ?? (burger_name, devoured) VALUES (??, ??);";
        connection.query(queryString, [tableInput, burger.burger_name, burger.devoured], function (err, result) {
            if (err) throw err;
            cb(result);
        });
    },
    updateOne: function (tableInput, values, newValue, clause, conditionValue, cb) {
        var queryString = "UPDATE ?? SET ?? = ?? WHERE ?? = ??";
        connection.query(queryString, [tableInput, values, newValue, clause, conditionValue, cb], function (err, result) {
            if (err) throw err;
            cb(result);
        });
    },
};
module.exports = orm;
// connection.query("INSERT INTO products SET ?", {
//   flavor: "Rocky Road",
//   price: 3.00,
//   quantity: 50
// }, function(err, res) {});
// connection.query("UPDATE products SET ? WHERE ?", [{
//   quantity: 100
// }, {
//   flavor: "Rocky Road"
// }], function(err, res) {});