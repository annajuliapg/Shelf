CREATE PROCEDURE Usuario.prc_DeleteUsuario
	@var_idUsuario INT
AS
BEGIN TRY
    BEGIN TRANSACTION

	-- DELETE Usuario

	DELETE FROM [Usuario].[Leituras] WHERE idUsuario = @var_idUsuario
	DELETE FROM [Usuario].[Resumo] WHERE idUsuario = @var_idUsuario
	DELETE FROM [Usuario].[Geral] WHERE idUsuario = @var_idUsuario

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