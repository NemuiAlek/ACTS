
/*
drop table monster_Speed
drop table monster_Skill
drop table monster_SpecialAbilities
drop table monster_Action
drop table monster_LegendaryAction

drop table monster
*/


CREATE TABLE monster(
 id BIGINT PRIMARY KEY IDENTITY (1,1)
,[name] VARCHAR(100) NOT NULL
,[size] VARCHAR(1200)
,[type] VARCHAR(1200)
,alignment VARCHAR(200)
,armor_class INT NOT NULL
,armor_desc VARCHAR(200)
,hit_points INT NOT NULL
,hit_dice NVARCHAR(50)

,strength INT NOT NULL
,dexterity INT NOT NULL
,constitution INT NOT NULL
,intelligence INT NOT NULL
,wisdom INT NOT NULL
,charisma INT NOT NULL

,strength_save INT
,dexterity_save INT 
,constitution_save INT 
,intelligence_save INT 
,wisdom_save INT
,charisma_save INT

,damage_vulnerabilities NVARCHAR(1200)
,damage_resistances NVARCHAR(1200)
,damage_immunities NVARCHAR(1200)
,condition_immunities NVARCHAR(1200)
,senses NVARCHAR(1200)
,languages NVARCHAR(1200)
,challenge_rating INT NOT NULL
,legendary_desc NVARCHAR(2500)

,monsterDescription NVARCHAR(2500)
,URL NVARCHAR(MAX)
,CreatedBy INT NOT NULL FOREIGN KEY REFERENCES users(id)
,CreatedDate DATE NOT NULL
,ModifiedDate DATE
)

CREATE TABLE monster_Speed(
 id BIGINT PRIMARY KEY IDENTITY(1,1)
,monsterid BIGINT NOT NULL FOREIGN KEY REFERENCES monster(id)
,[name] NVARCHAR(200) NOT NULL
,[modifier] INT NOT NULL
)


CREATE TABLE monster_Skill(
 id BIGINT PRIMARY KEY IDENTITY(1,1)
,monsterid BIGINT NOT NULL FOREIGN KEY REFERENCES monster(id)
,[name] NVARCHAR(50) NOT NULL
,modifier INT NOT NULL
)


CREATE TABLE monster_SpecialAbilities(
 id BIGINT PRIMARY KEY IDENTITY(1,1)
,monsterid BIGINT NOT NULL FOREIGN KEY REFERENCES monster(id)
,[name] NVARCHAR(255) NOT NULL
,[desc] NVARCHAR(MAX) NOT NULL
)

CREATE TABLE monster_Action(
 id BIGINT PRIMARY KEY IDENTITY(1,1)
,monsterid BIGINT NOT NULL FOREIGN KEY REFERENCES monster(id)
,[name] NVARCHAR(255) NOT NULL
,[desc] NVARCHAR(MAX) NOT NULL
)


create table monster_LegendaryAction(
 id bigint primary Key identity(1,1)
,monsterid bigint not null foreign key REFERENCES monster(id)
,[name] nvarchar(255) not null
,[desc] nvarchar(max) not null
)

