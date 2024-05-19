module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define(
    "Message",
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      read: {
        type: DataTypes.BOOLEAN,
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
      onDelete: "SET NULL",
    });
    Message.belongsTo(models.User, {
      foreignKey: "UserId",
      as: "Sender",
      onDelete: "SET NULL",
    });
    Message.belongsTo(models.Conversation, { onDelete: "CASCADE" });
  };

  return Message;
};
