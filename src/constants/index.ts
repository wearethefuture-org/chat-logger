
export const dataForCreateCharts = [
    {
        name: 'usa-uah',
        key : 'usa',
        numCurrency: process.env.QUERY_PARAMS_USA,
        idBank: process.env.QUERY_PARAMS_ID
    },{
        name: 'eur-uah',
        key: 'eur',
        numCurrency: process.env.QUERY_PARAMS_EUR,
        idBank: process.env.QUERY_PARAMS_ID
    },{
        name: 'rub-uah',
        key: 'rub',
        numCurrency: process.env.QUERY_PARAMS_RUB,
        idBank: process.env.QUERY_PARAMS_ID
    }

]