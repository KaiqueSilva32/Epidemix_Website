import express, {Router} from "express";
const router = express.Router();

import Usuarios from "../models/Usuarios.js";
import connection from "../config/sequelize-config.js";

import Auth from "../middleware/Auth.js"


// ROTA UNIDADES

// Rota para exibir os usuários
router.get("/usuarios", Auth, async (req, res) => {
  try {
    // Conta o número total de registros na tabela Usuarios
    const totalUsuarios = await Usuarios.count();

    // Busca todos os registros na tabela Usuarios
    const usuarios = await Usuarios.findAll();

    // Função de ordenação quickSort
    function quickSort(arr, key) {
      if (arr.length <= 1) return arr;

      const pivot = arr[arr.length - 1];
      const left = [];
      const right = [];

      for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i][key] < pivot[key]) {
          left.push(arr[i]);
        } else {
          right.push(arr[i]);
        }
      }

      // A função precisa retornar um único array, sem arrays aninhados
      return [...quickSort(left, key), pivot, ...quickSort(right, key)];
    }

    // Ordena os usuários por 'name' (você pode mudar a chave de acordo com sua necessidade)
    const sortedUsuarios = quickSort(usuarios, 'name');

    // Renderiza a página "usuarios" com a lista de usuários e o tamanho total
    res.render("usuarios", {
      usuarios: sortedUsuarios,   // Envia os usuários ordenados para a view
      totalUsuarios: totalUsuarios,  // Envia a contagem total para a view
    });
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    res.status(500).send("Erro ao buscar usuários");
  }
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