--creates the bamazon database--
CREATE DATABASE bamazon_db;

--tells the code to use the bamazon database
USE bamazon_db;

--creates product table--
CREATE TABLE products(
    item_id INTEGER(100) NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price INTEGER(100) NOT NULL,
    stock_quantity INTEGER(100) NOT NULL,
    PRIMARY KEY (item_id)
);


--items to insert into the table colums--
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iPhone 11", "Electronics", 600.00, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Beef Jerky", "Food", 8.00, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Football Jersey", "Clothing", 50.00, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Golf Clubs", "Sports", 100.00, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dog Food", "Pets", 30.00, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Fuzzy Blanket", "Home Goods", 25.00, 14);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Chocolate Syrup", "Food", 3.00, 8);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Air Pods", "Electronics", 250.00. 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Fishing Rod", "Outdoors/Recreation", 60.00, 7);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Soccer Ball", "Sports", 12.00, 80);


--show what is in the table columns--
SELECT * FROM products;