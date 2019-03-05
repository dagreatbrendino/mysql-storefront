var inquirer = require("inquirer");

var mysql = require("mysql");


var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "",
    database: "storefront_db"
});

connection.connect(function(err){
    if(err) throw err;

    console.log("connected as id: " + connection.threadId + "\n");
})

var getProducts = function(){
    connection.query("SELECT * FROM `products` ", function(error, res){
        if (error) throw error;
        console.table(res);
    });
    connection.end();
}
getProducts();