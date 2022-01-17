--CREATE DATABASE Shelf

--CREATE SCHEMA Usuario;

--DROP ALL

--DECLARE @sql NVARCHAR(max)=''

--SELECT @sql += ' Drop table ' + QUOTENAME(TABLE_SCHEMA) + '.'+ QUOTENAME(TABLE_NAME) + '; '
--FROM   INFORMATION_SCHEMA.TABLES
--WHERE  TABLE_TYPE = 'BASE TABLE'

--Exec Sp_executesql @sql

CREATE TABLE Usuario.Geral (
    idUsuario INT IDENTITY (1,1) NOT NULL CONSTRAINT PK_idUsuario PRIMARY KEY,
    nomeUsuario VARCHAR(20) NOT NULL CONSTRAINT UQ_NOME_USUARIO UNIQUE,
    nomeExibicao VARCHAR(40) NOT NULL,
    biografia VARCHAR(60),
    email VARCHAR(50) NOT NULL CONSTRAINT UQ_EMAIL_USUARIO UNIQUE,
    senha VARCHAR(150) NOT NULL,
	criadoEm DATETIME NOT NULL DEFAULT GETDATE(),
	passwordResetToken VARCHAR(50),
	passwordResetCreatedAt VARCHAR(50)
);

CREATE TABLE Usuario.Resumo (
    idUsuario INT NOT NULL CONSTRAINT FK_idUsuario_Resumo FOREIGN KEY REFERENCES Usuario.Geral(idUsuario),
    paginasLidas INT DEFAULT 0,
    qtdLivrosLidos INT DEFAULT 0,
    tempoTotalLeitura INT DEFAULT 0
);

CREATE TABLE Usuario.RefreshToken (
    idUsuario INT NOT NULL FOREIGN KEY REFERENCES Usuario.Geral(idUsuario),
    token varchar(MAX),
    expires varchar(20),
    created varchar(20),
    createdByIp varchar(30),
    revoked varchar(20),
    revokedByIp varchar(30),
    replacedByToken varchar(max)
);

--CREATE SCHEMA Livro;

CREATE TABLE Livro.Geral (
    idLivro INT IDENTITY (1,1) NOT NULL CONSTRAINT PK_idLivro PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    totalPaginas INT NOT NULL,
    anoLancamento INT,
    qtdEmListas INT DEFAULT 0
);

CREATE TABLE Livro.Autor (
    idAutor INT IDENTITY (1,1) NOT NULL CONSTRAINT PK_idAutor PRIMARY KEY,
    nome VARCHAR(50) NOT NULL
);

CREATE TABLE Livro.GrupoAutor (
    idAutor INT NOT NULL CONSTRAINT FK_idAutor_Livro_Autor FOREIGN KEY REFERENCES Livro.Autor(idAutor),
    idLivro INT NOT NULL CONSTRAINT FK_idLivro_Livro_Autor FOREIGN KEY REFERENCES Livro.Geral(idLivro)
);

CREATE TABLE Livro.Genero (
    idGenero INT IDENTITY (1,1) NOT NULL CONSTRAINT PK_idGenero PRIMARY KEY,
    nome VARCHAR(25) NOT NULL
);

CREATE TABLE Livro.GrupoGenero (
    idGenero INT NOT NULL CONSTRAINT FK_idGenero_Livro_Genero FOREIGN KEY REFERENCES Livro.Genero(idGenero),
    idLivro INT NOT NULL CONSTRAINT FK_idLivro_Livro_Genero FOREIGN KEY REFERENCES Livro.Geral(idLivro)
);

CREATE TABLE Usuario.Leituras (
    idUsuario INT NOT NULL CONSTRAINT FK_idUsuario_Leituras FOREIGN KEY REFERENCES Usuario.Geral(idUsuario),
    idLivro INT NOT NULL CONSTRAINT FK_idLivro_Leituras FOREIGN KEY REFERENCES Livro.Geral(idLivro),
	statusLista INT NOT NULL CHECK (statusLista IN (1, 2, 3)),
    dataInicio DATE,
    dataTermino DATE,
	tempoLeitura INT,
    avaliacao INT,
    CONSTRAINT PK_Usuario_Livro PRIMARY KEY (idUsuario, idLivro)
);