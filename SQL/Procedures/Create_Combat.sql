--/*
alter proc createUpdateCombat(
  @sessionid as nvarchar(max)
, @combatID as nvarchar(max)
, @jsondata as nvarchar(max)
) as
--*/

/* for testing
declare @jsondata AS NVARCHAR(MAX) = ''
DECLARE @sessionid AS NVARCHAR(MAX) = '1'
*/

if object_id(N'tempdb..#jsonData') is not null
begin
drop table #jsonData
end

select
*
into #jsonData
from openjson(@jsondata) 
with(
id nvarchar(max),
[name] nvarchar(max),
[desc] nvarchar(max),
[round] nvarchar(max),
[roundUpdate] nvarchar(max)
)

DECLARE @roundUpdate AS NVARCHAR(25) = (SELECT [roundUpdate] FROM #jsonData)

IF (@combatID = 'new')
BEGIN

INSERT INTO dbo.combat
(
    name,
    [desc],
    currentRound,
    CreatedBy,
    CreatedDate,
    ModifiedDate
)
select   
	CASE WHEN j.[name] = '' THEN 'Unnamed Combat' ELSE j.[name] END,      -- name - nvarchar(255)
    CASE WHEN j.[desc] = '' THEN 'No Description' ELSE j.[desc] END,      -- desc - nvarchar(2500)
    0,      -- roundsCompleted - int
    CASE WHEN @sessionid = 'Guest' THEN 0 ELSE CAST(@sessionid AS INT) END,         -- CreatedBy - int
    GETDATE(), -- CreatedDate - date
    NULL       -- ModifiedDate - date
FROM #jsonData j

SELECT id=SCOPE_IDENTITY()

END

ELSE IF (@roundUpdate = 'false')
begin
UPDATE dbo.combat
SET
    [name] = j.[name],
    [desc] = j.[desc],
    ModifiedDate = GETDATE()
FROM #jsonData j
WHERE combat.id = CAST(j.id AS BIGINT)
AND combat.CreatedBy = CAST(@sessionid AS INT)

END

ELSE IF (@roundUpdate = 'true')
begin
UPDATE dbo.combat
SET
	[currentRound] =j.[round],
	ModifiedDate = GETDATE()
FROM #jsonData j
WHERE combat.id = CAST(j.id AS BIGINT)
AND combat.CreatedBy = CAST(@sessionid AS INT)
END

