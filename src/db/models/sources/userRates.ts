export default (sequelize: any, DataTypes: any) => {
    return sequelize.define(
        'userRates',
        {
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
                allowNull: false,
                field: 'first_name'
            },
            isGrowing: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                field: 'is_growing'
            },
            prevPosition: {
                type: DataTypes.NUMERIC(13, 2),
                allowNull: false,
                field: 'prev_position'
            },
            timestamp: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
                field: 'timestamp'
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
        },
        {
            tableName: 'user_rates',
            timestamps: false,
            createdAt: 'created_at',
            updatedAt: true
        }
    );
};
