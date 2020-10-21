use sql_crm;

DROP TABLE customer;
CREATE TABLE customer(
    _id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30),
    email VARCHAR(40),
    firstContact DATE,
    emailType VARCHAR(4),
    sold BOOLEAN,
    owner VARCHAR(30),
    country VARCHAR(30)
);
select * from customer