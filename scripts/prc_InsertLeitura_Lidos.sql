ALTER PROCEDURE Usuario.prc_InsertLeitura_Lidos
    @var_idUsuario INT,
    @var_idLivro INT,
	@var_dataInicio DATE,
	@var_dataTermino DATE,
	@var_avaliacao NVARCHAR(MAX)
AS
BEGIN TRY
    BEGIN TRANSACTION

		INSERT INTO [Usuario].[Leituras] ([idUsuario], [idLivro], [statusLista], [dataInicio], [dataTermino], [tempoLeitura], [avaliacao])
		VALUES (@var_idUsuario, @var_idLivro, 3, @var_dataInicio, @var_dataTermino, DATEDIFF(day, @var_dataInicio, @var_dataTermino), @var_avaliacao)

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