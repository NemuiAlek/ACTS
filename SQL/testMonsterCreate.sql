INSERT INTO dbo.monster
(
	monsterName,
	Title,
	Alignment,
    ArmorClass,
    HitPoints,
    HitPointsRolled,
    GroundSpeed,
    FlightSpeed,
    swimSpeed,
    burrowSpeed,
    Strength,
    Dexterity,
    Constitution,
    Inteligence,
    Wisdom,
    Charisma,
    LegendaryRes,
    LegendaryAct,
    ChallengeRating,
    ExperiencePoints,
    AdditionalNotes,
    MonsterDescription,
    Image,
    URL,
    CreatedBy,
    CreatedDate,
    ModifiedDate
)
VALUES
(   'Vyraetra',
	'The Wretched Wyrm',
	'Evil',
	22,         -- ArmorClass - int
    367,         -- HitPoints - int
    '21d20+147',      -- HitPointsRolled - nvarchar(50)
    50,      -- GroundSpeed - int
    40,      -- FlightSpeed - int
    NULL,      -- swimSpeed - int
    80,      -- burrowSpeed - int
    27,         -- Strength - int
    14,         -- Dexterity - int
    25,         -- Constitution - int
    16,         -- Inteligence - int
    15,         -- Wisdom - int
    16,         -- Charisma - int
    3,      -- LegendaryRes - int
    3,      -- LegendaryAct - int
    21,      -- ChallengeRating - int
    33000,      -- ExperiencePoints - bigint
    'Gargantuan dragon, chaotic neutral',      -- AdditionalNotes - nvarchar(1200)
    'It might have started with a slain godling. It could have been unspeakable treachery or lies that spread discord among beloved brothers. It may have even been the theft of mortal souls.
	 Vyraetra does not speak of the act that began the curse nor of how long it has been cursed to wander the mortal world. Instead, Vyraetra rails against the egotistical gods and their vainglorious supplicants.
	 Where Vyraetra goes, a great curse follows - rotting the land even as it rots Vyraetra''s heart',      -- MonsterDescription - nvarchar(2500)
    NULL,      -- Image - nvarchar(max)
    'https://www.kickstarter.com/projects/jetpack7/legendary-dragons-a-5th-edition-supplement',      -- URL - nvarchar(max)
    1,         -- CreatedBy - int
    GETDATE(), -- CreatedDate - date
    NULL       -- ModifiedDate - date
    )