import express, {Router} from "express";
const router = express.Router();

import Enderecos from "../models/Enderecos.js";
import connection from "../config/sequelize-config.js";

import Auth from "../middleware/Auth.js"


// ROTA ENDEREÇOS
router.get("/enderecos", Auth, (req, res) => {
  Enderecos.findAll().then((enderecos) => {
    res.render("enderecos", {
      enderecos: enderecos,
    });
  });
});

// Rota de cadastro de endereços
router.post("/enderecos/new", (req, res) => {
  const logradouro = req.body.logradouro;
  const numero = req.body.numero;
  const bairro = req.body.bairro;
  const cidade = req.body.cidade;
  const estado = req.body.estado;
  const pais = req.body.pais;
  const cep = req.body.cep;

  Enderecos.create({
    logradouro: logradouro,
    numero: numero,
    bairro: bairro,
    cidade: cidade,
    estado: estado,
    pais: pais,
    cep: cep,
  }).then(() => {
    res.redirect("/enderecos");
  });
});

// Rota de delete de dados
// Essa rota possui um parâmetro id
router.get("/enderecos/delete/:id", (req, res) => {
  const id = req.params.id;

  Enderecos.destroy({
    where: {
      id: id,
    },
  })
    .then(() => {
      res.redirect("/enderecos");
    })
    .catch((error) => {
      console.log(error);
    });
});

//Rota de edição de enderecos
router.get("/enderecos/edit/:id", (req, res) => {
  const id = req.params.id;
  Enderecos.findByPk(id)
    .then((enderecos) => {
      res.render("enderecosEdit", {
        enderecos: enderecos,
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

router.post("/enderecos/update", (req, res) => {
  const id = req.body.id;
  const logradouro = req.body.logradouro;
  const numero = req.body.numero;
  const bairro = req.body.bairro;
  const cidade = req.body.cidade;
  const estado = req.body.estado;
  const pais = req.body.pais;
  const cep = req.body.cep;

  Enderecos.update(
    {
    logradouro: logradouro,
    numero: numero,
    bairro: bairro,
    cidade: cidade,
    estado: estado,
    pais: pais,
    cep: cep,
    },
    { where:{id: id} },
  )
    .then(() => {
      res.redirect("/enderecos");
    })
    .catch((error) => {
      console.log(error);
    });
});
export default router;