-- Criar a tabela cursos que: 
-- Tenha as colunas: id (Chave Primária, numérico) e nome_curso (Texto).
CREATE TABLE cursos (
  id SERIAL PRIMARY KEY,
  nome_curso VARCHAR(100) NOT NULL
);

-- Criar a tabela alunos 
-- que: Tenha as colunas: id (Chave Primária), nome (Texto), email (Texto) e curso_id (numérico).
CREATE TABLE alunos (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL, 
  curso_id INTEGER, 

  -- Configure curso_id como uma Chave Estrangeira (FK) que se relaciona com o id da tabela cursos.
  CONSTRAINT fk_curso
    FOREIGN KEY (curso_id)
    REFERENCES cursos (id)
);

-- Inserir dados:
-- Insira 2-3 cursos na tabela cursos.
INSERT INTO cursos (nome_curso) VALUES
('Desenvolvimento Web'),
('Ciência de Dados'),
('DevOps');

-- Insira 3-4 alunos na tabela alunos, relacionando-os com os cursos que você criou.
INSERT INTO alunos(nome, email, curso_id) VALUES
('Karol Salvador', 'karol.salvador@email.com', 1),
('Maycon Rabelo', 'maycon.rabelo@email.com', 1),
('Karla Katarina', 'karla.katarina@email.com', 2),
('Maria Karoline', 'maria.karoline@email.com', 3);

SELECT * FROM alunos;



