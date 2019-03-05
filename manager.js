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

    // console.log("connected as id: " + connection.threadId + "\n");
});
//function that prompts manager for what they would like to do

//function that allows manager to view all products for sale
var viewProducts = function(){
    connection.query("SELECT * FROM products ORDER BY department_name, product_name ASC", function(err, res){
        if (err) throw err;
        console.table(res);
        promptManager();
    });
    
}

//function that will show manager all products with inventory < 50
var viewLow = function(){
    connection.query("SELECT * FROM products WHERE stock_quantity < ?",[50], function(err,res){
        if (err) throw err;
        console.table(res);
        promptManager();
    })

}

//function that allows manager to add to product inventory of a specific product with a specific amount
var addInventory = function(amount, prod){
    connection.query(
        "UPDATE products set stock_quantity = stock_quantity + ? WHERE id = ?", [ amount, prod ],
        function(err, result){
            if (err) throw err;
            console.log("Stock updated!")
            promptManager();
        });

}
//function that allows manager to add a new product through a series of prompts, validating input along the way
var addProduct = function(name, department, price, stock){
    connection.query("INSERT INTO products SET product_name = ?, department_name = ?, price = ?, stock_quantity = ?",
    [name, department, price, stock],
    function(err, res){
        if (err) throw err;
        console.log("new product added!");
        promptManager();
    });
  
}
//inqurier prompt for manager actions
var promptManager = function(){
    //Prompt the manager with a list of actions
    inquirer.prompt([
        {
            name: "managerAction",
            type: "list",
            message: "What would you like to do?",
            choices: ["View Products", "View Low Inventory", "Add Stock to Inventory", "Add a New Product", "Logout"]
        }
    ]).then(function (answer){
        var action = answer.managerAction;
        //Perform the requested action
        switch (action){
            case "View Products": 
                viewProducts();
                break;
            case "View Low Inventory":
                viewLow();
                break;
            //If the manager is attemting to add stock to a product, they will be prompted for the id of the product and the amount to add to the stock
            case "Add Stock to Inventory":
                inquirer.prompt([
                    {
                        name: "productToUpdate",
                        type: "input",
                        message: "Enter the id of the product you wish to add stock to. "
                    },
                    {
                        name: "amountToAdd",
                        type: "input",
                        message: "How much would you like to add?"
                    }
                ]).then( function(ans){
                    //Once the manager has provided the product id and amount to add, the addInventory() function will be called
                    var product = parseInt(ans.productToUpdate);
                    console.log(product);
                    var quantity = parseInt(ans.amountToAdd);
                    addInventory(quantity, product);
                });
                break;
            //If the manager is attempting to add a new product, they will be prompted for its name, chose a department from a list, set the price, and quantity
            case "Add a New Product":
                var departments =[];
                connection.query("SELECT DISTINCT department_name FROM departments", function(error, result){
                    if (error) throw error;
                    result.forEach(function(element){
                        departments.push(element.department_name);
                    });
                    inquirer.prompt([
                        {
                            name: "productName",
                            type: "input",
                            message: "Enter the name of the new product"
                        },
                        {
                            name: "productDepartment",
                            type: "list",
                            choices: departments,
                            message: "Chose the appropriate department for this product: "
                        },
                        {
                            name: "productPrice",
                            type: "input",
                            message: "Enter the price of this product: "
                        },
                        {
                            name: "productQuantity",
                            type: "input",
                            message: "Enter the amount of the product to add to the stock: "
                        }
                    ]).then(function(ans){
                        //Once the manager has provided all the require information, the product will be added to the database by calling the addProduct() function
                        var prodName = ans.productName;
                        var prodDep = ans.productDepartment
                        var prodPrice = parseInt(ans.productPrice);
                        var prodQuant = parseInt(ans.productQuantity)
                        addProduct(prodName, prodDep, prodPrice, prodQuant);
                    })
                })
                break;
            case "Logout": 
                console.log("Goodbye!");
                connection.end();
                break;
        }
    })
}
promptManager();