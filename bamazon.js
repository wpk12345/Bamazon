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
    // query the database for all items being auctioned
    connection.query("SELECT * FROM products", function(err, results) {
      if (err) throw err;
      // once you have the items, prompt the user for which they'd like to bid on
      inquirer
        .prompt([
          {
            name: "choice",
            type: "list",
            choices: function() {
              var choiceArray = [];
              for (var i = 0; i < results.length; i++) {
                choiceArray.push(results[i].product_name);
              }
              return choiceArray;
            },
            message: "Welcome to BAMAZON! Choose the item you would like to purchase."
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
        .then(function(answer){
          // get the information of the chosen item  retuns as an object
          var chosenItem;
          for (var i = 0; i < results.length; i++) {
            if (results[i].product_name === answer.choice) {
              chosenItem = results[i];
              //the chosen product object
              console.log(chosenItem);
            }
          }
         // console.log(chosenItem.stock_quantity);
            console.log(answer.HowMuchToBuy);
        //need to take chosenItem and check quantity
          if (chosenItem.stock_quantity > parseInt(answer.HowMuchToBuy)) {
          var newQuantity =  chosenItem.stock_quantity - answer.HowMuchToBuy;
          console.log(newQuantity);
          
            connection.query(
              "UPDATE products SET ? WHERE ?",
              [
                {
                  stock_quantity: newQuantity
                },
                {
                  item_id: chosenItem.item_id
                }
              ],
             
            );
                          console.log(chosenItem.stock_quantity);

          }
          else {
            // bid wasn't high enough, so apologize and start over
            console.log("Sorry, not enough quantity in stock to fill your order.  Returning to start. ");
            start();
          }
            
        });
      });
    };
  