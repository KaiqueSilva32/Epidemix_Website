import express, {Router} from "express";
const router = express.Router();

import Usuarios from "../models/Usuarios.js";
import connection from "../config/sequelize-config.js";

import Auth from "../middleware/Auth.js"



// ROTA UNIDADES
router.get("/usuarios", Auth, (req, res) => {
  Usuarios.findAll().then((usuarios) => {
    res.render("usuarios", {
      usuarios: usuarios,
    });
  });
});

// Rota de cadastro de unidades
router.post("/usuarios/new", (req, res) => {
  const nome = req.body.nome;
  const email = req.body.email;
  const telefone = req.body.telefone;
  const cpf = req.body.cpf;
  const senha = req.body.senha;
  const id_tipo_usuario = req.body.id_tipo_usuario;
  const id_unidades = req.body.id_unidades;
  
  Usuarios.create({
    nome: nome,
    email:email,
    telefone: telefone,
    cpf: cpf,
    senha: senha,
    id_tipo_usuario: id_tipo_usuario,
    id_unidades: id_unidades

  }).then(() => {
    res.redirect("/usuarios");
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
    .then((usuarios) => {
      res.render("usuariosEdit", {
        usuarios: usuarios,
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

router.post("/usuarios/update", (req, res) => {
  const id = req.body.id;
  const nome = req.body.nome;
  const email = req.body.email;
  const telefone = req.body.telefone;
  const cpf = req.body.cpf;
  const senha = req.body.senha;
  const id_tipo_usuario = req.body.id_tipo_usuario;
  const id_unidades = req.body.id_unidades;

  Usuarios.update(
    {
        nome: nome,
        email:email,
        telefone: telefone,
        cof: cpf,
        senha: senha,
        id_tipo_usuario: id_tipo_usuario,
        id_unidades: id_unidades
    },
    { where:{id: id} },
  )
    .then(() => {
      res.redirect("/usuarios");
    })
    .catch((error) => {
      console.log(error);
    });
});
export default router;