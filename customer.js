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
        promptID();
    });

}

getProducts();


//prompt user for id of the product they would like to order
var promptID = function(){
    inquirer.prompt([
        {
            name: "customer_choice",
            message: "Please enter the ID of the product you wish to order..."
        }
    ]).then(function (answer){
        //store the customers input and pass it 
        var desired_prod = parseInt(answer.customer_choice);
        promptQuantity(desired_prod);
    })
}

//prompt user for the amount of units they wish to order on that ID

var promptQuantity = function(des_id){
    inquirer.prompt([
        {
            name: "customer_quantity",
            message: "How much of _____ would you like to order?"
        }
    ]).then(function (answer){
        var quantity = parseInt(answer.customer_quantity);
        connection.end();
    })
}