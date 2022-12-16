

alter procedure getMonsterData
@id as int
as

--DECLARE @id AS INT = 1

DECLARE @speacial_abilities AS NVARCHAR(MAX) = (
SELECT 
x.*
FROM dbo.monster_SpecialAbilities x
where monsterID = @id
FOR JSON AUTO
)

DECLARE @actions AS NVARCHAR(MAX) = (
SELECT 
x.*
FROM dbo.monster_Action x
where monsterID = @id
FOR JSON AUTO
)

DECLARE @legendary_actions AS NVARCHAR(MAX) = (
SELECT 
x.*
FROM dbo.monster_LegendaryAction x
where monsterID = @id
FOR JSON AUTO
)

DECLARE @speed AS NVARCHAR(MAX) = (
SELECT 
x.*
FROM dbo.monster_Speed x
where monsterID = @id
FOR JSON AUTO
)

DECLARE @skills AS NVARCHAR(MAX) = (
SELECT 
x.*
FROM dbo.monster_Skill x
where monsterID = @id
FOR JSON AUTO
)


SELECT
 m.*
,[skills] = @skills
,[speed] = @speed
,[special_abilities] = @speacial_abilities
,[actions] = @actions
,[legendary_actions] = @legendary_actions
FROM monster m
where id = @id
