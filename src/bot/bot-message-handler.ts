import { Context, Telegraf } from 'telegraf';
import { IChart } from '../interfaces';
import { Charts } from '../services/charts';
import { UserService } from '../services/user';
import { BotService } from './bot-service';
import { answerHTML } from './helpers/answer-html';

export class BotMessageHandler {

  userService = new UserService();

  constructor(private bot: Telegraf<Context>,
              private charts: Charts,
              private botService: BotService) {
    this.handleMessages();
  }

  private handleMessages(): void {
    this.bot.help(this.help.bind(this));
    this.bot.start(this.start.bind(this));
    this.bot.on('text', (ctx: Context) => {

    });
  }

  private async help(ctx: Context): Promise<void> {
    await ctx.reply(answerHTML.help, {parse_mode: 'HTML'});
  }

  private async start(ctx: Context): Promise<void> {
    const currenciesData = await this.charts.getCurrencies();
    const currencies = currenciesData.map((el: IChart) => {
      return {
        text: el.key,
        callback_data: String(el.id)
      };
    });
    const options = {
      reply_markup: {
        inline_keyboard: [currencies]
      }
    };

    ctx.reply('Please, chose currency', options);

    this.bot.on('callback_query', (ctx: Context) => {
      const id = ctx.update.callback_query.data;
      const currencyData = currencies.find((el: {text: string, callback_data: string}) => el.callback_data === id);

      this.botService.idCurrency = id;
      ctx.reply(currencyData.text);
      this.showCalendar(ctx);
    });

    this.addNewUser(ctx);
  }

  private addNewUser(ctx: Context): void {
    console.log('ctx', ctx.from);
    this.userService.checkExistUserAndCreate({
      telegramId: `${ctx.from.id}`,
      // isBot: ctx.from.is_bot,
      firstName: ctx.from.first_name,
      lastName: ctx.from.last_name || 'unknown',
      userName: ctx.from.username,
      languageCode: ctx.from.language_code
    });
  }

  private async showCalendar(ctx: Context): Promise<void> {
    const options = {
      reply_markup: {
        keyboard: [
          [
            {text: '/calendar'}
          ]
        ],
        resize_keyboard: true,
        one_time_keyboard: true
      }
    };

    await ctx.reply('Please, open calendar for choosing date', options);
  }

}
