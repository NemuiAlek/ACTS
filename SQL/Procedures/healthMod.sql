alter proc modifyHealth(
@id as nvarchar(max),
@healthMod as nvarchar(max),
@action as nvarchar(max)
) as

update dbo.combat_Detail
set currentHP = case when @action = 'Damage' then
											 case when currentHP <= cast(@healthMod as int) then 0 else currentHP - cast(@healthMod as int) end
					 when @action = 'Heal' then
											 case when (currentHP + cast(@healthMod as int)) > = maxHP then maxHP else currentHP + cast(@healthMod as int) end
					 end
where id = cast(@id as bigint)