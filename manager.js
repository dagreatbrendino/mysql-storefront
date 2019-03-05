//inquirer package
var inquirer = require("inquirer");
//mysql package
var mysql = require("mysql");

//assign a variable that maintains a connection to the database
var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "",
    database: "storefront_db"
});

//connect to the database
connection.connect(function(err){
    if(err) throw err;

    console.log("connected as id: " + connection.threadId + "\n");
});
//function that prompts manager for what they would like to do

//function that allows manager to view all products for sale
var viewProducts = function(){
    connection.query("SELECT * FROM products", function(err, res){
        if (err) throw err;
        console.table(res);
        connection.end();
    });
}

//function that will show manager all products with inventory < 50

//function that allows manager to add to product inventory

//function that allows manager to add a new product through a series of prompts, validating input along the way
viewProducts();