import { Sequelize } from "sequelize";
import connection from "../config/sequelize-config.js";


const Celulares = connection.define("celulares", {
    telefone: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    endereco_mac: {
        type: Sequelize.STRING,
        allowNull: false
    },
    id_usuario: {
        type: Sequelize.STRING,
        allowNull: false
    }
  });
  Celulares.sync({ force: false });

    export default Celulares;
  