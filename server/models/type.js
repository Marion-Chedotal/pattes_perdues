module.exports = (sequelize, DataTypes) => {
  const Type = sequelize.define(
    "Type",
    {
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
    Type.hasMany(models.Post);
  };

  return Type;
};
