module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
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
    },
    {
      tableName: "User",
      timestamps: true,
    }
  );

  // add foreign keys
  User.associate = (models) => {
    User.belongsTo(models.Address);
    User.hasMany(models.Post);
  };

  return User;
};
