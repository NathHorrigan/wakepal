DROP TABLE IF EXISTS dbo.FriendshipRequests

CREATE TABLE dbo.FriendshipRequests
(
    requestId INT NOT NULL,
    requestorId INT NOT NULL,
    recipientId INT NOT NULL,
    Accepted BIT NULL,
    CONSTRAINT PK_friendshipRequests PRIMARY KEY (requestId)
); 

ALTER TABLE dbo.FriendshipRequests
ADD CONSTRAINT FK_friendshipRequestor
FOREIGN KEY (requestorId) REFERENCES dbo.Users(userId)

ALTER TABLE dbo.FriendshipRequests
ADD CONSTRAINT FK_friendshipRecipients
FOREIGN KEY (recipientId) REFERENCES dbo.Users(userId)