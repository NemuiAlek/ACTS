alter proc deleteCombat(
@id as nvarchar(max),
@sessionId as nvarchar(max)
) as

declare @combat_DetailIds as table (id int)
insert into @combat_DetailIds
(
    id
)
select id from dbo.combat_Detail
where combatID = cast(@id as bigint)

if(cast(@sessionId as int) = (select CreatedBy from dbo.combat where id = cast(@id as bigint)))
begin
delete dbo.combat_conditions
where combat_DetailID in (select * from @combat_DetailIds);

delete dbo.combat_notes
where combat_DetailID in (select * from @combat_DetailIds);

delete dbo.combat_Detail
where combatID = cast(@id as bigint);

delete dbo.combat
where id = cast(@id as bigint)

end
