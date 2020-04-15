DROP TABLE IF EXISTS dbo.Friendships
  
CREATE TABLE dbo.Friendships
( 
    friendshipId INT NOT NULL,
    userId INT NOT NULL,
    friendId INT NOT NULL,
    CONSTRAINT PK_friendship PRIMARY KEY (friendshipId)
); 

ALTER TABLE dbo.Friendships
ADD CONSTRAINT FK_friendshipUser
FOREIGN KEY (userId) REFERENCES dbo.Users(userId)


ALTER TABLE dbo.Friendships
ADD CONSTRAINT FK_friendshipFriend
FOREIGN KEY (friendId) REFERENCES dbo.Users(userId)