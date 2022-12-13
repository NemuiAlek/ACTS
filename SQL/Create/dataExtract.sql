
DROP TABLE dbo.dataExtract

CREATE table dataExtract (
id int identity(1,1) primary key not NULL
,remoteID NVARCHAR(200)
,jsonData nvarchar(max)
)

SELECT * FROM dataExtract