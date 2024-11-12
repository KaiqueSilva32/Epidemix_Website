import { Sequelize } from "sequelize";
import connection from "../config/sequelize-config.js";


const Usuarios = connection.define("usuarios", {
    nome: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    telefone: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cpf: {
        type: Sequelize.STRING,
        allowNull: false
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false
    },
    id_tipo_usuario: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    id_unidades: {
        type: Sequelize.INTEGER,
        allowNull: false
    } 
  });
  Usuarios.sync({ force: false });
  export default Usuarios;
  