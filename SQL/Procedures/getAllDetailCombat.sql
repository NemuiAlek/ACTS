
alter proc getAllDetail(
@id as nvarchar(max)
) as
select
ROW_NUMBER() OVER(ORDER BY initiative desc) AS rowNum,
*
from dbo.combat_Detail
where combatID = cast(@id as bigint)