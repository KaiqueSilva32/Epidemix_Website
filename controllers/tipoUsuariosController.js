import express, {Router} from "express";
const router = express.Router();

import tipoUsuarios from "../models/tipoUsuarios.js";
import connection from "../config/sequelize-config.js";

import Auth from "../middleware/Auth.js"



// ROTA USUARIO
router.get("/tipoUsuarios", Auth, (req, res) => {
  tipoUsuarios.findAll().then((tipoUsuarios) => {
    res.render("tipoUsuarios", {
      tipoUsuarios: tipoUsuarios,
    });
  });
});

// Rota de cadastro de unidades
router.post("/tipoUsuarios/new", (req, res) => {
  const tipo_usuario = req.body.tipo_usuario;
  
  tipoUsuarios.create({
    tipo_usuario: tipo_usuario,
  }).then(() => {
    res.redirect("/tipoUsuarios");
  });
});

// Rota de delete de dados
// Essa rota possui um parâmetro id
router.get("/tipoUsuarios/delete/:id", (req, res) => {
  const id = req.params.id;

  tipoUsuarios.destroy({
    where: {
      id: id,
    },
  })
    .then(() => {
      res.redirect("/TipoUsuarios");
    })
    .catch((error) => {
      console.log(error);
    });
});

//Rota de edição de usuarios
router.get("/tipoUsuarios/edit/:id", (req, res) => {
  const id = req.params.id;
  tipoUsuarios.findByPk(id)
    .then((tipoUsuarios) => {
      res.render("tipoUsuariosEdit", {
        tipoUsuarios: tipoUsuarios,
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

router.post("/tipoUsuarios/update", (req, res) => {
  const id = req.body.id;
  const tipo_usuario = req.body.tipo_usuario;

  tipoUsuarios.update(
    {
    tipo_usuario: tipo_usuario,
    },
    { where:{id: id} },
  )
    .then(() => {
      res.redirect("/tipoUsuarios");
    })
    .catch((error) => {
      console.log(error);
    });
});
export default router;