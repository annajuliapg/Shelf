CREATE PROCEDURE Usuario.prc_UpdateLeitura_ParaLer
    @var_idUsuario INT,
    @var_idLivro INT
AS
BEGIN TRY
    BEGIN TRANSACTION

		UPDATE [Usuario].[Leituras] 
		SET
			[statusLista] = 1,
			[dataInicio] = NULL,
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