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
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
            name: "options"

        }
    ]).then(function(answer){
      
        if("View Products for Sale"){
            viewProducts()
        }

        if("View Low Inventory"){
            lowInv()
        }

        if("Add to Inventory"){
            addInv()
        }

        if("Add New Product"){
            addProduct()
        }
    })


    connection.end()
}

function viewProducts(){
     var query = "SELECT * FROM products";
        connection.query(
            query, 
            function(err, res){
                for(var i = 0; i < res.length; i++){
                    console.log(`
                        Product ID: ${res[i].item_id} Product Name: ${res[i].product_name} Product Price: ${res[i].price}
                    `)
                }
            }
        )
}

function lowInv(){
    var query = "SELECT * FROM products";
        connection.query(
            query,
            function(err, res){
                for(var i = 0; i < res.length)
            }

        )
}