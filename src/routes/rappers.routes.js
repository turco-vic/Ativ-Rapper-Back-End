import { Router } from "express";

const rappersRoutes = Router();

let rappers = [
    {
      id: Number(Math.floor(Math.random() * 999999)) + 1,
      nome: "FelipeDev",
      idade: 55,
      atividadesSuspeitas: true, //Indicação de envolvimento em atividades suspeitas
      descricaoFisica: ["Moreno", "Média estatura", "Dev"],
    },

    {
      id: Number(Math.floor(Math.random() * 999999)) + 1,
      nome: "Marcelo Mortal",
      idade: 44,
      atividadesSuspeitas: true, //Indicação de envolvimento em atividades suspeitas
      descricaoFisica: ["Branco", "Média estatura", "Dev"],
    },

    {
      id: Number(Math.floor(Math.random() * 999999)) + 1,
      nome: "PEDIRI",
      idade: 77,
      atividadesSuspeitas: true, //Indicação de envolvimento em atividades suspeitas
      descricaoFisica: ["Preto", "Média estatura", "Dono de festa"],
    }
];

  //Rota para buscar todos os elementos do array rappers
rappersRoutes.get("/", (req, res) => {
  return res.status(201).json(rappers);
});

//Rota para cadastrar novo rapper
rappersRoutes.post("/", (req, res) => {
  const {nome, idade, atividadesSuspeitas, descricaoFisica} = req.body;

    //validação
  if ((Number.isInteger(idade)) == false){
    return res.status(400).send({
      message: "A idade tem que ser inteira!!",
  });
}

  if(!nome || !idade || !atividadesSuspeitas) {
    return res.status(400).send({
        message: "Os campos nome, idade e atividades suspeitas são obrigatórios!",
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

  const rapper = rappers.find((suspect) => suspect.id === Number(id));

  if (!rapper) {
    return res.status(404).send({ message: "Rapper não encontrado!" });
  }

  return res.status(200).send(rapper);
});

//Rota para editar um rapper
rappersRoutes.put("/:id", (req, res) => {
  const { id } = req.params
  const { nome, idade, atividadesSuspeitas, descriçãoFisica} = req.body

  // Busca um rapper pelo id no array de rappers
  const rapper = rappers.find((suspect) => suspect.id == id)

  // Validação dos campos obrigatórios
  if (!nome || !idade || !atividadesSuspeitas) {
    return res.status(400).json({
      message: "Os campos nome, idade, atividades suspeitas são obrigatórios!",
    })
  }
  if (atividadesSuspeitas != "sim" && atividadesSuspeitas != "não") {
    return res.status(400).send({
      message: "Digite 'sim' ou 'não'! em atividadesSuspeitas",
    })
  }
  if ((Number.isInteger(idade)) == false  ) {
    return res.status(400).send({
      message: "Digite um numero inteiro para idade!!",
    })
  }

  rapper.nome = nome
  rapper.idade = idade
  rapper.atividadesSuspeitas = atividadesSuspeitas
  rapper.descriçãoFisica = descriçãoFisica

  return res.status(200).json({
    message: "rapper atualizado com sucesso!",
    rapper,
  })
})

//Rota para deletar um rapper
rappersRoutes.delete("/:id", (req, res) => {
  const { id } = req.params

  const rapper = rappers.find((suspect) => suspect.id === Number(id)
  );

  if (!rapper) {
    return res.status(404).send({ message: "rapper não encontrado!" });
  }

  rappers = rappers.filter((suspect) => suspect.id !== Number(id));

  return res.status(200).send({
    message: "rapper deletado!",
    rapper,
  })
})

export default rappersRoutes;