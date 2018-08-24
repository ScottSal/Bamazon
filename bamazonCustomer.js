var mysql = require("mysql");
var prompt = require("prompt");
var Table = require("cli-table");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    user: "root",
    password: "",
    host: "localhost",
    port: 3306,
    database: "Bamazon_DB"
});

var db;

function displayAll(){
    db = {};
    connection.query("SELECT * FROM Products", function(err, res) {
        if(err)
    })
}
connection.connect(function(err) {
    if (err) {
        throw err;
    };
    var inventory = new Table({ head: ["ID", "Product Name", "Department Name", "Price", "Quantity in Stock"]});
    results.forEach(function(value, index, array) {
        var idNum =value.id;
        var product = value.product_name;
        var dept = value.department_name;
        var price = value.price;
        var stock = value.stock_quantity;

        var newLine = {};
        newLine[idNum] = [product, dept, price, stock];
        db[idNum] = value;
        inventory.push(newLine);
    });
    console.log(inventory.toString());
});

