CREATE DATABASE Bamazon_DB;

USE Bamazon_DB;

CREATE TABLE Products(
    id INTEGER AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    department_name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INTEGER NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO Products (product_name, department_name, price, stock_quantity)
VALUES ("MacBook Pro 15 inch", "Electronics", 3000.85, 10);

INSERT INTO Products (product_name, department_name, price, stock_quantity)
VALUES ("55 inch Flatscreen TV", "Electronics", 1200.99, 50);

INSERT INTO Products (product_name, department_name, price, stock_quantity)
VALUES ("Gray Sweatshirt", "Clothing", 15.99, 100);

INSERT INTO Products (product_name, department_name, price, stock_quantity)
VALUES ("Windshield Wipers", "Auto Parts", 20.75, 200);

INSERT INTO Products (product_name, department_name, price, stock_quantity)
VALUES ("Monopoly", "Toys", 17.85, 95);

INSERT INTO Products (product_name, department_name, price, stock_quantity)
VALUES ("Happy Gilmore", "Movies", 10.99, 30);

INSERT INTO Products (product_name, department_name, price, stock_quantity)
VALUES ("Nike Tennis Shoes", "Clothing", 75.77, 25);

INSERT INTO Products (product_name, department_name, price, stock_quantity)
VALUES ("Teddy Bear", "Toys", 20.50, 33);

INSERT INTO Products (product_name, department_name, price, stock_quantity)
VALUES ("Avengers: Infinity War", "Movies", 22.99, 6);

INSERT INTO Products (product_name, department_name, price, stock_quantity)
VALUES ("Mystery Box", "???", 5000, 1);