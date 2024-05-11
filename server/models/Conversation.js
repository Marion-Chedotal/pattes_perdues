module.exports = (sequelize, DataTypes) => {
  const Conversation = sequelize.define(
    "Conversation",
    {
      id_conversation: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    },
    {
      tableName: "Conversation",
      timestamps: true,
    }
  );
// by default: update: cascade, delete: set null 
  Conversation.associate = (models) => {
    Conversation.hasMany(models.Message, {
      foreignKey: "id_conversation",
      onDelete: "CASCADE",
    });
    Conversation.belongsTo(models.Post, {
      foreignKey: "id_post",
      constraints: true,
      onDelete: "CASCADE",
    });
  };

  return Conversation;
};
