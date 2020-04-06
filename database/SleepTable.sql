DROP TABLE IF EXISTS dbo.Sleep
 
CREATE TABLE dbo.Sleep
(
    sleepId INT NOT NULL,
    userId INT NOT NULL,
    awake TIME NULL, 
    light TIME NULL,
    deep TIME NULL,
    rem TIME NULL,
    sleepDate DATETIME NOT NULL,
    CONSTRAINT PK_sleep PRIMARY KEY (sleepId)
); 

ALTER TABLE dbo.Sleep
ADD CONSTRAINT FK_SleepUser
FOREIGN KEY (userId) REFERENCES dbo.Users(userId)