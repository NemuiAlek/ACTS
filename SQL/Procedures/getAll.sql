
alter PROC getAll
AS
SELECT
 m.id
,m.[name] [name]
,m.challenge_rating
,m.hit_points
,m.armor_class
,m.[type] [type]
,m.size
,m.alignment
,m.legendary_desc
,m.CreatedBy
FROM dbo.monster m
ORDER BY m.[name] asc
