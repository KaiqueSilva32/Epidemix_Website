import express, {Router} from "express";
const router = express.Router();

import Usuarios from "../models/Usuarios.js";
import connection from "../config/sequelize-config.js";

import Auth from "../middleware/Auth.js"



// ROTA USUARIO
router.get("/usuarios", Auth, (req, res) => {
  Unidades.findAll().then((usuarios) => {
    res.render("usuarios", {
      usuarios: usuarios,
    });
  });
});

// Rota de cadastro de unidades
router.post("/usuarios/new", (req, res) => {
  const tipo_usuario = req.body.tipo_usuario;
  
  Usuarios.create({
    tipo_usuario: tipo_usuario,
  }).then(() => {
    res.redirect("/unidades");
  });
});

// Rota de delete de dados
// Essa rota possui um parâmetro id
router.get("/usuarios/delete/:id", (req, res) => {
  const id = req.params.id;

  Usuarios.destroy({
    where: {
      id: id,
    },
  })
    .then(() => {
      res.redirect("/usuarios");
    })
    .catch((error) => {
      console.log(error);
    });
});

//Rota de edição de unidades
router.get("/usuarios/edit/:id", (req, res) => {
  const id = req.params.id;
  Usuarios.findByPk(id)
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
  const endereco = req.body.endereco;

  Unidades.update(
    {
    unidade: unidade,
    telefone: telefone,
    endereco: endereco
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