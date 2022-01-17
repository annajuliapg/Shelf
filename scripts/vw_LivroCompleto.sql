CREATE VIEW Livro.vw_LivroCompleto AS
SELECT 
		L.idLivro,
		L.nome,
		L.totalPaginas,
		L.anoLancamento,
		L.qtdEmListas,
		(
			SELECT 
				STRING_AGG(A.nome, ', ') 
			FROM [Livro].[Autor] A 
			INNER JOIN [Livro].[GrupoAutor] GA ON GA.idAutor = A.idAutor 
			WHERE GA.idLivro = L.idLivro
		) as autores,
				(
			SELECT 
				STRING_AGG(G.nome, ', ') 
			FROM [Livro].[Genero] G
			INNER JOIN [Livro].[GrupoGenero] GG ON GG.idGenero = G.idGenero
			WHERE GG.idLivro = L.idLivro
		) as generos
FROM [Livro].[Geral] L