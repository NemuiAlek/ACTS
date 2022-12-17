/*
drop table combat_conditions
drop table combat_notes

drop table combat_Detail
drop table combat
*/

create table combat(
 id bigint primary key identity (1,1)
,[name] nvarchar(255)
,[desc] nvarchar(2500)
,[currentRound] int
,CreatedBy int not null foreign key references users(id)
,CreatedDate date not null
,ModifiedDate date
)

create table combat_Detail(
 id bigint primary key identity (1,1)
,combatID bigint foreign key references combat(id)
,monsterID nvarchar(1200) not null
,maxHP int not null
,currentHP int not null
,monsterName nvarchar(1200)
,monsterSize nvarchar(1200)
,monsterType nvarchar(1200)
,monsterAlignment nvarchar(1200)
,monsterAC int
,monsterArmor nvarchar(1200)
,initiative int
,sort int not null
,activeCreature bit not null
)

create table combat_conditions(
 id bigint primary key identity (1,1)
,combat_DetailID bigint foreign key references combat_Detail(id)
,[name] nvarchar(255)
,constraint chk_combatConditionName check ([name] in ('Blinded','Charmed','Deafened','Exhaustion','Frightened','Grappled','Incapacitated','Paralyzed','Petrified','Poisoned','Prone','Restrained','Stunned','Unconscious'))
)

create table combat_notes(
 id bigint primary key identity (1,1)
,combat_DetailID bigint foreign key references combat_Detail(id)
,notes nvarchar(1200)
)
