import { Sequelize } from "sequelize";
import connection from "../config/sequelize-config.js";

// TABELA PARA CONTROLE DE PERMISSÃO DE USUÁRIOS

const Usuarios = connection.define("usuarios", {
    tipo_usuario: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  Usuarios.sync({ force: false });
  export default Usuarios;
  