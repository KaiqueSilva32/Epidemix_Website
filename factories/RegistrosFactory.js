class RegistrosFactory {
    Build(registro) {
      const year = registro.data.getFullYear();
      const month = registro.data.getMonth();
      const day = registro.data.getDate() + 1;
      const hour = Number.parseInt(registro.hora.split(":")[0]);
      const minutes = Number.parseInt(registro.hora.split(":")[1]);
  
      const hora = `${hour}:${minutes.toString().padStart(2, '0')}`;
      const fullDate = new Date(year, month, day, hour, minutes, 0, 0);
  
      const reg = {
        id: registro.id,
        data: fullDate,
        hora: hora,
        nivel: registro.nivel,
        id_usuario: registro.id_usuario,
        id_endereco: registro.id_endereco
  
      };
  
      return reg;
    }
  }
  
  export default new RegistrosFactory;
  