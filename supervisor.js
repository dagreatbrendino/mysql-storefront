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
    connection.query("SELECT department_id, department_name, overhead_costs, ? AS Profit FROM departments ",
    [1000],
    function(err, res){
        if (err) throw err;
        console.table(res);
    });
}

//function that allows supervisor to create a new department
var createDepartment = function(depName, overhead){
    connection.query("INSERT INTO departments SET department_name = ?, overhead_costs = ?",
    [depName, overhead],
    function(err, res){
        if (err) throw err;
        console.log("New Department Added!");
    });
}
viewSales();