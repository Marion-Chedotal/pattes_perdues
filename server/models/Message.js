module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define(
    "Message",
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      tableName: "Message",
      timestamps: true,
    }
  );

  Message.associate = (models) => {
    Message.belongsTo(models.User, {
      foreignKey: "receiverId",
      as: "Receiver",
    });
    Message.belongsTo(models.User, {
      foreignKey: "UserId",
      as: "Sender",
    });
    Message.belongsTo(models.Conversation);
  };

  return Message;
};
