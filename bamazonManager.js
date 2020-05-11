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
    connection.end()
});