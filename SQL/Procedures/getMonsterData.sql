
create procedure getMonsterData
@id as int
as
select * from monster
where id = @id