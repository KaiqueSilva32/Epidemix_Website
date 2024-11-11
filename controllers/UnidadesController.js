import express, {Router} from "express";
const router = express.Router();

import Unidades from "../models/Unidades.js";
import connection from "../config/sequelize-config.js";

import Auth from "../middleware/Auth.js"



// ROTA UNIDADES
router.get("/unidades", Auth, (req, res) => {
  Unidades.findAll().then((unidades) => {
    res.render("unidades", {
      unidades: unidades,
    });
  });
});

// Rota de cadastro de unidades
router.post("/unidades/new", (req, res) => {
  const unidade = req.body.unidade;
  const telefone = req.body.telefone;
  
  Unidades.create({
    unidade: unidade,
    telefone: telefone,
    
  }).then(() => {
    res.redirect("/unidades");
  });
});

// Rota de delete de dados
// Essa rota possui um parâmetro id
router.get("/unidades/delete/:id", (req, res) => {
  const id = req.params.id;

  Unidades.destroy({
    where: {
      id: id,
    },
  })
    .then(() => {
      res.redirect("/unidades");
    })
    .catch((error) => {
      console.log(error);
    });
});

//Rota de edição de unidades
router.get("/unidades/edit/:id", (req, res) => {
  const id = req.params.id;
  Unidades.findByPk(id)
    .then((unidades) => {
      res.render("unidadesEdit", {
        unidades: unidades,
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

router.post("/unidades/update", (req, res) => {
  const id = req.body.id;
  const unidade = req.body.unidade;
  const telefone = req.body.telefone;
  

  Enderecos.update(
    {
    unidade: unidade,
    telefone: telefone,
    },
    { where:{id: id} },
  )
    .then(() => {
      res.redirect("/unidades");
    })
    .catch((error) => {
      console.log(error);
    });
});
export default router;