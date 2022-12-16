
create procedure getMonsterLegendaryActions
@id as INT
AS

--DECLARE @id AS INT = 1

SELECT 
 x.*
FROM dbo.monster_LegendaryAction x
where monsterID = @id