ALTER PROCEDURE Usuario.prc_UpdateLeitura_Lidos
    @var_idUsuario INT,
    @var_idLivro INT,
	@var_dataInicio DATE,
	@var_dataTermino DATE,
	@var_avaliacao NVARCHAR(MAX)
AS
BEGIN TRY
    BEGIN TRANSACTION

		UPDATE [Usuario].[Leituras] 
		SET
			[statusLista] = 3,
			[dataInicio] = @var_dataInicio,
			[dataTermino] = @var_dataTermino,
			[tempoLeitura] = DATEDIFF(day, @var_dataInicio, @var_dataTermino),
			[avaliacao] = @var_avaliacao
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