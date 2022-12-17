--/*
alter PROC createUpdateMonster(
@sessionid AS nvarchar(max)
,@id AS NVARCHAR(MAX)
, @jsondata AS NVARCHAR(MAX)
) as
--*/

/* for testing
declare @jsondata AS NVARCHAR(MAX) = '{"id":"2","name":"Tiger","size":"Tiny","type":"Dino","alignment":"Just a lil evil","armor_class":5,"armor_desc":"","hit_points":10,"hit_dice":"1d4+8","strength":10,"dexterity":10,"constitution":10,"intelligence":10,"wisdom":10,"charisma":10,"strength_save":5,"dexterity_save":2,"constitution_save":0,"intelligence_save":0,"wisdom_save":5,"charisma_save":0,"damage_vulnerabilities":"Fire, Ice, Lighting, pretty much everything you can think of","damage_resistances":"","damage_immunities":"","condition_immunities":"","senses":"He smell good","languages":"Common, Draconic","challenge_rating":-1,"legendary_desc":"","monsterDescription":null,"URL":null,"CreatedBy":1,"CreatedDate":"2022-12-15","ModifiedDate":"2022-12-15","skills":null,"speed":null,"special_abilities":null,"actions":null,"legendary_actions":null}'
DECLARE @id AS NVARCHAR(MAX) = 'new'
DECLARE @sessionid AS NVARCHAR(MAX) = '1'
*/

IF OBJECT_ID(N'tempdb..#jsonData') IS NOT NULL
begin
DROP TABLE #jsonData
END

SELECT
*
INTO #jsonData
FROM OPENJSON(@jsondata) 
WITH(
id NVARCHAR(MAX)
,actions NVARCHAR(MAX)
,alignment NVARCHAR(MAX)
,armor_class NVARCHAR(MAX)
,armor_desc NVARCHAR(MAX)
,challenge_rating NVARCHAR(MAX)
,charisma NVARCHAR(MAX)
,charisma_save NVARCHAR(MAX)
,condition_immunities NVARCHAR(MAX)
,constitution NVARCHAR(MAX)
,constitution_save NVARCHAR(MAX)
,damage_immunities NVARCHAR(MAX)
,damage_resistances NVARCHAR(MAX)
,damage_vulnerabilities NVARCHAR(MAX)
,dexterity NVARCHAR(MAX)
,dexterity_save NVARCHAR(MAX)
,document__license_url NVARCHAR(MAX)
,document__slug NVARCHAR(MAX)
,document__title NVARCHAR(MAX)
,hit_dice NVARCHAR(MAX)
,hit_points NVARCHAR(MAX)
,intelligence NVARCHAR(MAX)
,intelligence_save NVARCHAR(MAX)
,languages NVARCHAR(MAX)
,legendary_actions NVARCHAR(MAX)
,legendary_desc NVARCHAR(MAX)
,name NVARCHAR(MAX)
,perception NVARCHAR(MAX)
,reactions NVARCHAR(MAX)
,senses NVARCHAR(MAX)
,size NVARCHAR(MAX)
,skills NVARCHAR(MAX)
,skillsInputName NVARCHAR(MAX)
,skillsInputDesc NVARCHAR(MAX)
,slug NVARCHAR(MAX)
,special_abilities NVARCHAR(MAX)
,special_abilitiesInputName NVARCHAR(MAX)
,special_abilitiesInputDesc NVARCHAR(MAX)
,speed NVARCHAR(MAX)
,speedInputName NVARCHAR(MAX)
,speedInputDesc NVARCHAR(MAX)
,spell_list NVARCHAR(MAX)
,strength NVARCHAR(MAX)
,strength_save NVARCHAR(MAX)
,subtype NVARCHAR(MAX)
,type NVARCHAR(MAX)
,wisdom NVARCHAR(MAX)
,wisdom_save NVARCHAR(MAX)
,CreatedBy NVARCHAR(MAX)
)

IF (@id = 'new')
BEGIN

INSERT INTO dbo.monster
(
    [name],
    size,
    type,
    alignment,
    armor_class,
    armor_desc,
    hit_points,
    hit_dice,
    strength,
    dexterity,
    constitution,
    intelligence,
    wisdom,
    charisma,
    strength_save,
    dexterity_save,
    constitution_save,
    intelligence_save,
    wisdom_save,
    charisma_save,
    damage_vulnerabilities,
    damage_resistances,
    damage_immunities,
    condition_immunities,
    senses,
    languages,
    challenge_rating,
    legendary_desc,
    monsterDescription,
    URL,
    CreatedBy,
    CreatedDate,
    ModifiedDate
)
select
j.[name],        -- name - varchar(100)
j.size,      -- size - varchar(1200)
j.type,      -- type - varchar(1200)
j.alignment,      -- alignment - varchar(200)
j.armor_class,         -- armor_class - int
j.armor_desc,      -- armor_desc - varchar(200)
j.hit_points,         -- hit_points - int
j.hit_dice,      -- hit_dice - nvarchar(50)
j.strength,         -- strength - int
j.dexterity,         -- dexterity - int
j.constitution,         -- constitution - int
j.intelligence,         -- intelligence - int
j.wisdom,         -- wisdom - int
j.charisma,         -- charisma - int
j.strength_save,      -- strength_save - int
j.dexterity_save,      -- dexterity_save - int
j.constitution_save,      -- constitution_save - int
j.intelligence_save,      -- intelligence_save - int
j.wisdom_save,      -- wisdom_save - int
j.charisma_save,      -- charisma_save - int
j.damage_vulnerabilities,      -- damage_vulnerabilities - nvarchar(1200)
j.damage_resistances,      -- damage_resistances - nvarchar(1200)
j.damage_immunities,      -- damage_immunities - nvarchar(1200)
j.condition_immunities,      -- condition_immunities - nvarchar(1200)
j.senses,      -- senses - nvarchar(1200)
j.languages,      -- languages - nvarchar(1200)
j.challenge_rating,         -- challenge_rating - int
j.legendary_desc,      -- legendary_desc - nvarchar(2500)
NULL,      -- monsterDescription - nvarchar(2500)
null,      -- URL - nvarchar(max)
CAST(@sessionid AS INT),         -- CreatedBy - int
getdate(), -- CreatedDate - date
null       -- ModifiedDate - date
FROM #jsonData j

SELECT id=SCOPE_IDENTITY()
END

ELSE
begin
UPDATE dbo.monster
SET
    name = j.name,
    size = j.size,
    type = j.type,
    alignment = j.alignment,
    armor_class = j.armor_class,
    armor_desc = j.armor_desc,
    hit_points = j.hit_points,
    hit_dice = j.hit_dice,
    strength = j.strength,
    dexterity = j.dexterity,
    constitution = j.constitution,
    intelligence = j.intelligence,
    wisdom = j.wisdom,
    charisma = j.charisma,
    strength_save = j.strength_save,
    dexterity_save = j.dexterity_save,
    constitution_save = j.constitution_save,
    intelligence_save = j.intelligence_save,
    wisdom_save = j.wisdom_save,
    charisma_save = j.charisma_save,
    damage_vulnerabilities = j.damage_vulnerabilities,
    damage_resistances = j.damage_resistances,
    damage_immunities = j.damage_immunities,
    condition_immunities = j.condition_immunities,
    senses = j.senses,
    languages = j.languages,
    challenge_rating = j.challenge_rating,
    legendary_desc = j.legendary_desc,
    ModifiedDate = GETDATE()
FROM #jsonData j
WHERE monster.id = CAST(@id AS BIGINT)
AND monster.CreatedBy = CAST(@sessionid AS INT)
END

