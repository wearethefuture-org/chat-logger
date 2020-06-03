import { Context, Telegraf } from 'telegraf';
import { BaseModelService } from '../services/baseModel';

export class BotTelegramLogger extends BaseModelService {

    readonly bot: Telegraf<Context>;

    constructor(public token: string) {
        super();
        this.bot = new Telegraf(token);
        this.bot.startPolling();
        this.bot.start(async ctx => {
            await ctx.reply(`Your chat id: ${ctx.message.chat.id}. Need pass id into logger function`);
        });
    }

    async loggerTelegramBot(chatId: number, error: any): Promise<void> {
        const html = `<pre>${JSON.stringify(error.stack)}</pre>`;
        await this.bot.telegram.sendMessage(chatId, html, {
            parse_mode: 'HTML'
        });
    }
}
