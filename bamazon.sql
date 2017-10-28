DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) default 0,
  stock_quantity INT(10) default 0,
  PRIMARY KEY (id)
);


insert into products (product_name, department_name,price,stock_quantity)
values("4k TV","Electronics",549.99,100);

insert into products (product_name, department_name,price,stock_quantity)
values("Mac Book","Electronics",2399.99,25);

insert into products (product_name, department_name,price,stock_quantity)
values("Rokit Speacker","Electronics",219.99,30);

insert into products (product_name, department_name,price,stock_quantity)
values("Bluetooth Headphones","Electronics",49.99,200);

insert into products (product_name, department_name,price,stock_quantity)
values("Apple Watch","Electronics",429.99,5);

insert into products (product_name, department_name,price,stock_quantity)
values("Gaming PC","Electronics",2549.99,10);

insert into products (product_name, department_name,price,stock_quantity)
values("Nvidia GTX 1080","Electronics",749.99,15);

insert into products (product_name, department_name,price,stock_quantity)
values("Synth","Music",1549.99,4);

insert into products (product_name, department_name,price,stock_quantity)
values("Drum Machine","Music",349.99,60);

insert into products (product_name, department_name,price,stock_quantity)
values("Midi Controller","Music",199.99,100);