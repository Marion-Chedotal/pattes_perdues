module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define(
    "Address",
    {
      street: {
        type: DataTypes.STRING(100),
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
      constraints: true,
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  };

  return Address;
};
