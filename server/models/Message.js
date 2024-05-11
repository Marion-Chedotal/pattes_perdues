module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define(
    "Message",
    {
      id_message: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
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
    Message.belongsTo(models.Conversation, {
      foreignKey: "id_conversation",
      constraints: true,
      onDelete: "CASCADE",
    });
    Message.belongsTo(models.User, {
      foreignKey: "id_receiver",
      as: "Receiver",
    });
    Message.belongsTo(models.User, {
      foreignKey: "id_sender",
      as: "Sender",
    });
  };

  return Message;
};
