const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("videogame", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    released: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    platforms: {
      type: DataTypes.ARRAY(DataTypes.STRING
        // 'PlayStation 2',
        // 'PlayStation 3',
        // 'PlayStation 4',
        // 'PlayStation 5',
        // 'Xbox',
        // 'Xbox One',
        // 'Xbox Series S/X',
        // 'Xbox 360',
        // 'PC',
        // 'Nintendo Switch',
        // 'Linux',
        // 'macOS',
        // 'Android',
        // 'iOS',
        // 'PS Vita',
        // 'Web',
        // 'Wii U',
        // 'Nintendo 3DS',
        // 'Dreamcast'
      ),
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  },
  {
    timestamps: false,
  });
};
