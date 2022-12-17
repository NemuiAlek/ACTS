create proc deleteCombatDetail(
@id as nvarchar(max)
) as
delete from dbo.combat_Detail
where id = cast(@id as bigint)