//Inquirer package for prompting users
var inquirer = require("inquirer");
//mysql package to utilize a backend database
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
})
//display a table of all the products with all info except product_sales
var getProducts = function(){
    connection.query("SELECT id, product_name, department_name, price, stock_quantity  FROM `products` ", function(error, res){
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
            message: "Please enter the ID of the product you wish to order: "
        }
    ]).then(function (answer){
        //store the customers input and pass it into the next prompt
        var desired_prod = parseInt(answer.customer_choice);
        promptQuantity(desired_prod);
    })
}

//prompt user for the amount of units they wish to order on that ID
var promptQuantity = function(desired_id){
    inquirer.prompt([
        {
            name: "customer_quantity",
            message: "How much would you like to order?"
        }
    ]).then(function (answer){
        var quantity = parseInt(answer.customer_quantity);
        //get the stock_quantity of the product at the desired id
        connection.query("SELECT * FROM `products` WHERE `id` = " + connection.escape(desired_id), function(error, results){
            if (error) throw error;
            //if the desired qunatity is less than the  stock_quantity place an order
            if(quantity <= results[0].stock_quantity){
                placeOrder(results[0], quantity);
            }
            //else inform customer that order is too large
            else console.log("Sorry your order is too large!!");
        });

    });
}

//this function will actually place the order and update the database
var placeOrder = function(prod, quant){
    console.log("Ordering " + quant + " "+ prod.product_name + "(s)");
    connection.query("UPDATE products SET ?, ? WHERE ?",
        [
            //updating stock quantity
            {
                stock_quantity: (prod.stock_quantity - quant)
            },
            //tracking the sales
            {
                product_sales: prod.product_sales + (prod.price * quant)
            },
            {
                id: prod.id
            }
        ],
        function(err, result){
            if (err) throw err;
        });
        afterOrderPrompt();
}

//this prompt will either exit the application or allow the customer to place another order
var afterOrderPrompt = function(){
    inquirer.prompt([
        {
            type: "confirm",
            name: "nextAction",
            message: "Would you like to place another order?"
        }

    ]).then(function(answer){
        if (answer.nextAction){
            getProducts();
        }
        else{
            console.log("Thanks for shopping with us!")
            connection.end();
        }
    })
}