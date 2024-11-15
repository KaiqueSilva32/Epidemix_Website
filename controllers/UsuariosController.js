import express, {Router} from "express";
const router = express.Router();

import Usuarios from "../models/Usuarios.js";
import connection from "../config/sequelize-config.js";

import Auth from "../middleware/Auth.js"



// ROTA UNIDADES
router.get("/usuarios", Auth, async (req, res) => {
  try {
    // Conta o número total de registros na tabela Usuarios
    const totalUsuarios = await Usuarios.count();

    // Busca todos os registros na tabela Usuarios
    const usuarios = await Usuarios.findAll();

/* 1) definir uma variavel pivot que sera organizado pela pos do ultimo elemento
quick
2) percorrer o arrray com um for(i=0;i<= total-1; i++){}
3) usuario[i].id
4)if( usuario[i].id < pivot;){
/////////

key - campo id
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

  return [quickSort(left, key), pivot,quickSort(right, key)];
}
const sortedData = quickSort(data, 'name'); // Ordena por nome, mas pode mudar para outra chave
  res.render('index', { data: sortedData });
} 
*/

    // Renderiza a página "usuarios" com a lista de usuários e o tamanho total
    res.render("usuarios", {
      usuarios: usuarios,
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