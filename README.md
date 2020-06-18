# telegram-bot-error-logger
This package will help you catch your project errors easier via telegram bot
## Get token for Telegram Bot
At first, you need to go to Telegram and registration bot in BotFather (@BotFather).
Here you`ll get a token for your bot.
## Installation
```bash
npm install telegram-bot-error-logger
```
## Usage
Bot initialization should be in catching error place.
For example, in the catching errors function , 
which was caused in an application as middleware.
```javascript
const { TelegramBotLogger } = require('telegram-bot-error-logger');
const bot = new TelegramBotLogger('TOKEN');

async function myAsyncFunction(...args) {
    try {
      // do something
    } catch (error) {
       // chatId you`ll get after bot start
      await bot.loggerTelegramBot(chatId, error);
    }
}
```
## License
[MIT](https://choosealicense.com/licenses/mit/)