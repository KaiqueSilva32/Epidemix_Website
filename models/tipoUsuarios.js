import { Sequelize } from "sequelize";
import connection from "../config/sequelize-config.js";

// TABELA PARA CONTROLE DE PERMISSÃO DE USUÁRIOS

const tipoUsuarios = connection.define("tipoUsuarios", {
    tipo_usuario: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  tipoUsuarios.sync({ force: false });
  export default tipoUsuarios;
  