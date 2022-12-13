USE [IronHack]
GO

/****** Object:  StoredProcedure [dbo].[test]    Script Date: 12/12/2022 9:56:26 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


alter PROC [dbo].[test]
@id NVARCHAR(MAX),
@jsonData NVARCHAR(MAX)
AS
		INSERT INTO dataExtract
		VALUES(@id, @jsonData)


GO


