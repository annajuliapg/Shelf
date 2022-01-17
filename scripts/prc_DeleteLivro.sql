ALTER PROCEDURE Livro.prc_DeleteLivro
	@var_idLivro INT
AS
BEGIN TRY
    BEGIN TRANSACTION

	-- DELETE livro

	DELETE FROM [Livro].[GrupoAutor] WHERE idLivro = @var_idLivro
	DELETE FROM [Livro].[GrupoGenero] WHERE idLivro = @var_idLivro
	DELETE FROM [Livro].[Geral] WHERE idLivro = @var_idLivro

    COMMIT TRAN
END TRY
BEGIN CATCH
    IF @@TRANCOUNT > 0
        ROLLBACK TRAN

    DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();  
    DECLARE @ErrorSeverity INT = ERROR_SEVERITY();  
    DECLARE @ErrorState INT = ERROR_STATE();

    RAISERROR (@ErrorMessage, @ErrorSeverity, @ErrorState);

END CATCH
GO