
create table monster(
 ID bigint primary key identity (1,1)
,ArmorClass int not null
,HitPoints int not null
,HitPointsRolled nvarchar(50)
,GroundSpeed int
,FlightSpeed int
,LegendaryRes int
,LegendaryAct int
,ChallengeRating int
,ExperiencePoints bigint
,AdditionalNotes nvarchar(1200)
,MonsterDescription nvarchar(2500)
)

create table monster_Stat(
 ID int primary key identity (1,1)
,monsterID bigint not null foreign key REFERENCES  monster(ID) unique
,Strength int not null
,Dexterity int not null
,Constitution int not null
,Inteligence int not null
,Wisdom int not null
,Charisma int not null
)

create table monster_SavingThrow(
 ID int primary key identity (1,1)
,monsterID bigint not null foreign key REFERENCES  monster(ID) unique
,Strength int not null
,Dexterity int not null
,Constitution int not null
,Inteligence int not null
,Wisdom int not null
,Charisma int not null
)

create table monster_ActiveSkill(
 ID bigint primary Key identity(1,1)
,monsterID bigint not null foreign key REFERENCES monster(ID)
,sName nvarchar(50) not null
,modifier int not null
,constraint chk_activeskillname check (sName in ('Acrobatics','Animal Handling','Arcana','Athletics','Deception','History','Insight','Intimidation','Investigation','Medicine','Nature','Perception','Performance','Persuasion','Religion','Sleight of Hand','Stealth','Survival'))
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

create table monster_Actions(
 ID bigint primary Key identity(1,1)
,monsterID bigint not null foreign key REFERENCES monster(ID)
,sName nvarchar(255) not null
,cost int not null
,sDesc nvarchar(max) not null
)

create table monster_LegendaryActions(
 ID bigint primary Key identity(1,1)
,monsterID bigint not null foreign key REFERENCES monster(ID)
,sName nvarchar(255) not null
,sDesc nvarchar(max) not null
)

