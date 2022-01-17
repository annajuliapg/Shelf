CREATE PROCEDURE Usuario.prc_InsertUsuario
    @var_nomeUsuario NVARCHAR(MAX),
    @var_nomeExibicao NVARCHAR(MAX),
    @var_biografia NVARCHAR(MAX),
	@var_email NVARCHAR(MAX),
	@var_senha NVARCHAR(MAX)
AS
BEGIN TRY
    BEGIN TRANSACTION

		DECLARE @OLD_IDENTITY_VALUE INT = IDENT_CURRENT('Usuario.Geral');

        INSERT INTO [Usuario].[Geral] ([nomeUsuario], [nomeExibicao], [biografia], [email], [senha])
		VALUES (@var_nomeUsuario, @var_nomeExibicao, @var_biografia, @var_email, @var_senha);

		INSERT INTO [Usuario].[Resumo] (idUsuario) VALUES (IDENT_CURRENT('Usuario.Geral'))

    COMMIT TRAN
END TRY
BEGIN CATCH
    IF @@TRANCOUNT > 0
        ROLLBACK TRAN

    DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();  
    DECLARE @ErrorSeverity INT = ERROR_SEVERITY();  
    DECLARE @ErrorState INT = ERROR_STATE();

	DBCC CHECKIDENT ('Shelf.Usuario.Geral', RESEED, @OLD_IDENTITY_VALUE);

    RAISERROR (@ErrorMessage, @ErrorSeverity, @ErrorState);

END CATCH
GO