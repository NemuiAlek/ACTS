
	INSERT INTO dbo.monster
	(
	    name,
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
	VALUES
	(   'Vyraetra, The Wretched Wyrm',        -- name - varchar(100)
	    'Gargantuan',      -- size - varchar(1200)
	    'dragon',      -- type - varchar(1200)
	    'chaotic neutral',      -- alignment - varchar(200)
	    22,         -- armor_class - int
	    'natural armor',      -- armor_desc - varchar(200)
	    367,         -- hit_points - int
	    '21d20+147',      -- hit_dice - nvarchar(50)
	    27,         -- strength - int
	    14,         -- dexterity - int
	    25,         -- constitution - int
	    16,         -- inteligence - int
	    15,         -- wisdom - int
	    16,         -- charisma - int
	    '',      -- strength_save - int
	    9,      -- dexterity_save - int
	    14,      -- constitution_save - int
	    '',      -- inteligence_save - int
	    9,      -- wisdom_save - int
	    10,      -- charisma_save - int
	    '',      -- damage_vulnerabilities - nvarchar(1200)
	    '',      -- damage_resistances - nvarchar(1200)
	    'force',      -- damage_immunities - nvarchar(1200)
	    'charmed',      -- condition_immunities - nvarchar(1200)
	    'tremorsense 160ft., darkvision 120ft., passive Perception 26',      -- senses - nvarchar(1200)
	    'Common, Draconic',      -- languages - nvarchar(1200)
	    21,         -- challenge_rating - int
	    'Vyraetra can take three legendary actions, choosing from the options below. 
		Only one legendary action option can be used at a time and only at the end of
		another creature''s turn. Vyraetra regains spent legendary actions at the start of its turn.',      -- legendary_desc - nvarchar(2500)
	 'It might have started with a slain godling. It could have been unspeakable treachery or lies that spread discord among beloved brothers. It may have even been the theft of mortal souls.
	 Vyraetra does not speak of the act that began the curse nor of how long it has been cursed to wander the mortal world. Instead, Vyraetra rails against the egotistical gods and their vainglorious supplicants.
	 Where Vyraetra goes, a great curse follows - rotting the land even as it rots Vyraetra''s heart',     -- monsterDescription - nvarchar(2500)
	    'https://www.amazon.com/Game-Masters-Book-Legendary-Dragons/dp/1956403051',      -- URL - nvarchar(max)
	    1,         -- CreatedBy - int
	    GETDATE(), -- CreatedDate - date
	    ''       -- ModifiedDate - date
	    )

INSERT INTO dbo.monster_Skill
(
    monsterid,
    name,
    modifier
)
VALUES
(   1,   -- monsterid - bigint
    N'Perception', -- name - nvarchar(50)
    16    -- modifier - int
    ),
(   1,   -- monsterid - bigint
    N'Stealth', -- name - nvarchar(50)
    9    -- modifier - int
    )

INSERT INTO dbo.monster_Speed
(
    monsterid,
    [name],
    [modifier]
)
VALUES
(   1,   -- monsterid - bigint
    N'walk', -- speedType - nvarchar(200)
    50    -- speedAmount - int
    ),
(   1,   -- monsterid - bigint
    N'fly', -- speedType - nvarchar(200)
    40    -- speedAmount - int
    ),
(   1,   -- monsterid - bigint
    N'burrow', -- speedType - nvarchar(200)
    80    -- speedAmount - int
    )

INSERT INTO dbo.monster_SpecialAbilities
(
    monsterid,
    name,
    [desc]
)
VALUES
(   1,   -- monsterid - bigint
    N'Legendary Resistance (3/Day)', -- name - nvarchar(255)
    N'If the dragon fails a saving throw, it can choose to succeed instead.'  -- desc - nvarchar(max)
    ),
(   1,   -- monsterid - bigint
    N'Magic Resistance', -- name - nvarchar(255)
    N'Vyraetra has advantage on saving throws against spells or other magical effects.'  -- desc - nvarchar(max)
    ),
(   1,   -- monsterid - bigint
    N'Magic Weapons', -- name - nvarchar(255)
    N'Vyraetra''s weapon attacks are magical.'  -- desc - nvarchar(max)
    ),
(   1,   -- monsterid - bigint
    N'Stench', -- name - nvarchar(255)
    N'Any creature that starts its turn within 10 feet of Vyraetra must succeed on a DC 18 Constitution saving throw or be poisoned until the start of its next turn. On a successful saving throw, the creature is immune to Vyraetra''s stench for 24 hours.'  -- desc - nvarchar(max)
    ),
(   1,   -- monsterid - bigint
    N'Tunneler', -- name - nvarchar(255)
    N'Vyraetra can burrow through solid rock at half its burrow speed and leaves a 10-foot-diameter tunnel in its wake.'  -- desc - nvarchar(max)
    )

INSERT INTO dbo.monster_Action
(
    monsterid,
    name,
    [desc]
)
VALUES
(   1,   -- monsterid - bigint
    N'Multiattack', -- name - nvarchar(255)
    N'Vyraetra can use its Frightful Presence. It then makes five attacks: one with its bite and four with its claws.'  -- desc - nvarchar(max)
    ),
(   1,   -- monsterid - bigint
    N'Bite', -- name - nvarchar(255)
    N'Melee Weapon Attack: +15 to hit, reach 15 ft., one target.
	Hit: 19 (2d10 + 8) piercing damage, plus 9 (2d8) poison damage.'  -- desc - nvarchar(max)
    ),
(   1,   -- monsterid - bigint
    N'Claw', -- name - nvarchar(255)
    N'Melee Weapon Attack: +15 to hit, reach 10 ft., one target.
	Hit: 11 (2d6 + 8) slashing damage.'  -- desc - nvarchar(max)
    ),
(   1,   -- monsterid - bigint
    N'Tail', -- name - nvarchar(255)
    N'Melee Weapon Attack: +15 to hit, reach 20 ft., one target.
	Hit: 17 (2d8 + 8) bludgeoning damage.'  -- desc - nvarchar(max)
    ),
(   1,   -- monsterid - bigint
    N'Frightful Presence (Recharge 5-6)', -- name - nvarchar(255)
    N'Each creature of Vyraetra''s choice that is within 120 feet of the dragon and aware of it must succeed on a 
	DC 19 Wisdom saving throw or become frightened for one minute. A creature can repeat the saving throw at the
	END of each of its turns, ending the effect on itself on a success. If a creature''s saving throw is successful
	or the effect ends for it, the creature is immune to the dragon''s Frightful Presence for the next 24 hours.'  -- desc - nvarchar(max)
    ),
(   1,   -- monsterid - bigint
    N'Putrid Breath (Recharge 5-6)', -- name - nvarchar(255)
    N'Vyraetra exhales a cloud of vile ichor in a 90-foot cone. Each creature in that area must make a DC 22
	Constitution saving throw, taking 45 (10d8) poison damage and 18 (4ds) necrotic damage or half as much on a successful one.
	If a creature fails its save against this ability a second time, it contracts a disease as if it were affected by the contagion spell.'  -- desc - nvarchar(max)
    )

INSERT INTO dbo.monster_LegendaryAction
(
    monsterid,
    name,
    [desc]
)
VALUES
(   1,   -- monsterid - bigint
    N'Detect', -- name - nvarchar(255)
    N'Vyraetra makes a Wisdom (Perception) check.'  -- desc - nvarchar(max)
    ),
(   1,   -- monsterid - bigint
    N'Tail Attack', -- name - nvarchar(255)
    N'Vyraetra makes a tail attack.'  -- desc - nvarchar(max)
    ),
(   1,   -- monsterid - bigint
    N'Burrow', -- name - nvarchar(255)
    N'Vyraetra tunnels into the ground and moves up to half its speed.'  -- desc - nvarchar(max)
    ),
(   1,   -- monsterid - bigint
    N'Burst (Costs 2 Actions)', -- name - nvarchar(255)
    N'Vyraetra moves up to half its speed and then bursts from beneath the ground and makes up to four claw attacks against adjacent creatures.
	If the space Vyraetra emerges into is occupied by a creature of large or smaller size, the creature must succeed on a DC 19 Dexterity save
	or fall prone in an empty adjacent space. Vyraetra cannot enter the space a creature of Huge size or larger.'  -- desc - nvarchar(max)
    )
