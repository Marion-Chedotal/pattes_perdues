module.exports = (sequelize, DataTypes) => {
  const Type = sequelize.define(
    "Type",
    {
      id_type: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      label: {
        type: DataTypes.ENUM,
        values: ["Perdu", "Trouvé", "Volé"],
        allowNull: false,
      },
    },
    {
      tableName: "Type",
      timestamps: true,
    }
  );
  
  Type.associate = (models) => {
    Type.hasMany(models.Post, { foreignKey: "id_type" });
  };

  return Type;
};
