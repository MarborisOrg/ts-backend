// import { Telegraf } from 'telegraf';

import { connectToRabbitMQ } from './rabbit_rec/index.js';

// import { config } from '#config/env_get';

export default function (): void {
  if ($.config.rabbit == 'rec') {
    void connectToRabbitMQ($.config.queue);
  }

  // const bot = new Telegraf(config.tbot_token);

  // bot.command('oldschool', (ctx) => ctx.reply('Hello'));
  // bot.command('hipster', Telegraf.reply('λ'));

  // const sendMessageToUser = (userId: number): void => {
  //   setInterval(() => {
  //     echo('Sended');
  //     void bot.telegram.sendMessage(userId, 'Test');
  //   }, 5000);
  // };

  // sendMessageToUser(7366772920);

  // void bot.launch();

  // // Enable graceful stop
  // process.once('SIGINT', () => bot.stop('SIGINT'));
  // process.once('SIGTERM', () => bot.stop('SIGTERM'));
}
