DROP TABLE IF EXISTS dbo.DailyFitness

CREATE TABLE dbo.DailyFitness
(
    fitnessId INT NOT NULL,
    userId INT NOT NULL,
    fitnessDate DATETIME NOT NULL,
	weight NUMERIC(18, 3) NOT NULL,
    steps INT NULL,
    water INT NULL,
    calories INT NULL,
    floors INT NULL,
    CONSTRAINT PK_dailyFitness PRIMARY KEY (fitnessId)
); 

ALTER TABLE dbo.DailyFitness
ADD CONSTRAINT FK_dailyFitnessUser
FOREIGN KEY (userId) REFERENCES dbo.Users(userId)

ALTER TABLE dbo.DailyFitness
ALTER COLUMN fitnessDate DATE