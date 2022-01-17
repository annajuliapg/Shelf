CREATE PROCEDURE Usuario.prc_UpdateLeitura_LendoAgora
    @var_idUsuario INT,
    @var_idLivro INT,
	@var_dataInicio DATE
AS
BEGIN TRY
    BEGIN TRANSACTION

		UPDATE [Usuario].[Leituras] 
		SET
			[statusLista] = 2,
			[dataInicio] = @var_dataInicio,
			[dataTermino] = NULL,
			[tempoLeitura] = NULL,
			[avaliacao] = NULL
		WHERE [idUsuario] = @var_idUsuario AND [idLivro] = @var_idLivro

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