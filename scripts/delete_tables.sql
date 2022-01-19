DELETE FROM [Usuario].[Resumo]

DELETE FROM [Usuario].[Geral]
DBCC CHECKIDENT ('Shelf.Usuario.Geral', RESEED, 0)

DELETE FROM [Livro].[Autor]
DBCC CHECKIDENT ('Shelf.Livro.Autor', RESEED, 0)

DELETE FROM [Livro].[GrupoAutor]

DELETE FROM [Livro].[Genero]
DBCC CHECKIDENT ('Shelf.Livro.Genero', RESEED, 0)

DELETE FROM [Livro].[GrupoGenero]

DELETE FROM [Livro].[Geral]
DBCC CHECKIDENT ('Shelf.Livro.Geral', RESEED, 0)