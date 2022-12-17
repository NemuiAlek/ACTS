
--/*
ALTER PROC createUpdateArray(
 @id AS INT
,@jsondata AS NVARCHAR(MAX)
)
AS
--*/

/*for testing
DECLARE @jsondata AS NVARCHAR(MAX) =  '{"monsterID":"1","arrayName":"special_abilities","name":"Magic Weapons","modifier":"Vyraetra''''s weapon attacks are magical. test"}'
DECLARE @id AS INT = 3
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

DECLARE @arrayColumn NVARCHAR(200) = CASE WHEN @array IN ('speed','skills') THEN 'modifier'
									 ELSE 'desc'
									 END

DECLARE @descMod NVARCHAR(200) = CASE WHEN @arrayColumn = 'modifier' THEN CAST((SELECT [modifier] FROM @data) AS NVARCHAR(200))
									  ELSE (SELECT ''''+[modifier]+'''' FROM @data d)
									  END

DECLARE @monsterID NVARCHAR(200) = CAST((SELECT [monsterID] FROM @data) AS NVARCHAR(200))
DECLARE @name NVARCHAR(200) = (SELECT [name] FROM @data)
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
	INSERT INTO '+@tablename+'
	(
		monsterid,
		[name],
		['+@arrayColumn+']
	)
	VALUES
	(   '+@monsterID+',
		'''+@name+''',
		'+@descMod+' 
	)
END


ELSE IF ('+@arrayid+' != 0)
BEGIN
	UPDATE '+@tablename+'
	SET [name] = '''+@name+'''
	,['+@arrayColumn+'] = '+@descMod+'
	WHERE id = '+@arrayid+'
END
'


--SET @sql_string = N'test '''+@name+''''

EXEC sp_executesql @SQL_string

--PRINT @SQL_string
