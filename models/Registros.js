import { Sequelize } from "sequelize";
import connection from "../config/sequelize-config.js";


const Registros = connection.define("registros", {
    data: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    hora: {
        type: Sequelize.TIME,
        allowNull: false,
    },
    nivel: { 
      type: Sequelize.INTEGER,
      allowNull: false
    },
    id_usuario: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    id_endereco: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
  });
  Registros.sync({ force: false });
  export default Registros;
  