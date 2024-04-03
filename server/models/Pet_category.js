module.exports = (sequelize, DataTypes) => {
  const Pet_category = sequelize.define(
    "Pet_category",
    {
      label: {
        type: DataTypes.ENUM,
        values: ["Chiens", "Chats", "Autres"],
        allowNull: false,
      },
    },
    {
      tableName: "Pet_category",
      timestamps: true,
    }
  );

  Pet_category.associate = (models) => {
    Pet_category.hasMany(models.Post);
  };

  return Pet_category;
};
