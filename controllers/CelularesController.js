import express, {Router} from "express";
const router = express.Router();


import connection from "../config/sequelize-config.js";

import Auth from "../middleware/Auth.js"
import Celulares from "../models/Celulares.js";



// ROTA CELULARES
router.get("/celulares", Auth, (req, res) => {
  Celulares.findAll().then((celulares) => {
    res.render("celulares", {
      celulares: celulares,
    });
  });
});

// Rota de cadastro de unidades
router.post("/celulares/new", (req, res) => {
  const telefone = req.body.telefone;
  const endereco_mac = req.body.endereco_mac;
  const id_usuario = req.body.id_usuario;
  
  Celulares.create({
    telefone: telefone,
    endereco_mac: endereco_mac,
    id_usuario: id_usuario,
    

  }).then(() => {
    res.redirect("/celulares");
  });
});

// Rota de delete de dados
// Essa rota possui um parâmetro id
router.get("/celulares/delete/:id", (req, res) => {
  const id = req.params.id;

  Celulares.destroy({
    where: {
      id: id,
    },
  })
    .then(() => {
      res.redirect("/celulares");
    })
    .catch((error) => {
      console.log(error);
    });
});

//Rota de edição de unidades
router.get("/celulares/edit/:id", (req, res) => {
  const id = req.params.id;
  Celulares.findByPk(id)
    .then((celulares) => {
      res.render("celularesEdit", {
        celulares:celulares,
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

router.post("/celulares/update", (req, res) => {
  const id = req.body.id;
  const telefone = req.body.telefone;
  const endereco_mac = req.body.endereco_mac;
  const id_usuario = req.body.id_usuario;

  Celulares.update(
    {
        telefone: telefone,
        endereco_mac: endereco_mac,
        id_usuario: id_usuario,
    },
    { where:{id: id} },
  )
    .then(() => {
      res.redirect("/celulares");
    })
    .catch((error) => {
      console.log(error);
    });
});
export default router;