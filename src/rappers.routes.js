import { Router } from "express";

const rappersRoutes = Router();

let rappers = [
    {
      id: Number(Math.floor(Math.random() * 999999)) + 1,
      nome: "FelipeDev",
      idade: 55,
      atividadesSuspeitas: true, //Indicação de envolvimento em atividades suspeitas
      descricaoFisica: ["Moreno", "Média estatura", "Dev"],
    }
];

  //Rota para buscar todos os elementos do array rappers
rappersRoutes.get("/", (req, res) => {
  return res.status(201).json(rappers);
});

//Rota para cadastrar novo rapper
rappersRoutes.post("/", (req, res) => {
  const {nome, idade, atividadesSuspeitas, descricaoFisica} = req.body

  if(!nome || !idade || !atividadesSuspeitas || !descricaoFisica) {
    return res.status(400).send({
        message: "Os campos nome, idade, atividades suspeitas e descrição física são obrigatórios!",
    });
  }

  //Validação de existência de atividades suspeitas
  if(atividadesSuspeitas!= "sim" && atividadesSuspeitas !="não")
    return res.status(400).send({
        message: "Digite 'sim' ou 'não'!",
    });

  const novoRapper = {
    id: Number(Math.floor(Math.random() * 999999)) + 1,
    nome,
    idade,
    atividadesSuspeitas,
    descricaoFisica,
  }

  rappers.push(novoRapper);
  return res.status(201).send({
    message: "Rapper Cadastrado!",
    novoRapper,
  });
});

//Rota para buscar um elemento específico do array rappers
rappersRoutes.get("/:id", (req, res) => {
  const { id } = req.params;

  const rapper = rappers.find((movie) => movie.id === Number(id));

  if (!rapper) {
    return res.status(404).send({ message: "Rapper não encontrado!" });
  }

  return res.status(200).send(rapper);
});

//Rota para editar um rapper
rappersRoutes.put("/:id", (req, res) => {
  const { id } = req.params

  const planeta = rappers.find((movie) => movie.id === Number(id)
  );

  if (!planeta) {
    return res.status(404).send({ message: "rapper não encontrado!" });
  };

  const { nome, idade, atividadesSuspeitas, descricaoFisica} = req.body

  planeta.nome = nome
  planeta.idade = idade
  planeta.atividadesSuspeitas = atividadesSuspeitas
  planeta.descricaoFisica = descricaoFisica

  return res.status(200).send({
    message: "rapper atualizado!",
    rapper,
  })

});//Rota para deletar um planeta
rappersRoutes.delete("/:id", (req, res) => {
  const { id } = req.params

  const rapper = rappers.find((movie) => movie.id === Number(id)
  );

  if (!rapper) {
    return res.status(404).send({ message: "rapper não encontrado!" });
  }

  rappers = rappers.filter((movie) => movie.id !== Number(id));


  return res.status(200).send({
    message: "rapper deletado!",
    rapper,
  })
})

export default rappersRoutes;