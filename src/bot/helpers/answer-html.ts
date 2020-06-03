export const answerHTML = {
  help: 'Щоб використовувати наш бот введіть <b>usd 2020-05-16</b>',
  exchangeRates: (date: string, open: string, close: string) => {
    return `🕰️ ${date} \n💹 open ${open} \n💹 closed ${close}`;
  }
};
