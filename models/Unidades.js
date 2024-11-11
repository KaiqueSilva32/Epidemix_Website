import { Sequelize } from "sequelize";
import connection from "../config/sequelize-config.js";


const Unidades = connection.define("unidades", {
    unidade: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    telefone: {
        type: Sequelize.STRING,
        allowNull: false,
    }
  });
  Unidades.sync({ force: false });
  export default Unidades;
  