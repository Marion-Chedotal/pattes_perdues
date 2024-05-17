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
      tableName: "User",
      timestamps: true,
    }
  );

  // add foreign keys
  User.associate = (models) => {
    User.hasMany(models.Post);
    User.hasMany(models.Message);
  };

  return User;
};
