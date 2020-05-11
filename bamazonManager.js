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
        }
    ]).then(function(answer){
      
        if(answer.options === "View Products for Sale"){
            viewProducts()
        } else if(answer.options === "View Low Inventory"){
            lowInv()
        }else if (answer.options === "Add to Inventory"){
            addInv()
        }else if(answer.options === "Add new Product"){
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
    inquirer
    .prompt([
        {
            type: "input",
            message: "What is the name of your product?",
            name: "name"
        }, 
        {
            type: "input", 
            message: "What department does your product go into?",
            name: "department"
        },
        {
            type: "input",
            message: "What is the price?",
            name: "price"
        },
        {
            type: "input", 
            message: "How many are you adding?",
            name: "quantity"
        }
    ]).then(function(answer){
        var query = "INSERT INTO products SET ?"

        connection.query(
            query, 
            [
                {
                    product_name: answer.name,
                    department_name: answer.department,
                    price: answer.price,
                    stock_quantity: answer.quantity
                }
            ],
            function(err){
                if(err) throw err;
                console.log(`You have successfully added ${answer.name} to the inventory list!`)
            }
        )
    })
}

function exit(){
    connection.end()
}


