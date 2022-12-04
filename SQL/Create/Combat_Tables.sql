/*
drop table combat_conditions
drop table combat_notes
drop table combat_Line
drop table combat
*/

create table combat(
 ID bigint primary key identity (1,1)
,EncounterName nvarchar(255)
,EncounterDesc nvarchar(2500)
,CreatedBy int not null foreign key references users(id)
,CreatedDate date not null
,ModifiedDate date
)

create table combat_Line(
 ID bigint primary key identity (1,1)
,combatID bigint foreign key references combat(id)
,isCustom bit not null
,monsterID nvarchar(1200) not null
,currentHP int not null
,initiative int
,sort int not null
,activeCreature bit not null
)

create table combat_conditions(
 ID bigint primary key identity (1,1)
,combat_LineID bigint foreign key references combat_Line(id)
,conditionName nvarchar(255)
,URL nvarchar(1200)
,constraint chk_combatConditionName check (conditionName in ('Blinded','Charmed','Deafened','Exhaustion','Frightened','Grappled','Incapacitated','Paralyzed','Petrified','Poisoned','Prone','Restrained','Stunned','Unconscious'))
)

create table combat_notes(
 ID bigint primary key identity (1,1)
,combat_LineID bigint foreign key references combat_Line(id)
,conditionName nvarchar(255)
,URL nvarchar(1200)
)
