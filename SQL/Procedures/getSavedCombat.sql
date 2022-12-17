
alter PROC getSavedCombat(
@sessionID NVARCHAR(MAX)
)
AS

SELECT * FROM combat
WHERE createdBy = CASE WHEN @sessionID = 'Guest' THEN 0 ELSE CAST(@sessionID AS INT) END
ORDER BY id DESC
