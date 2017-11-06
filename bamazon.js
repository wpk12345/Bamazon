var mysql = require("mysql");

var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "Developer2018",
    database: "bamazon"
  });
  
  // connect to the mysql server and sql database
  connection.connect(function(err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
  });
  // function which will first display all of the items available for sale. Include the ids, names, and prices of products for sale.

function start() {
    var reg = /^\d+$/;

    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
    inquirer
      .prompt({
        name: "WhatToBuy",
        type: "input",
        message: "Please enter the 'ID#' of the item you would like to purchase.",
        validate: function (value) {
            var pass = value.match(reg);
            if (pass) {
              return true;
            }
            return 'Please enter a valid "ID" number';
          },
          choices: function() {
            for (var i = 0; i < results.length; i++) {
              console.log("Item ID #" + results[i].item_id + " || " + results[i].product_name + " || " + "Item Price:$" + results[i].price);
            }
           
          }
        })
     .then(function(answer) {

        inquirer.prompt({
            name: "ID confirm",
            type: 'confirm',
            message: "You chose Item ID #" + answer.WhatToBuy + " is that correct?",
            default: false
        })

      });
    });
};
      
    
    
