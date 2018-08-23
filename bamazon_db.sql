CREATE DATABASE Bamazon;

USE Bamazon;

CREATE TABLE Products(
    id INTEGER(11) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    department_name VARCHAR(255) NOT NULL,
    price INTEGER NOT NULL,
    stock_quantity INTEGER NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO Products (product_name, department_name, price, stock_quantity)
VALUES ("MacBook Pro 15inch", "Electronics", 3000.84, 10);

INSERT INTO Products (product_name, department_name, price, stock_quantity)
VALUES ("55 inch Flatscreen TV", "Electronics", 1200.67, 50);

INSERT INTO Products (product_name, department_name, price, stock_quantity)
VALUES ("Gray Sweatshirt", "Clothing", 15.99, 100);

INSERT INTO Products (product_name, department_name, price, stock_quantity)
VALUES ("Windshield Wipers", "Auto Parts", 20.75, 200);

INSERT INTO Products (product_name, department_name, price, stock_quantity)
VALUES ("Monopoly", "Toys", 17.99, 95);

INSERT INTO Products (product_name, department_name, price, stock_quantity)
VALUES ("Happy Gilmore", "Movies", 10.99, 30);

INSERT INTO Products (product_name, department_name, price, stock_quantity)
VALUES ("Nike Tennis Shoes", "Clothing", 75.87, 25);

INSERT INTO Products (product_name, department_name, price, stock_quantity)
VALUES ("Teddy Bear", "Toys", 20.99, 33);

INSERT INTO Products (product_name, department_name, price, stock_quantity)
VALUES ("Avengers: Infinity War", "Movies", 22.99, 6);

INSERT INTO Products (product_name, department_name, price, stock_quantity)
VALUES ("Mystery Box", "???", 200, 1);