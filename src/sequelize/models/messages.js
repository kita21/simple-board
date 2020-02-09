/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Messages', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      field: 'id'
    },
    userId: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      field: 'user_id'
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'message'
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'updated_at'
    }
  }, {
    tableName: 'messages'
  });
};
