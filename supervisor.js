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

//function that allows supervisor to view product sales by department
var viewSales = function(){
    connection.query("SELECT department_id, departments.department_name, overhead_costs, SUM(product_sales) AS product_sales, (SUM(product_sales) - overhead_costs) AS Profit FROM departments "+
    "LEFT JOIN products ON departments.department_name = products.department_name "+
    "GROUP BY department_name",
    function(err, res){
        if (err) throw err;
        console.table(res);
        promptSuper();
    });
}

//function that allows supervisor to create a new department
var createDepartment = function(depName, overhead){
    connection.query("INSERT INTO departments SET department_name = ?, overhead_costs = ?",
    [depName, overhead],
    function(err, res){
        if (err) throw err;
        console.log("New Department Added!");
        promptSuper();
    });
}

var promptSuper = function(){
    inquirer.prompt([
        {
            name: "superAction",
            type: "list",
            choices: ["View Department Sales", "Add a New Department","Logout"],
            message: "What would you like to do?"
        }
    ]).then(function(answer){
        switch(answer.superAction){
            case "View Department Sales":
                viewSales();
                break;
            case "Add a New Department":
                inquirer.prompt([
                    {
                        name: "depName",
                        type: "input",
                        message: "Enter the name for the new department: "
                    },
                    {
                        name: "depCost",
                        type: "input",
                        message: "Enter the overhead cost for this department: "
                    }
                ]).then(function(ans){
                    createDepartment(ans.depName, parseInt(ans.depCost));
                });
                break;
            case "Logout":
                console.log("Goodbye!");
                connection.end();
        }
    })
}
promptSuper();