DROP TABLE IF EXISTS dbo.Users

CREATE TABLE dbo.Users
( 
    userId INT NOT NULL IDENTITY(1,1),
    firstName VARCHAR(25) NOT NULL,
    lastName VARCHAR(25) NOT NULL,
    age INT NOT NULL,
    height NUMERIC(18,3) NOT NULL,
    weight NUMERIC(18,3) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR NOT NULL,
    CONSTRAINT PK_User PRIMARY KEY (userId) 
); 