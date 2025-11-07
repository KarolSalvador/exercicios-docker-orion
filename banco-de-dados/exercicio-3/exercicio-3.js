//Criar uma coleção:
// Nomeie a coleção como posts.
db.posts.drop();

// Inserir (Create):
// Insira um documento com: titulo, autor e conteúdo
db.posts.insertOne({
  titulo:
    "A base da Inteligência Artificial: por que dados e infraestrutura importam mais que algoritmos",
  autor: "Carolina Gangorra",
  conteudo:
    "A Inteligência Artificial só gera resultados quando há dados de qualidade e infraestrutura sólida. Sem isso, vira promessa vazia. Mais do que seguir o hype, as empresas precisam usar IA onde ela realmente agrega valor — na personalização, previsão e otimização de processos.",
});

// Testar Schema Flexível:
// Insira um segundo documento com: titulo, autor, conteudo e um campo novo: tags (um array de strings, ex: ["nosql", "flexivel"]).
db.posts.insertOne({
  titulo: "Tendências de Front-end em 2025: o que vem por aí",
  autor: "Filipe Deschamps",
  conteudo:
    "Frameworks menores, edge computing e IA aplicada à experiência do usuário estão mudando o front-end.",
  tags: ["front-end", "tendências", "tecnologia"],
});

// Consultar (Read):
// Use o comando find() para listar todos os documentos da coleção posts.
db.posts.find().pretty();
