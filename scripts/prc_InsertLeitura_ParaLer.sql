CREATE PROCEDURE Usuario.prc_InsertLeitura_ParaLer
    @var_idUsuario INT,
    @var_idLivro INT
AS
BEGIN TRY
    BEGIN TRANSACTION

		INSERT INTO [Usuario].[Leituras] ([idUsuario], [idLivro], [statusLista])
		VALUES (@var_idUsuario, @var_idLivro, 1)

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