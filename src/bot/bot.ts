import { Context, Telegraf } from 'telegraf';
import { BaseModelService } from '../services/baseModel';
// // tslint:disable-next-line:no-require-imports
// const Calendar = require('telegraf-calendar-telegram');

// tslint:disable-next-line:no-require-imports
// const TelegramBot = require('node-telegram-bot-api');

// import { UserService } from '../services/user';
// const userService = new UserService();
// const axios = require('axios');

export class BotTelegram extends BaseModelService {

  readonly bot: Telegraf<Context>;

  constructor(public token: string) {
    super();
    this.bot = new Telegraf(token);
    this.bot.startPolling();
  }
    // this._bot.startLongPoll();
    // this.botTS = {...this.botJS};
    // console.log('this._bot', this._bot);
    // const notes: any[] = [];
    // let delay = 5;
    // const options = {
    //   reply_markup: {
    //     inline_keyboard: [
    //       [{text: '1 min', callback_data: 1}],
    //       [{text: '5 mins', callback_data: 5}],
    //       [{text: '10 mins', callback_data: 10}]
    //     ]
    //     // keyboard: [["Sample text", "Second sample"],   ["ihor"], ["I'm robot"]]
    //   }
    // };

    // const url = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange';
    // const sendOptionsHTML = {parse_mode: 'HTML'};
    // let options2 = {
    //     reply_markup: {
    //         // inline_keyboard: [
    //         //     [{ text: '1 min', callback_data: 1}],
    //         //     [{ text: '5 mins', callback_data: 5 }],
    //         //     [{ text: '10 mins', callback_data: 10 }]
    //         //   ],
    //         keyboard: [["Sample text", "Second sample"],   ["/ihor"], ["I'm robot"]]
    //     }
    // };

    // bot.onText(/\/history/, async (msg: any, match: any) => {
    //   const userId = msg.from.id;
    //   //bot.sendMessage(notes[i]['uid'], notes[i]['valcode'] + notes[i]['date'] +notes[i]['Previous rate'] );
    //   if (notes.length !== 0) {
    //     for (var i = 0; i < notes.length; i++) {
    //       if (userId === notes[i]['uid']) {
    //         //console.log(notes)
    //         bot.sendMessage(notes[i]['uid'], 'Oper ' + i + ':'
    //           + notes[i]['valcode'] +
    //           ' ' + notes[i]['date'] +
    //           ' ' + notes[i]['Previous rate']);
    //       }
    //     }
    //   } else {
    //     bot.sendMessage(msg.from.id, "You haven't any requests!");
    //   }
    // })

    // bot.onText(/\/start/, async (msg: any) => {
    //   await userService.checkExistUserAndCreate({
    //     telegramId: `${msg.from.id}`,
    //     isBot: msg.from.is_bot,
    //     firstName: msg.from.first_name,
    //     lastName: msg.from.last_name,
    //     userName: msg.from.username,
    //     languageCode: msg.from.language_code,
    //   })


    //   bot.sendMessage(msg.from.id, "Раді вітати в нашому телеграм боті");
    // })

    // bot.onText(/\/help/, (msg: any) => {
    //   console.log('help here', msg);
    //   bot.sendMessage(msg.from.id, "/rate - currency rate(Ex: /rate USD 20200101)");
    //   bot.sendMessage(msg.from.id, "/delay - set time for notifications (default 1 min)");
    //   bot.sendMessage(msg.from.id, "/history - requests history");
    // })
    //
    // bot.onText(/\/delay/, (msg: any) => {
    //   bot.sendMessage(msg.from.id, "Set notifications?", options);
    // })


    // let i = 0;
    // bot.onText(/\/ihor/, async (msg: any) => {
    //   await userService.checkExistUserAndCreate({
    //     telegramId: `${msg.from.id}`,
    //     isBot: msg.from.is_bot,
    //     firstName: msg.from.first_name,
    //     lastName: msg.from.last_name,
    //     userName: msg.from.username,
    //     languageCode: msg.from.language_code,
    //   })
    //
    //   console.log('here', i);
    //   i++;
    //   bot.sendMessage(msg.from.id, "Set notifications?", options);
    // })


// bot.onText(/\/rate/, (msg) => {
//   bot.sendMessage(msg.from.id,"Missing valCode and YYYYMMDD (Ex: /rate USD 20200101)");
// })

    // bot.onText(/\/rate (.+)/, async (msg: any, match: any) => {
    //   // bot.sendMessage(msg.chat.id, 'Are you satisfied?', options);
    //   const userId = msg.from.id;
    //   const valcode = match[1];
    //   const date = match[2];
    //   const operationTime = new Date();
    //   console.log(operationTime)
    //   console.log(match)
    //   console.log(msg)
    //   const rate = match[1].toLowerCase()
    //   let chartId: number;
    //   switch (rate) {
    //     case 'usa':
    //       chartId = 1
    //       break;
    //     case 'eur':
    //       chartId = 2
    //       break;
    //     case 'rub':
    //       chartId = 3
    //       break;
    //     default :
    //       chartId = 1
    //   }
    //   console.log(chartId);
    //   const value = await this.model.dataOfCharts.findOne(
    //     {
    //       where: {
    //         chartId
    //       },
    //       raw: true,
    //       offset: 0,
    //       order: [['timestamp', 'DESC']]
    //     })
    //   console.log('value', value)

      // const value = await this.model.dataOfCharts.findAll({
      //     where: {
      //         chartId
      //     },
      //     raw: true,
      //     limit: 2,
      //     offset: 0,
      //     order: [['timestamp', 'DESC']]
      // })


      // axios.get(url, {
      //     params: {
      //         valcode,
      //         date,
      //         json:true
      //     }
      // })
      //         .then((response: any) => {
      //             const obj = response.data;
      //             const rate = obj[0]['rate'].toString();
      //             const exDate = obj[0]['exchangedate'].toString();
      //             bot.sendMessage(msg.chat.id, 'Курс ' +
      //                 obj[0]['cc'].toString()+ ' '  +'на '
      //                 + exDate+ ': '
      //                 + rate + ' грн.');
      //             notes.push({ 'uid': userId, 'valcode': valcode, 'date': date, 'time': operationTime, 'Previous rate':rate });
      //             //bot.sendMessage(msg.chat.id, notes.toString())
      //         })
      //         .catch((error: any) => {
      //             console.log(error);
      //         });
    // });

    // bot.on("callback_query", (callbackQuery: any) => {
    //   delay = callbackQuery.data;
    //   const message = callbackQuery.message;
    //   bot.sendMessage(message.chat.id, 'Delay ' + delay + ' min(s) is set!');
    // });

    // setInterval(function () {
    //   for (let i = 0; i < notes.length; i++) {
    //     const curDate = new Date();
    //     let newDateObj = new Date(notes[i]['time'].getTime() + delay * 60000);
    //     //console.log(delay)
    //     if (newDateObj.toString() === curDate.toString()) {
    //       bot.sendMessage(notes[i]['uid'], 'Напоминаю, что вы должны купить валюту: ' + notes[i]['valcode'] + ' сейчас.');
    //       //notes.splice(i, 1);
    //     }
    //   }
    // }, 1000);

    // console.log('here');
    // setTimeout(async () => {
    //
    //     const msg = `<b style="font-color: red; font-size: 45px;">Red color</b>`;
    //     await bot.sendMessage('741830217', msg,
    //         {parse_mode: 'HTML'});
    //     // await bot.sendMessage('263918516', msg, {parse_mode: 'HTML'});
    // }, 3000);
  // }
}
