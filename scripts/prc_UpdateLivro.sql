CREATE PROCEDURE Livro.prc_UpdateLivro
	@var_idLivro INT,
    @var_nomeLivro NVARCHAR(MAX),
    @var_totalPaginas INT,
    @var_anoLancamento INT,
	@var_autores NVARCHAR(MAX),
	@var_generos NVARCHAR(MAX)
AS
BEGIN TRY
    BEGIN TRANSACTION
	
	DECLARE @OLD_IDENTITY_VALUE_AUTOR INT = IDENT_CURRENT('Livro.Autor');
	DECLARE @OLD_IDENTITY_VALUE_GENERO INT = IDENT_CURRENT('Livro.Genero');

	-- UPDATE livro

	UPDATE [Livro].[Geral]
	SET 
		[nome] = @var_nomeLivro, 
		[totalPaginas] = @var_totalPaginas, 
		[anoLancamento] = @var_anoLancamento
	WHERE idLivro = @var_idLivro

	-- update autor relacionados ao livro

	BEGIN

		DECLARE @nomeAutor VARCHAR(MAX);
		DECLARE @idAutor INT;

		DELETE FROM [Livro].[GrupoAutor] WHERE idLivro = @var_idLivro
 
		DECLARE CUR_TEST CURSOR FAST_FORWARD FOR
			SELECT value AS nome FROM STRING_SPLIT(@var_autores, ';')
 
		OPEN CUR_TEST
		FETCH NEXT FROM CUR_TEST INTO @nomeAutor
 
		WHILE @@FETCH_STATUS = 0
		BEGIN
	
			SET @idAutor = (SELECT idAutor FROM [Livro].[Autor] WHERE nome = @nomeAutor)	

			IF @idAutor IS NULL
				BEGIN 
					INSERT INTO [Livro].[Autor] values (@nomeAutor)
					SET @idAutor = IDENT_CURRENT('Livro.Autor')
				END

			INSERT INTO Livro.GrupoAutor ([idAutor], [idLivro]) VALUES (@idAutor, @var_idLivro)
			   		 
		   FETCH NEXT FROM CUR_TEST INTO @nomeAutor
		END
		CLOSE CUR_TEST
		DEALLOCATE CUR_TEST

	END

	-- update genero relacionados ao livro

		BEGIN

		DECLARE @nomeGenero VARCHAR(MAX);
		DECLARE @idGenero INT;

		DELETE FROM [Livro].[GrupoGenero] WHERE idLivro = @var_idLivro
 
		DECLARE CUR_TEST CURSOR FAST_FORWARD FOR
			SELECT value AS nome FROM STRING_SPLIT(@var_generos, ';')
 
		OPEN CUR_TEST
		FETCH NEXT FROM CUR_TEST INTO @nomeGenero
 
		WHILE @@FETCH_STATUS = 0
		BEGIN
	
			SET @idGenero = (SELECT idGenero FROM [Livro].[Genero] WHERE nome = @nomeGenero)
	

			IF @idGenero IS NULL
				BEGIN 
					INSERT INTO [Livro].[Genero] values (@nomeGenero)
					SET @idGenero = IDENT_CURRENT('Livro.Genero')
				END

			INSERT INTO Livro.GrupoGenero ([idGenero], [idLivro]) VALUES (@idGenero, @var_idLivro)
			   		 
		   FETCH NEXT FROM CUR_TEST INTO @nomeGenero
		END
		CLOSE CUR_TEST
		DEALLOCATE CUR_TEST

	END

    COMMIT TRAN
END TRY
BEGIN CATCH
    IF @@TRANCOUNT > 0
        ROLLBACK TRAN

    DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();  
    DECLARE @ErrorSeverity INT = ERROR_SEVERITY();  
    DECLARE @ErrorState INT = ERROR_STATE();

	DBCC CHECKIDENT ('Shelf.Livro.Autor', RESEED, @OLD_IDENTITY_VALUE_AUTOR);
	DBCC CHECKIDENT ('Shelf.Livro.Genero', RESEED, @OLD_IDENTITY_VALUE_GENERO);

	CLOSE CUR_TEST
	DEALLOCATE CUR_TEST

    RAISERROR (@ErrorMessage, @ErrorSeverity, @ErrorState);

END CATCH
GO