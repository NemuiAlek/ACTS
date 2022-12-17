
--/*
ALTER PROC deleteArray(
 @id AS INT
,@jsondata AS NVARCHAR(MAX)
)
AS
--*/

/*for testing
DECLARE @jsondata AS NVARCHAR(MAX) = '{"monsterID":"1","arrayName":"speed","name":"fly","modifier":120}'
DECLARE @id AS INT = 2
*/

DECLARE @data AS TABLE (monsterID NVARCHAR(MAX), [arrayName] NVARCHAR(MAX), [name] NVARCHAR(MAX), modifier NVARCHAR(MAX)) 
DECLARE @SQL_string AS NVARCHAR(MAX)

INSERT INTO @data
SELECT
*
FROM  OPENJSON(@jsondata)
with
(
 monsterID NVARCHAR(MAX)
,arrayName nvarchar(MAX)
,[name] NVARCHAR(MAX)
,[modifier] NVARCHAR(MAX)
)

DECLARE @array NVARCHAR(200) = (SELECT arrayName FROM @data)

DECLARE @arrayid AS NVARCHAR(200) = CAST(@id AS NVARCHAR(200))

DECLARE @tablename NVARCHAR(200) = CASE WHEN @array = 'speed' THEN  'dbo.monster_Speed'
										WHEN @array = 'skills' THEN 'dbo.monster_Skill'
										WHEN @array = 'special_abilities' THEN 'dbo.monster_SpecialAbilities'
										WHEN @array = 'actions' THEN 'dbo.monster_Action'
										WHEN @array = 'legendary_actions' THEN 'dbo.monster_LegendaryAction'
										ELSE ''
										END

SET @SQL_string = N'
IF ('+@arrayid+' = 0)
BEGIN
Print ''''
END


ELSE IF ('+@arrayid+' != 0)
BEGIN
	delete '+@tablename+'
	WHERE id = '+@arrayid+'
END
'


--SET @sql_string = N'test '''+@name+''''

EXEC sp_executesql @SQL_string

--PRINT @SQL_string