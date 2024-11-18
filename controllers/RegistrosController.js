import express, {Router} from "express";
const router = express.Router();

import Registros from "../models/Registros.js";
import connection from "../config/sequelize-config.js";

import Auth from "../middleware/Auth.js"



// ROTA UNIDADES
import RegistrosFactory from "../factories/RegistrosFactory.js";

// ROTA UNIDADES
router.get("/registros", Auth, (req, res) => {
  Registros.findAll().then((registros) => {
    const regs = [];

    registros.forEach((reg) => {
      regs.push(RegistrosFactory.Build(reg));
    });
    res.render("registros", {
      regs: regs,
    });
  });
});

// Rota de cadastro de unidades
router.post("/registros/new", (req, res) => {
  const data = req.body.data;
  const hora = req.body.hora;
  const nivel = req.body.nivel;
  const id_usuario = req.body.id_usuario;
  const id_endereco = req.body.id_endereco;
  
  Registros.create({
    data: data,
    hora: hora,
    nivel: nivel,
    id_usuario: id_usuario,
    id_endereco: id_endereco
  }).then(() => {
    res.redirect("/registros");
  });
});

// Rota de delete de dados
// Essa rota possui um parâmetro id
router.get("/registros/delete/:id", (req, res) => {
  const id = req.params.id;

  Registros.destroy({
    where: {
      id: id,
    },
  })
    .then(() => {
      res.redirect("/registros");
    })
    .catch((error) => {
      console.log(error);
    });
});

//Rota de edição de unidades
router.get("/registros/edit/:id", (req, res) => {
  const id = req.params.id;
  Registros.findByPk(id)
    .then((registros) => {
      res.render("registrosEdit", {
        registros: registros,
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

router.post("/registros/update", (req, res) => {
  const id = req.body.id;
  const data = req.body.data;
  const hora = req.body.hora;
  const nivel = req.body.nivel;
  const id_usuario = req.body.id_usuario;
  const id_endereco = req.body.id_endereco;

  Registros.update(
    {
        data: data,
        hora: hora,
        nivel: nivel,
        id_usuario: id_usuario,
        id_endereco: id_endereco
    },
    { where:{id: id} },
  )
    .then(() => {
      res.redirect("/registros");
    })
    .catch((error) => {
      console.log(error);
    });
});
export default router;