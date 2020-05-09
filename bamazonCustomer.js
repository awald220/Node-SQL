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

    //add question in inquirer
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
    ])
    connection.end()
});

