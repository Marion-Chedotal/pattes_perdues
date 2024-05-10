module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      gender: {
        type: DataTypes.ENUM,
        values: ["mâle", "femelle"],
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
        allowNull: true,
      },
      tattoo: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      microchip: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      collar: {
        type: DataTypes.BOOLEAN,
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

  // TODO: ondelete and on cascade later
  Post.associate = (models) => {
    Post.belongsTo(models.User);
    Post.belongsTo(models.Address);
    Post.belongsTo(models.Type);
    Post.belongsTo(models.Pet_category);
    Post.hasMany(models.Conversation);
  };

  return Post;
};
