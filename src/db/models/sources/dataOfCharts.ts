export default (sequelize: any, DataTypes: any) => {
    return sequelize.define(
        'dataOfCharts',
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
                allowNull: true,
                field: 'currentPosition',
                defaultValue: "0"
            },
            isGrowing: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                field: 'is_growing',
                defaultValue: "0"
            },
            prevPosition: {
                type: DataTypes.NUMERIC(13, 2),
                allowNull: true,
                field: 'prev_position',
                defaultValue: "0"
            },
            open: {
                type: DataTypes.NUMERIC(13, 2),
                allowNull: true,
                field: 'open',
                defaultValue: "0"
            },
            closed: {
                type: DataTypes.NUMERIC(13, 2),
                allowNull: true,
                field: 'closed',
                defaultValue: "0"
            },
            higher: {
                type: DataTypes.NUMERIC(13, 2),
                allowNull: true,
                field: 'higher',
                defaultValue: "0"
            },
            lower: {
                type: DataTypes.NUMERIC(13, 2),
                allowNull: true,
                field: 'lower',
                defaultValue: "0"
            },
            timestamp: {
                type: DataTypes.DATE,
                allowNull: true,
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
            tableName: 'data_of_charts',
            timestamps: false,
            createdAt: 'created_at',
            updatedAt: true
        }
    );
};
