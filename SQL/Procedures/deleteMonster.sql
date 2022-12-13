
create procedure deleteMonster
@id as int
as
DELETE dbo.monster
where id = @id