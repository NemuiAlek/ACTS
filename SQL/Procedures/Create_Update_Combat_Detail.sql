--/*
alter PROC createUpateCombateDetail(
 @combatID AS NVARCHAR(MAX)
, @action as nvarchar(max)
, @jsondata AS NVARCHAR(MAX)
) AS
--*/

/* for testing
declare @jsondata AS NVARCHAR(MAX) = '{"action":"new","monsterID":"abbanith-giant","maxHP":76,"currentHP":0,"monsterName":"Abbanith Giant","monsterSize":"Large","monsterType":"giant","monsterAlignment":"neutral","monsterAC":13,"monsterArmor":"natural armor","multiplier":"3","initiative":"14","activeCreature":0}'
declare @action as nvarchar(max) = 'new'
declare @combatID AS NVARCHAR(MAX) = '1'
*/

declare @multiCreate as int = 1

IF OBJECT_ID(N'tempdb..#jsonData') IS NOT NULL
BEGIN
DROP TABLE #jsonData
end

SELECT
*
INTO #jsonData
FROM OPENJSON(@jsondata) 
WITH(
[monsterID] NVARCHAR(MAX),
[maxHP] nvarchar(MAX),
[currentHP] NVARCHAR(MAX)
,monsterName nvarchar(max)
,monsterSize nvarchar(max)
,monsterType nvarchar(max)
,monsterAlignment nvarchar(max)
,monsterAC nvarchar(max)
,monsterArmor nvarchar(max),
[initiative] nvarchar(max),
[activeCreature] nvarchar(max),
[sort] nvarchar(max),
[multiplier] nvarchar(max)
)

--select * from #jsondata


if(@action = 'new')
begin
while @multiCreate <= (select [multiplier] from #jsondata)
begin

insert into dbo.combat_Detail
(
    combatID
  , monsterID
  , maxHP
  , currentHP
  , monsterName
  , monsterSize
  , monsterType
  , monsterAlignment
  , monsterAC
  , monsterArmor
  , initiative
  , sort
  , activeCreature
)
select
   @combatID -- combatID - bigint
  , j.monsterID
  , j.maxHP
  , j.maxHP
  , j.monsterName
  , j.monsterSize
  , j.monsterType
  , j.monsterAlignment
  , j.monsterAC
  , j.monsterArmor
  , j.initiative
  , j.sort
  , j.activeCreature
from #jsonData j

set @multiCreate = @multiCreate + 1

end
end
