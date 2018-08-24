require("dotenv").config();
var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

var table = new Table({
    head: ["ID", "Product", "Department", "Price","Stock Quantity"]
  , colWidths: [5, 20, 15, 8, 18]
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
        console.log("connected as id " + connection.threadId + "\n");
        
        connection.query("SELECT * FROM products", function(err, res) {
            for (var i=0; i<res.length; i++){
                table.push([res[i].id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
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
                    });
                }
                connection.end();
            });
        });
};

// var mysql = require("mysql");
// var prompt = require("prompt");
// var Table = require("cli-table");
// var inquirer = require("inquirer");

// var connection = mysql.createConnection({
//     user: "root",
//     password: "process.env.DBPASSWORD",
//     host: "localhost",
//     port: 3306,
//     database: "Bamazon_DB"
// });

// var db;

// function displayAll(){
//     db = {};
//     connection.query("SELECT * FROM Products", function(err, res) {
//         if (err)
//     ;

// connection.connect(function(err) {
//     if (err) {
//         throw err;
//     };
//     var inventory = new Table({ head: ["ID", "Product Name", "Department Name", "Price", "Quantity in Stock"]});
//     results.forEach(function(value, index, array) {
//         var idNum =value.id;
//         var product = value.product_name;
//         var dept = value.department_name;
//         var price = value.price;
//         var stock = value.stock_quantity;

//         var newLine = {};
//         newLine[idNum] = [product, dept, price, stock];
//         db[idNum] = value;
//         inventory.push(newLine);
//     });
//     console.log(inventory.toString());
// });
// },

// function changeInventory(id, currentQuantity, addOrSubtract) {
//     var newQuantity = currentQuantity + addOrSubtract;
//     var updateText = "UPDATE Products\
//         SET stock_quantity = ?\
//         WHERE id = ?";
//     connection.query(updateText, [newQuantity, id], function(err, res) {
//         if (err) {
//             throw err;
//         };
//     })
// },

// function purchase() {
//     setTimeout(function(){purchaseGo()}, 3000);
//     function purchaseGo() {
//         prompt.start();
//         console.log("If you would like to purchase a product, please enter the ID number of the product, and quantity you would like to buy.")
//         prompt.get(["ID", "Quantity"], function(err, res) {
//             if (err) {
//                 throw err;
//             };
//             var itemID = Number(results.ID);
//             var purchaseItem = db[itemID];
//             var totalPrice = purchaseItem.price * results.Quantity;
//             var changeQuantity = results.Quantity * -1;

//             if (purchaseItem.stock_quantity >= results.Quantity) {
//                 changeInventory(itemID, purchaseItem.stock_quantity, changeQuantity);
//                 console.log("Your purchase; " + purchaseItem.product_name);
//                 console.log("Quantity: " + results.Quantity);
//                 console.log("Total price: $" + totalPrice);
//             }
//             else {
//                 console.log("Purchase error");
//             };
//             morePlease();
//         });
//     }
// },

// function morePlease() {
//     var questions = [{
//         name: "again",
//         message: "Would you like to make another purchase?",
//         type: "confirm"
//     }]

//     inquirer.prompt(questions).then(function(answers) {
//         if (answers.again) {
//             displayAll();
//             purchase();
//         }
//         else {
//             console.log("Thanks for shopping at Bamazon! Goodbye!");
//             return;
//         }
//     });
// },

// console.log("Welcome to Bamazon! Here is our product catalog to choose from:"));
// displayAll();
// purchase();
// }