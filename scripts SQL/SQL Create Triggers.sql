-- TRIGGERS --

/*
	BEFORE ou AFTER
	//insert
    new.campo
    
    //update
    old.campo
    new.campo
    
    //delete
    old.campo
*/

DELIMITER $
CREATE TRIGGER ResumoUsuarioINSERT
AFTER INSERT
ON usuario_livro
FOR EACH ROW
BEGIN
DECLARE paginasNovasLidas INT;
IF NEW.Status_Lista = 3 THEN
    
    SET paginasNovasLidas = (
		SELECT Total_Paginas
		FROM livro l
		WHERE l.idlivro = NEW.idlivro
    );
    
    UPDATE usuario u
	SET u.Paginas_Lidas = u.Paginas_Lidas + paginasNovasLidas,
    u.Tempo_Total_Leitura = u.Tempo_Total_Leitura + NEW.Tempo_Leitura,
    u.Livros_Lidos = u.Livros_Lidos + 1
	WHERE u.idUsuario = NEW.idUsuario;

END IF;
END$;
DELIMITER ;

DELIMITER $
CREATE TRIGGER ResumoUsuarioUPDATE
AFTER UPDATE
ON usuario_livro
FOR EACH ROW
BEGIN
DECLARE paginasNovasLidas INT;
IF NEW.Status_Lista = 3 AND NEW.Avaliacao = OLD.Avaliacao THEN
    
    SET paginasNovasLidas = (
		SELECT Total_Paginas
		FROM livro l
		WHERE l.idlivro = NEW.idlivro
    );
    
    UPDATE usuario u
	SET u.Paginas_Lidas = u.Paginas_Lidas + paginasNovasLidas,
    u.Tempo_Total_Leitura = u.Tempo_Total_Leitura + NEW.Tempo_Leitura,
    u.Livros_Lidos = u.Livros_Lidos + 1
	WHERE u.idUsuario = NEW.idUsuario;

END IF;
END$;
DELIMITER ;

DELIMITER $
CREATE TRIGGER ResumoUsuarioDELETE
AFTER DELETE
ON usuario_livro
FOR EACH ROW
BEGIN
DECLARE paginasDeletadas INT;
IF OLD.Status_Lista = 3 THEN
    
    SET paginasDeletadas = (
		SELECT Total_Paginas
		FROM livro l
		WHERE l.idlivro = OLD.idlivro
    );

	UPDATE usuario u
	SET u.Paginas_Lidas = u.Paginas_Lidas - paginasDeletadas,
    u.Tempo_Total_Leitura = u.Tempo_Total_Leitura - OLD.Tempo_Leitura,
    u.Livros_Lidos = u.Livros_Lidos - 1
	WHERE u.idUsuario = OLD.idUsuario;

END IF;
END$;
DELIMITER ;

DELIMITER $
CREATE TRIGGER QuantidadeEmListasINSERT
AFTER INSERT
ON usuario_livro
FOR EACH ROW
BEGIN
	UPDATE livro l
	SET l.QTD_Em_Listas =  l.QTD_Em_Listas + 1
	WHERE NEW.idLivro = l.idLivro;
END $
DELIMITER ;

DELIMITER $
CREATE TRIGGER QuantidadeEmListasDELETE
AFTER DELETE
ON usuario_livro
FOR EACH ROW
BEGIN
	UPDATE livro l
	SET l.QTD_Em_Listas =  l.QTD_Em_Listas - 1
	WHERE OLD.idLivro = l.idLivro;
END $
DELIMITER ;