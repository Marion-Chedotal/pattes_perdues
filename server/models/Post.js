module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      id_post: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
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
    },
    {
      tableName: "Post",
      timestamps: true,
    }
  );

  Post.associate = (models) => {
    Post.belongsTo(models.Address, {
      foreignKey: "id_address",
      constraints: true,
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
    Post.belongsTo(models.User, {
      foreignKey: "id_user",
    });

    Post.belongsTo(models.Type, {
      foreignKey: "id_type",
    });
    Post.belongsTo(models.Pet_category, {
      foreignKey: "id_pet_category",

    });
    Post.hasMany(models.Conversation, { foreignKey: "id_post" });
  };

  return Post;
};
