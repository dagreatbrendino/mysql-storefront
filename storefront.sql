-- Drops the storefront database if it exists currently --
DROP DATABASE IF EXISTS storefront_db;
-- Creates the "storefront_db" database --
CREATE DATABASE storefront_db;

-- Make it so all of the following code will affect favorite_db --
USE storefront_db;
-- Creates the table "favorite_foods" within favorite_db --

CREATE TABLE products (
  -- Create a numeric column called "id" which automatically increments and cannot be null --
  id INTEGER NOT NULL AUTO_INCREMENT,
  -- Create a string column called "movie" which cannot be null --
  product_name VARCHAR(100) NOT NULL,
  -- Create a boolean column called "five_times" that sets the default value to false if nothing is entered --
  department_name VARCHAR(100) NOT NULL,
  -- Make an integer column called "score" --
  price INTEGER(10) NOT NULL,
  -- Make an integer for the quantity of the product in stock -- 
  stock_quantity INTEGER(6) NOT NULL,
  -- Make an integer for the total product sales -- 
  product_sales INTEGER(10) DEFAULT 0,
  -- Set the primary key of the table to id --
  PRIMARY KEY(id)
);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("X-Box One", "Video Games", 400, 10000);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("PS4", "Video Games", 450, 10000);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Nintendo Switch", "Video Games", 250, 10000);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Bicycle", "Sports", 850, 300);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Snowboard", "Sports", 150, 600);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Helmet", "Sports", 85, 3000);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ('"Fancy" Dinner Plate Set', "Home/Kitchen", 60, 1200);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Pot and Pan Set", "Home/Kitchen", 180, 400);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Drumset", "Music", 850, 2000);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Guitar", "Music", 1200, 1500);

CREATE TABLE departments(
    -- Create a numeric column called "department_id" which automatically increments and cannot be null --
  department_id INTEGER NOT NULL AUTO_INCREMENT,

  department_name VARCHAR(100) NOT NULL,

  overhead_costs INTEGER NOT NULL,
    -- Set the primary key of the table to id --
  PRIMARY KEY(department_id)
);

INSERT INTO departments(department_name, overhead_costs)
VALUES ("Home/Kitchen", 5000);
INSERT INTO departments(department_name, overhead_costs)
VALUES ("Music", 10000);
INSERT INTO departments(department_name, overhead_costs)
VALUES("Sports", 4300);
INSERT INTO departments(department_name, overhead_costs)
VALUES("Video Games", 13370);
