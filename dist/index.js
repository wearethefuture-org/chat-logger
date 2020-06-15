"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
class BotTelegramLogger {
    constructor(token) {
        this.token = token;
        this.bot = new telegraf_1.Telegraf(token);
        this.bot.startPolling();
        this.bot.start(async (ctx) => {
            await ctx.reply(`Your chat id: ${ctx.message.chat.id}. Need pass id into logger function`);
        });
    }
    async loggerTelegramBot(chatId, error) {
        const data = JSON.stringify(error.stack);
        await this.bot.telegram.sendMessage(chatId, data);
    }
}
const token = '1124506004:AAEmaiZmvvP_zeOz0TUmCJsDV5tCuQLByDM';
const bot = new BotTelegramLogger(token);
//# sourceMappingURL=index.js.map