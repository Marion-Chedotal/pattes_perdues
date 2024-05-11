module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id_user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      login: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      // postalCode: {
      //   type: DataTypes.CHAR(5),
      //   allowNull: false,
      // },
      // city: {
      //   type: DataTypes.STRING(32),
      //   allowNull: false,
      // },
    },
    {
      tableName: "User",
      timestamps: true,
    }
  );

  // add foreign keys
  User.associate = (models) => {
    User.belongsTo(models.Address, { foreignKey: "id_address" });
    User.hasMany(models.Post, { foreignKey: "id_user" });
    User.hasMany(models.Message, { foreignKey: "id_sender" });
    User.hasMany(models.Message, { foreignKey: "id_receiver" });
  };

  return User;
};
