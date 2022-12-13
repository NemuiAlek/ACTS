
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
 id BIGINT PRIMARY KEY IDENTITY (1,1)
,monsterName VARCHAR(100) NOT NULL
,Title VARCHAR(1200)
,ArmorClass INT NOT NULL
,HitPoints INT NOT NULL
,HitPointsRolled NVARCHAR(50)

,GroundSpeed INT
,FlightSpeed INT
,swimSpeed INT
,burrowSpeed INT

,Strength INT NOT NULL
,Dexterity INT NOT NULL
,Constitution INT NOT NULL
,Inteligence INT NOT NULL
,Wisdom INT NOT NULL
,Charisma INT NOT NULL

,LegendaryRes INT
,LegendaryAct INT
,ChallengeRating INT
,ExperiencePoints BIGINT
,AdditionalNotes NVARCHAR(1200)
,MonsterDescription NVARCHAR(2500)
,Image NVARCHAR(MAX)
,URL NVARCHAR(MAX)
,CreatedBy INT NOT NULL FOREIGN KEY REFERENCES users(id)
,CreatedDate DATE NOT NULL
,ModifiedDate DATE
)


CREATE TABLE monster_ActiveSkill(
 ID BIGINT PRIMARY KEY IDENTITY(1,1)
,monsterID BIGINT NOT NULL FOREIGN KEY REFERENCES monster(ID)
,sName NVARCHAR(50) NOT NULL
,modifier INT NOT NULL
,CONSTRAINT chk_activeskillname CHECK (sName IN ('Acrobatics','Animal Handling','Arcana','Athletics','Deception','History','Insight','Intimidation','Investigation','Medicine','Nature','Perception','Performance','Persuasion','Religion','Sleight of Hand','Stealth','Survival'))
)

create table monster_PassiveSkill(
 ID bigint primary Key identity(1,1)
,monsterID bigint not null foreign key REFERENCES monster(ID)
,sName nvarchar(50) not null
,modifier int not null
,constraint chk_pssiveskillname check (sName in ('Perception','Insight','Investigation'))
)

create table monster_IMM_RES_VUL(
 ID bigint primary key identity(1,1)
,monsterID bigint not null foreign key REFERENCES monster(ID)
,keyType nvarchar(50) not null
,effectType nvarchar(50)
,damageType nvarchar(255)
,conditionType nvarchar(255)
,constraint chk_keyType check (keyType in ('Immune','Resistant','Vulnerable'))
,constraint chk_effectType check (effectType in ('Damage','Condition '))
,constraint chk_damageType check (damageType in ('Acid','Cold','Fire','Force','Lightning','Necrotic','Poison','Psychic','Radiant','Thunder','Bludgeoning','Slashing','Piercing','Nonmagical Bludgeoning, Slashing, Piercing'))
,constraint chk_conditionType check (conditionType in ('Blinded','Charmed','Deafened','Exhaustion','Frightened','Grappled','Incapacitated','Paralyzed','Petrified','Poisoned','Prone','Restrained','Stunned','Unconscious'))
)

create table monster_Sense(
 ID bigint primary Key identity(1,1)
,monsterID bigint not null foreign key REFERENCES monster(ID)
,sName nvarchar(50) not null
,distance int not null
,constraint chk_senseName check (sName in ('Blindsight','Darkvision','Tremorsense','Truesight'))
)

create table monster_Language(
 ID bigint primary Key identity(1,1)
,monsterID bigint not null foreign key REFERENCES monster(ID)
,sName nvarchar(50) not null
,constraint chk_languageName check (sName in ('Common','Dwarvish','Elvish','Giant','Gnomish','Goblin','Halfling','Orc','Abyssal','Celestial','Draconic','Deep Speech','Infernal','Primordial','Sylvan','Undercommon'))
)

create table monster_Ability(
 ID bigint primary Key identity(1,1)
,monsterID bigint not null foreign key REFERENCES monster(ID)
,sName nvarchar(255) not null
,sDesc nvarchar(max) not null
)

create table monster_Action(
 ID bigint primary Key identity(1,1)
,monsterID bigint not null foreign key REFERENCES monster(ID)
,sName nvarchar(255) not null
,cost int not null
,sDesc nvarchar(max) not null
)

create table monster_LegendaryAction(
 ID bigint primary Key identity(1,1)
,monsterID bigint not null foreign key REFERENCES monster(ID)
,sName nvarchar(255) not null
,sDesc nvarchar(max) not null
)

