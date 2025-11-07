// Atualizar (Update):
// Use updateOne() para adicionar um campo comentarios em um dos seus posts.
db.posts.updateOne(
  { titulo: "Tendências de Front-end em 2025: o que vem por aí" },
  {
    $set: {
      // comentarios deve ser um array de documentos.
      comentarios: [
        {
          autor: "Karol Salvador",
          data: new Date(),
          texto:
            "Ótimo artigo! Abordar o uso da IA é um assunto latente e atual.",
          likes: 3,
        },
        {
          autor: "Karla Katarina",
          data: new Date(),
          texto: "Concordo, muito útil!",
          likes: 1,
        },
      ],
    },
  }
);

// Verificação da atualização
print("\n--- Verificação do UPDATE (Post com comentários) ---\n");
db.posts.find({ titulo: "Tendências de Front-end em 2025: o que vem por aí" }).pretty();

// Testar ambos os ambientes:

// Escreva uma consulta find() que retorne apenas posts com a tag "tendências" (consultando dentro de um array).
print("\n--- Consulta 1: Posts com a tag 'tendências' ---\n");
db.posts.find({ tags: "tendências" }).pretty();

// Escreva uma consulta find() que retorne apenas posts onde o autor seja um nome específico.
print("\n--- Consulta 2: Posts da autora 'Carolina Gangorra' ---\n");
db.posts.find({ autor: "Carolina Gangorra" }).pretty();
