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
    displayOptions()
});

function displayOptions() {
    inquirer
    .prompt([
        {
            type: "list",
            message: "What option would you like?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"],
            name: "options"

        }
    ]).then(function(answer){
      
        if("View Products for Sale"){
           viewProducts()
        }

       

       

        
    });


}

function viewProducts(){
     var query = "SELECT * FROM products";
        connection.query(
            query, 
            function(err, res){
                if(err) throw err;
                for(var i = 0; i < res.length; i++){
                    console.log(`
                        Product ID: ${res[i].item_id} Product Name: ${res[i].product_name} Product Price: ${res[i].price}
                    `)
                }
            }
        )
        connection.end()
}

function lowInv(){
    var query = "SELECT * FROM products";
        connection.query(
            query,
            function(err, res){
                for(var i = 0; i < res.length; i++){
                    if(stock_quantity < 5){
                        console.log(`Item ID: ${res[i].item_id} Quantity: ${res[i].stock_quantity}`)
                    }
                }
            }

        )
}

function addInv(){
    inquirer
    .prompt
    ([
        {
            type: "input",
            message: "What is the item id that you want to update?",
            name: "id"
        },
        {
            type: "input",
            message: "How many items are you adding?",
            name: "inv"
        }
    ]).then(function(answer){
        var query = "UPDATE products SET ? WHERE ?";
        var newInv = answer.inv += stock_quantity;
        var id = answer.id
        connection.query(
            query, 
            function(err, res){
                if(err) throw err;
              [ 
                {
                    stock_quantity: newInv
                },
                {
                    item_id: id
                }
             ]
            }
        )
        console.log("Your item has been updated!")
    })

   
}

function addProduct(){

}
function exit(){
    connection.end()
}


