module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define(
    "Address",
    {
      id_address: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      street: {
        type: DataTypes.STRING(100),
        // allowNull: false,
        allowNull: true,
      },
      postalCode: {
        type: DataTypes.CHAR(5),
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING(32),
        allowNull: false,
      },
    },
    {
      tableName: "Address",
      timestamps: true,
    }
  );

  Address.associate = (models) => {
    Address.hasOne(models.Post, {
      foreignKey: "id_address",
      constraints: true,
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
    Address.hasOne(models.User, {
      foreignKey: "id_user",
    });
  };

  return Address;
};
