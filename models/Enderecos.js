import { Sequelize } from "sequelize";
import connection from "../config/sequelize-config.js";

const Enderecos = connection.define("enderecos", {
  logradouro: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  numero: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  bairro: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  cidade: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  estado: {
    type: Sequelize.STRING,
    allowNull: false
  },
  pais:{
    type: Sequelize.STRING,
    allowNull: false
  },
  cep: {
    type: Sequelize.STRING,
    allowNull: false
  },
});
Enderecos.sync({ force: false });
export default Enderecos;
