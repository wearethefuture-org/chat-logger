export default (sequelize: any, DataTypes: any) => {
    return sequelize.define(
        'charts',
        {
            id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                field: 'id'
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                field: 'name'
            },
            key: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                field: 'key'
            },
            numCurrency: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                field: 'num_currency'
            },
            idBank: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: false,
                field: 'id_bunk'
            },
            forecast: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                field: 'forecast'
            },
            humanForecast: {
                type: DataTypes.STRING,
                allowNull: true,
                field: 'humanForecast'
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
            tableName: 'charts',
            timestamps: false,
            createdAt: 'created_at',
            updatedAt: true
        }
    );
};
