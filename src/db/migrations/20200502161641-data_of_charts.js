module.exports = {
  up: (queryInterface, DataTypes) =>
      queryInterface.createTable('data_of_charts', {
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
        currentPosition: {
          type: DataTypes.NUMERIC(13, 2),
          allowNull: true,
          field: 'currentPosition'
        },
        isGrowing: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          field: 'is_growing'
        },
        prevPosition: {
          type: DataTypes.NUMERIC(13, 2),
          allowNull: true,
          field: 'prev_position'
        },
        open: {
          type: DataTypes.NUMERIC(13, 2),
          allowNull: true,
          field: 'open'
        },
        closed: {
          type: DataTypes.NUMERIC(13, 2),
          allowNull: true,
          field: 'closed'
        },
        higher: {
          type: DataTypes.NUMERIC(13, 2),
          allowNull: true,
          field: 'higher'
        },
        lower: {
          type: DataTypes.NUMERIC(13, 2),
          allowNull: true,
          field: 'lower'
        },
        timestamp: {
          type: DataTypes.DATE,
          allowNull: true,
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
