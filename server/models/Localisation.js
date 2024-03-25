module.exports = ( sequelize, DataTypes) => {
  const Localisation = sequelize.define(
    "Localisation",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      area: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      postcode: {
        type: DataTypes.CHAR(5),
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING(32),
        allowNull: false,
      },
    },
    {
      tableName: "Localisation",
      timestamps: true,
      updatedAt: false,
    }
  );

  Localisation.associate = (models) => {
    Localisation.hasOne(models.User, {
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  };

  return Localisation;
};
