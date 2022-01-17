ALTER PROCEDURE Usuario.prc_UpdateUsuario
	@var_idUsuario INT,
    @var_nomeUsuario NVARCHAR(MAX),
    @var_nomeExibicao NVARCHAR(MAX),
    @var_biografia NVARCHAR(MAX),
	@var_email NVARCHAR(MAX),
	@var_senha NVARCHAR(MAX) = NULL
AS
BEGIN TRY
    BEGIN TRANSACTION

		IF @var_senha IS NULL
			BEGIN
				UPDATE [Usuario].[Geral] 
				SET 
					[nomeUsuario] = @var_nomeUsuario,
					[nomeExibicao] = @var_nomeExibicao,
					[biografia] = @var_biografia,
					[email] = @var_email
				WHERE idUsuario = @var_idUsuario
			END
		ELSE
			BEGIN
				UPDATE [Usuario].[Geral] 
				SET 
					[nomeUsuario] = @var_nomeUsuario,
					[nomeExibicao] = @var_nomeExibicao,
					[biografia] = @var_biografia,
					[email] = @var_email,
					[senha] =  @var_senha
				WHERE idUsuario = @var_idUsuario
			END

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