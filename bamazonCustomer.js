require("dotenv").config();
var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

var table = new Table({
    head: ["ID", "Product", "Department", "Price","Stock Quantity"]
  , colWidths: [5, 25, 15, 10, 18]
});

var connection = mysql.createConnection({
    host: process.env.DBLOCALHOST,

    // Your port; if not 3306
    //port: 3306,

    // Your username
    user: process.env.DBUSER,

    // Your password
    password: process.env.DBPASSWORD,
    database: "Bamazon_DB"
});

connection.connect(function(err) {
    if (err) {
        throw err;
    } else {
        console.log("Welcome to Bamazon! Have fun shopping!");
        
        connection.query("SELECT * FROM products", function(err, res) {
            for (var i=0; i<res.length; i++){
                table.push([res[i].id, res[i].product_name, res[i].department_name, "$" + res[i].price, res[i].stock_quantity + " unit(s)"]);
            }
           
            console.log(table.toString());
         
            userBuy();
        });
    }
});

function userBuy() {
    inquirer
        .prompt([
            {
            type: "input",
            name: "productID",
            message: "Input the ID of the product you would like to buy:"
            },
            {
            type: "input",
            name: "quantity",
            message: "How many units do you want to buy?"
            }
        ])
        .then(function(data) {
            var userQuantity = parseInt(data.quantity);
            var userProduct = data.productID;
            
            connection.query("SELECT id, stock_quantity, price FROM products", function(err, res) {
                var stockAmt = 0;
                var stockId = 0;
                var stockPrice = 0;
                
                if (err) throw err;
                
                for (var i=0; i<res.length; i++){
                    if (res[i].id == userProduct){
                    stockAmt = res[i].stock_quantity;
                    stockId = res[i].id;
                    stockPrice = res[i].price;
                    }
                }

                if (stockAmt < userQuantity) {
                    console.log("Insufficient quantity!");
                } else {
                    var newAmt = stockAmt - userQuantity;
                    var userTotal = userQuantity * stockPrice;

                    var updateSql = "UPDATE products SET stock_quantity = ? WHERE id = ?";

                    connection.query(updateSql, [ newAmt, stockId ], function (error, results, fields) {
                        console.log("stock has been updated");

                        console.log("You owe $" + userTotal);

                        console.log("Thank you for shopping at Bamazon! Have a wonderful day!")
                    });
                }
                connection.end();
            });
        });
    };