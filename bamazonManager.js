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
            name: "options",
            filter: function (val) {
				if (val === 'View Products for Sale') {
					return 'sale';
				} else if (val === 'View Low Inventory') {
					return 'lowInventory';
				} else if (val === 'Add to Inventory') {
					return 'addInventory';
				} else if (val === 'Add New Product') {
					return 'newProduct';
				} else {
					// This case should be unreachable
					console.log('ERROR: Unsupported operation!');
					exit(1);
				}
			}

        }
    ]).then(function(answer){
      
        if("View Products for Sale"){
       addInv()
        } else if("View Low Inventory"){
            lowInv()
        }else if ("Add to Inventory"){
            addInv()
        }else if("Add new Product"){
            addProduct()
        } else {
            exit()
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
};

function lowInv(){
    var query = "SELECT * FROM products";
        connection.query(
            query,
            function(err, res){
                if(err) throw err;
                for(var i = 0; i < res.length; i++){
                    if(res[i].stock_quantity < 5){
                        console.log(`
                        Consider restocking this items!
                        Item ID: ${res[i].item_id} Quantity: ${res[i].stock_quantity}`)
                        
                    }
                }
            }

        )
        connection.end()
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
            message: "What do you want the stock quantity to be?",
            name: "inv"
        }
    ]).then(function(answer){
   
        var query = "UPDATE products SET ? WHERE ?";
        connection.query(
            query,
            [
                {
                    stock_quantity: answer.inv
                },
                {
                    item_id: answer.id
                }
            ],
            function(err, res){
                if(err) throw err;
            } 
        );
        console.log(`You item has been updated to ${answer.inv}`)
       
    })
   
}

function addProduct(){

}
function exit(){
    connection.end()
}


