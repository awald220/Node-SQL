DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
    item_id INTEGER(100) NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price INTEGER(100) NOT NULL,
    stock_quantity INTEGER(100) NOT NULL,
    PRIMARY KEY (item_id)
)