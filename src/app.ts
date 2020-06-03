/**
 * Loading env variables
 */
import { envIndex } from './services/env';
envIndex(`${__dirname}/../`);

import { BotTelegramLogger } from './bot/bot';
// @err_log_test_bot
const token = '1124506004:AAEmaiZmvvP_zeOz0TUmCJsDV5tCuQLByDM';
export const bot = new BotTelegramLogger(token);

import * as Koa from 'koa';
import * as koaBody from 'koa-body';
import * as Router from 'koa-router';
import { authMiddleware } from './middleware/authMiddleware';
// tslint:disable-next-line:no-default-import
import router from './router';

const app = new Koa();

const apiRouter = new Router({ prefix: '/api/v1'});
apiRouter.use(router);

app.use(authMiddleware);
app.use(koaBody());
app.use(apiRouter.routes());
app.use(apiRouter.allowedMethods());

const PORT = process.env.PORT;

app.listen(PORT, (): void => {
    // tslint:disable-next-line:no-console
    console.log('system', `Server started! http://127.0.0.1:${PORT}`, `On ${process.env.NODE_ENV} environment`);
});
