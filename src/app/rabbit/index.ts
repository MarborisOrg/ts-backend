import { Telegraf } from 'telegraf';

export default function (): void {
  const bot = new Telegraf('7598087160:AAH9-txmznB3ExxUlT0abZUoTu8y7z0aN2Y');
  bot.command('oldschool', (ctx) => ctx.reply('Hello'));
  bot.command('hipster', Telegraf.reply('λ'));
  void bot.launch();

  // Enable graceful stop
  process.once('SIGINT', () => bot.stop('SIGINT'));
  process.once('SIGTERM', () => bot.stop('SIGTERM'));
}
