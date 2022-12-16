

alter PROC createUpdateArray(
 @id AS INT
,@jsondata AS NVARCHAR(MAX)
)
AS

/*for testing
DECLARE @jsondata AS NVARCHAR(MAX) = '{"monsterID":"1","name":"fly","modifier":60}'
DECLARE @id AS INT = 2
*/

DECLARE @data AS TABLE (monsterID bigInt, [arrayName] NVARCHAR(200), [name] nvarchar(2500), [desc] nvarchar(2500), modifier INT) 

INSERT INTO @data
SELECT
*
FROM (
SELECT [KEY], [value] FROM OPENJSON(@jsondata)
) AS params
PIVOT
(
	MAX([value])
	FOR [KEY]  IN ( [monsterID],[arrayName],[name],[desc],[modifier])
) AS pivottable

DECLARE @array NVARCHAR(200) = (SELECT arrayName FROM @data)

IF (@id = 0 AND @array='speed')
BEGIN
INSERT INTO dbo.monster_Speed
(
    monsterid,
    [name],
    [modifier]
)
select
 d.monsterID
,d.[name]
,d.[modifier]
FROM @data d
END

IF (@id != 0 AND @array='speed')
BEGIN
UPDATE dbo.monster_Speed
SET [name] = d.[name]
,[modifier] = d.[modifier]
FROM @data d
WHERE id = @id
end
