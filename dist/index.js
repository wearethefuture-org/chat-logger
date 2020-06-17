"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelegramBotLogger = void 0;
const telegraf_1 = require("telegraf");
class TelegramBotLogger {
    constructor(token) {
        this.token = token;
        this.bot = new telegraf_1.Telegraf(token);
        this.bot.startPolling();
        this.bot.start(async (ctx) => {
            await ctx.reply(`Your chat id: ${ctx.message.chat.id}. Need pass id into logger function`);
        });
    }
    async loggerTelegramBot(chatId, error) {
        const data = error.stack ? "\u{274C}\u{274C}\u{274C}" + JSON.stringify(error.stack) + "\u{274C}\u{274C}\u{274C}" : "\u{274C}\u{274C}\u{274C}" + JSON.stringify(error) + "\u{274C}\u{274C}\u{274C}";
        await this.bot.telegram.sendMessage(chatId, data);
    }
}
exports.TelegramBotLogger = TelegramBotLogger;
//# sourceMappingURL=index.js.map