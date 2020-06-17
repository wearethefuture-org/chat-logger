import { Context, Telegraf } from 'telegraf';
export declare class TelegramBotLogger {
    token: string;
    readonly bot: Telegraf<Context>;
    constructor(token: string);
    loggerTelegramBot(chatId: number, error: any): Promise<void>;
}
