import { Sequelize } from "sequelize";
import connection from "../config/sequelize-config.js";

// TABELA PARA CONTROLE DE PERMISSÃO DE USUÁRIOS

const Permissoes = connection.define("permissoes", {
    permissao: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  Permissoes.sync({ force: false });
  export default Permissoes;
  