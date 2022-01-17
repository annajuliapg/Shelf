ALTER PROCEDURE Usuario.prc_InsertLeitura_LendoAgora
    @var_idUsuario INT,
    @var_idLivro INT,
	@var_dataInicio DATE
AS
BEGIN TRY
    BEGIN TRANSACTION

		INSERT INTO [Usuario].[Leituras] ([idUsuario], [idLivro], [statusLista], [dataInicio])
		VALUES (@var_idUsuario, @var_idLivro, 2, @var_dataInicio)

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