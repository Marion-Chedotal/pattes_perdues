module.exports = (sequelize, DataTypes) => {
  const Conversation = sequelize.define(
    "Conversation",
    {},
    {
      tableName: "Conversation",
      timestamps: true,
    }
  );

  Conversation.associate = (models) => {
    Conversation.hasMany(models.Message);
  };

  return Conversation;
};