import { Context, Telegraf } from 'telegraf';

export class TelegramBotLogger {

    readonly bot: Telegraf<Context>;

    constructor(public token: string) {
        this.bot = new Telegraf(token);
        this.bot.startPolling();
        this.bot.start(async ctx => {
            await ctx.reply(`Your chat id: ${ctx.message.chat.id}. Need pass id into logger function`);
        });
    }

    async loggerTelegramBot(chatId: number, error: any): Promise<void> {
        const data = error.stack ? "\u{274C}\u{274C}\u{274C}"+JSON.stringify(error.stack)+"\u{274C}\u{274C}\u{274C}" : "\u{274C}\u{274C}\u{274C}"+JSON.stringify(error)+"\u{274C}\u{274C}\u{274C}";
        await this.bot.telegram.sendMessage(chatId, data);
    }
}