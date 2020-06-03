/**
 * Loading env variables
 */
import { envIndex } from './services/env';
envIndex(`${__dirname}/../`);
//
// import { start } from './bot';
// start().then().catch();

import { BotTelegram } from './bot/bot';
import { BotDatePicker } from './bot/bot-date-picker';
import { BotMessageHandler } from './bot/bot-message-handler';
import { BotService } from './bot/bot-service';
import { Charts } from './services/charts';
import { History } from './services/history';

const token = '1256312888:AAH-Jz-IsEEGhQpZLcjMKImXdXSr2vcpIq4';
const charts = new Charts();
const history = new History();
const botService = new BotService();
const telegramBot = new BotTelegram(token);
const botDatePicker = new BotDatePicker(telegramBot.bot, botService, history);
const botMessageHandler = new BotMessageHandler(telegramBot.bot, charts, botService);

import * as Koa from 'koa';
import * as koaBody from 'koa-body';
import { UpdateData } from './services/cron';
const updateData = new UpdateData();
updateData.getData().then().catch();

// tslint:disable-next-line:no-require-imports
const cors = require('@koa/cors');
// tslint:disable-next-line:no-require-imports
const swagger = require('koa-swagger-decorator');

import { authMiddleware } from './middleware/authMiddleware';
import { errorMiddleware } from './middleware/errorMiddleware';

import { apiRouterV1 } from './router';

const app = new Koa();
app.use(cors());

const router = new swagger.SwaggerRouter();
router.use('/api/v1', apiRouterV1.routes());

router.swagger({
    title: 'API',
    description: 'API DOC',
    version: '1.0.0'
});

// app.use(errorMiddleware);
// app.use(authMiddleware);
// app.use(koaBody());
// app.use(router.routes());
// app.use(router.allowedMethods());

const PORT = process.env.PORT;

app.listen(PORT, async (): Promise<void> => {
    // tslint:disable-next-line:no-console
    console.log('system', `Server started! http://127.0.0.1:${PORT}`, `On ${process.env.NODE_ENV} environment`);
    // await updateData();
});
