import { Context, Telegraf } from 'telegraf';
import { History } from '../services/history';
import { BotService } from './bot-service';
import { answerHTML } from './helpers/answer-html';
// tslint:disable-next-line:no-require-imports
const Calendar = require('telegraf-calendar-telegram');

export class BotDatePicker {

  constructor(private bot: Telegraf<Context>,
              private botService: BotService,
              private history: History) {
    this.addCalendar(bot);
  }

  private addCalendar(bot: Telegraf<Context>): void {
    const calendar = new Calendar(bot);

    calendar.setDateListener(async (context: any, date: any) => {
      try {
        const historyData = await this.history.getCurrencyByDate(this.botService.idCurrency, date);
        const open = historyData[0].open;
        const closed = historyData[0].closed;

        context.reply(answerHTML.exchangeRates(date, open, closed), {parse_mode: 'HTML'});
      } catch (e) {
        context.reply(e);
      }
    });

    bot.command('calendar', context => {
      const today = new Date();
      const minDate = new Date();
      const maxDate = new Date();

      minDate.setMonth(today.getMonth() - 2);
      maxDate.setMonth(today.getMonth());
      maxDate.setDate(today.getDate());
      context.reply('Please, chose date', calendar.setMinDate(minDate).setMaxDate(maxDate).getCalendar())
    });
  }

}
