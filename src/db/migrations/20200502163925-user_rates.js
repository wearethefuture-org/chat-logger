module.exports = {
  up: (queryInterface, DataTypes) =>
      queryInterface.createTable('user_rates', {
        id: {
          type: DataTypes.BIGINT,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
          field: 'id'
        },
        chartId: {
          type: DataTypes.BIGINT,
          allowNull: true,
          references: {
            model: 'charts',
            key: 'id'
          },
          field: 'chart_id'
        },
        canBuy: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          field: 'can_buy'
        },
        currentRate: {
          type: DataTypes.NUMERIC(13, 2),
          allowNull: true,
          field: 'can_buy'
        },
        myCurrentRate: {
          type: DataTypes.NUMERIC(13, 2),
          allowNull: true,
          field: 'my_current_rate'
        },
        needNewCurrentRate: {
          type: DataTypes.NUMERIC(13, 2),
          allowNull: true,
          field: 'need_new_current_rate'
        },
        timestamp: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.literal('CURRENT_TIMESTAMP'),
          field: 'timestamp'
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.literal('CURRENT_TIMESTAMP'),
          field: 'created_at'
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.literal('CURRENT_TIMESTAMP'),
          field: 'updated_at'
        }
      }),
};
