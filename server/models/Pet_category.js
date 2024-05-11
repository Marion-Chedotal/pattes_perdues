module.exports = (sequelize, DataTypes) => {
  const Pet_category = sequelize.define(
    "Pet_category",
    {
      id_pet_category: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
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
    Pet_category.hasMany(models.Post, { foreignKey: "id_pet_category" });
  };

  return Pet_category;
};
