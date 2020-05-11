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
    displayItems()
});

function displayItems(){
    var query = "SELECT * FROM products";
    connection.query(
        query,
        function(err, res){
            for(var i = 0; i < res.length; i++){
                console.log(`
                Product ID: ${res[i].item_id} Product Name: ${res[i].product_name} Product Price: ${res[i].price}
                `)
            }
            getId()
        }
    )
}

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

                //get the items name
                var itemName = res[0].product_name;

                //get the quantity of the item
                var quantity = res[0].stock_quantity;

                //get the price of the single item
                var price = res[0].price;

                // determine if there is enought of the item in stock to fufil the order
                if(amount > quantity){
                    console.log("Insufficient Quantity!")
                } else{
                  //  subtract the amount orders from current stock number
                  var newQuantity = quantity -= amount;

                  // get the total price for items ordered
                  var total = amount *= price;

                  //get access to the database
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
                    console.log(`Your order has been placed and your total is ${total}`)
                  
                }
                connection.end()
            }
           
        )
   
    });
}
