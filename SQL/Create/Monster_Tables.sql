
/*
drop table monster_activeskill
drop table monster_PassiveSkill
drop table monster_IMM_RES_VUL
drop table monster_Sense
drop table monster_Language
drop table monster_Ability
drop table monster_action
drop table monster_legendaryaction

drop table monster
*/


CREATE TABLE monster(
 id BIGINT PRIMARY KEY idENTITY (1,1)
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
,inteligence INT NOT NULL
,wisdom INT NOT NULL
,charisma INT NOT NULL

,strength_save INT
,dexterity_save INT 
,constitution_save INT 
,inteligence_save INT 
,wisdom_save INT
,charisma_save INT

,damage_vulnerabilities NVARCHAR(1200)
,damage_resistances NVARCHAR(1200)
,damage_immunities NVARCHAR(1200)
,condition_immunities NVARCHAR(1200)
,senses NVARCHAR(1200)
,languages nvarchar(1200)
,challenge_rating INT NOT NULL
,legendary_desc nvarchar(2500)

,monsterDescription NVARCHAR(2500)
,URL NVARCHAR(MAX)
,CreatedBy INT NOT NULL FOREIGN KEY REFERENCES users(id)
,CreatedDate DATE NOT NULL
,ModifiedDate DATE
)

CREATE TABLE monster_Speed(
 id BIGINT PRIMARY KEY idENTITY(1,1)
,monsterid BIGINT NOT NULL FOREIGN KEY REFERENCES monster(id)
,speedType NVARCHAR(200) NOT NULL
,speedAmount INT NOT NULL
)


CREATE TABLE monster_Skill(
 id BIGINT PRIMARY KEY idENTITY(1,1)
,monsterid BIGINT NOT NULL FOREIGN KEY REFERENCES monster(id)
,[name] NVARCHAR(50) NOT NULL
,modifier INT NOT NULL
,CONSTRAINT chk_activeskillname CHECK ([name] IN ('passive Perception','passive Insight', 'passive Investigation','Acrobatics','Animal Handling','Arcana','Athletics','Deception','History','Insight','Intimidation','Investigation','Medicine','Nature','Perception','Performance','Persuasion','Religion','Sleight of Hand','Stealth','Survival'))
)


create table monster_SpecialAbilities(
 id bigint primary Key identity(1,1)
,monsterid bigint not null foreign key REFERENCES monster(id)
,[name] nvarchar(255) not null
,[desc] nvarchar(max) not null
)

create table monster_Action(
 id bigint primary Key identity(1,1)
,monsterid bigint not null foreign key REFERENCES monster(id)
,[name] nvarchar(255) not null
,[desc] nvarchar(max) not null
)

create table monster_Reactions(
 id bigint primary Key identity(1,1)
,monsterid bigint not null foreign key REFERENCES monster(id)
,[name] nvarchar(255) not null
,[desc] nvarchar(max) not null
)

create table monster_LegendaryAction(
 id bigint primary Key identity(1,1)
,monsterid bigint not null foreign key REFERENCES monster(id)
,[name] nvarchar(255) not null
,[desc] nvarchar(max) not null
)

