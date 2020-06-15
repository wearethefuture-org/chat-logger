import { Context, Telegraf } from 'telegraf';

class BotTelegramLogger {

    readonly bot: Telegraf<Context>;

    constructor(public token: string) {
        this.bot = new Telegraf(token);
        this.bot.startPolling();
        this.bot.start(async ctx => {
            await ctx.reply(`Your chat id: ${ctx.message.chat.id}. Need pass id into logger function`);
        });
    }

    async loggerTelegramBot(chatId: number, error: any): Promise<void> {
        const data = JSON.stringify(error.stack);
        await this.bot.telegram.sendMessage(chatId, data);
    }
}
