module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      gender: {
        type: DataTypes.ENUM,
        values: ["Mâle", "Femelle"],
        allowNull: true,
      },
      alert_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(32),
        allowNull: false,
      },
      tattoo: {
        type: DataTypes.ENUM,
        values: ["Oui", "Non", "Ne sais pas"],
        allowNull: false,
      },
      microchip: {
        type: DataTypes.ENUM,
        values: ["Oui", "Non", "Ne sais pas"],
        allowNull: false,
      },
      collar: {
        type: DataTypes.ENUM,
        values: ["Oui", "Non", "Ne sais pas"],
        allowNull: false,
      },
      distinctive_signs: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
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
      tableName: "Post",
      timestamps: true,
    }
  );

  Post.associate = (models) => {
    Post.belongsTo(models.User, {
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    Post.belongsTo(models.Type);
    Post.belongsTo(models.Pet_category);
    Post.hasMany(models.Conversation);
  };

  return Post;
};
