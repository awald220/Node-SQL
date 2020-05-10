var mysql = require("mysql");
var inquirer = require("inquirer");


//create connection to the database
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "bamazon_db"
});

connection.connect (function(err){
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    getId()
});

function getId(){
    inquirer.prompt([
        {
            type: "input",
            message: "What is the ID number of the item you would like to buy?",
            name: "id"
        },
        {
            type: "input",
            message: "How many would you like to buy?",
            name: "amount"
        }
    ]).then(function(answer){
        var id = answer.id
        var amount = answer.amount;
        var query = "SELECT * FROM products WHERE ?";
        connection.query(
            query,
            {
                item_id: id
            },
            function(err, res){
                if (err) throw err;

                var quantity = res[0].stock_quantity;
                console.log(quantity)

                if(amount > quantity){
                    console.log("Insufficient Quantity!")
                } else{
                  var newQuantity = stock_quantity =- amount;
                  var query = "UPDATE products SET ? WHERE ?";
                  connection.query(query, 
                        [
                            {
                                stock_quantity: newQuantity
                            },
                            {
                                item_id: id
                            }
                        ],
                    )
                  
                }
                connection.end()
            }
           
        )
   
    });
}
