var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  bamazon();
  //endConnection();
});

function bamazon(){
  var query = "SELECT id, product_name, price FROM products";
      connection.query(query, function(err, res) {
        for (var i = 0; i < res.length; i++) {
          console.log("ID: " + res[i].id + " || Product: " + res[i].product_name + " || Price: " + res[i].price);
        }
      });
	connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    //console.log(results);
    inquirer
      .prompt([
        {
          name: "choice",
          type: "list",
          choices: function() {
            var productArray = [];
            for (var i = 0; i < results.length; i++) {
              productArray.push({"id" : results[i].id, "name" : results[i].product_name, "price": results[i].price});
            }
            return productArray;
          },
          message: "Which product are you interested in purchasing?"
        },
        {
          name: "quantity",
          type: "input",
          message: "How many units do you wish to purchase?"
        }
      ])
      .then(function(answer) {
        
        var chosenItem;
        for (var i = 0; i < results.length; i++) {
          if (results[i].product_name === answer.choice) {
            chosenItem = results[i];
          }
        }

        if (chosenItem.stock_quantity >= parseInt(answer.quantity)) {
          var newQuantity = chosenItem.stock_quantity - answer.quantity;
          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity: newQuantity
              },
              {
                id: chosenItem.id
              }
            ],
            function(err) {
              if (err) throw err;
              console.log("********************************************");
              console.log("Your total for this purchase is: $" + (chosenItem.price * answer.quantity));
              console.log("********************************************");
              console.log("Purchase successful! Thank You");
              bamazon();
            }
          );
        }
        else {
         
          console.log("Im sorry we do not have sufficient quantity. Try again...");
          bamazon();
        }
      });
  });
}

function endConnection(){
	connection.end();
}