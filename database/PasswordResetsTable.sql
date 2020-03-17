CREATE TABLE dbo.PasswordResets
(
    resetId INT NOT NULL,
    userId INT NOT NULL,
    Code VARCHAR(25) NOT NULL,
    CreationDate DATETIME NOT NULL,
    ExpirationDate DATETIME NOT NULL,
    CONSTRAINT PK_PasswordReset PRIMARY KEY (resetId)
); 

ALTER TABLE dbo.PasswordResets
ADD CONSTRAINT FK_ResetUser
FOREIGN KEY (resetId) REFERENCES dbo.Users(userId)

