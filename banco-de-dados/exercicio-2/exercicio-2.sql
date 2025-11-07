-- Escrever um SELECT que:
--Use INNER JOIN para mostrar o nome do aluno e o nome do curso que ele está fazendo, em uma única consulta.
SELECT
  a.nome AS nome_aluno,
  c.nome_curso
FROM
  alunos a
INNER JOIN
  cursos c ON a.curso_id = c.id;


-- Use WHERE e JOIN para mostrar apenas os alunos que estão no curso de, por exemplo, "Desenvolvimento Web".
SELECT
  a.nome AS nome_aluno,
  c.nome_curso
FROM
  alunos a
INNER JOIN
  cursos c ON a.curso_id = c.id
WHERE
  c.nome_curso = 'Desenvolvimento Web';


-- Executar um UPDATE que:
-- Altere o curso_id de um aluno específico (ex: "Mover Maria para o curso de Ciência de Dados").
UPDATE alunos
SET curso_id = 2
WHERE nome = 'Karol Salvador';

-- Critério de Sucesso
SELECT
  a.nome AS nome_aluno,
  c.nome_curso
FROM
  alunos a
INNER JOIN
  cursos c ON a.curso_id = c.id;

-- Extra:
-- Escreva um SELECT com LEFT JOIN e WHERE para descobrir quais cursos não possuem nenhum aluno matriculado.
-- Adicionei um novo curso apenas para termos algo visual na query
INSERT INTO cursos (nome_curso) VALUES ('Design UX/UI');

-- query de cursos sem aluno matriculado
SELECT
    c.nome_curso
FROM
    cursos c
LEFT JOIN
    alunos a ON c.id = a.curso_id 
WHERE
    a.id IS NULL;