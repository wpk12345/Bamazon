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
          for (var i = 0; i < results.length; i++) {
            console.log("Item ID #" + results[i].item_id + " || " + results[i].product_name + " || " + "Item Price:$" + results[i].price);
          }
      
    inquirer
      .prompt([{
        name: "WhatToBuy",
        type: "list",
        choices: function() { var choiceArray = [];
          for (var i = 0; i < results.length; i++) {
            choiceArray.push(results[i].product_name);
          }
          return choiceArray;
        },
        message: "Choose the item you would like to purchase."
      },
          {
            name: "HowMuchToBuy",
            type: "input",
            message: "Quantity?",
            validate: function (value) {
              var pass = value.match(reg);
              if (pass) {
                return true;
              }
              return 'Please enter a valid number.(no letters/symbols)';
            }
          }   
      ])
     .then(function(answers) { 
//a yes/no confirm of user choice.  
        inquirer.prompt({
            name: "IDconfirm",
            type: 'confirm',
            message: "You would like to purchase " + answers.HowMuchToBuy  + " " + answers.WhatToBuy + "(s) is that correct?",
            default: false
        }).then(function(answer) {
         if(answer.IDconfirm){
           //working now so this is where we need to work
          //  Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.
           
          //  If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.
          //  However, if your store does have enough of the product, you should fulfill the customer's order.
           
          //  This means updating the SQL database to reflect the remaining quantity.
          //  Once the update goes through, show the customer the total cost of their purchase.
           console.log("ok, order on the way");
         }
         else {
           start();
         }
        })lfkgnarigoariogjar
     });
});    

};  
    
