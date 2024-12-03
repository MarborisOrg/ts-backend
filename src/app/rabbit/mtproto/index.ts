import readline from 'readline';
import { TelegramClient } from 'telegram/index.js';
import { StringSession } from 'telegram/sessions/index.js';

export default function (): void {
  const apiId = 27316802;
  const apiHash = '00892a1c8cbd812a3bbbf916bcd861b4';
  const stringSession = new StringSession(''); // fill this later with the value from session.save()

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  void (async (): Promise<void> => {
    console.log('Loading interactive example...');
    const client = new TelegramClient(stringSession, apiId, apiHash, {
      connectionRetries: 5,
    });
    await client.start({
      phoneNumber: async () =>
        new Promise((resolve) =>
          rl.question('Please enter your number: ', resolve)
        ),
      password: async () =>
        new Promise((resolve) =>
          rl.question('Please enter your password: ', resolve)
        ),
      phoneCode: async () =>
        new Promise((resolve) =>
          rl.question('Please enter the code you received: ', resolve)
        ),
      onError: (err) => console.log(err),
    });
    console.log('You should now be connected.');
    console.log(client.session.save()); // Save this string to avoid logging in again

    const targetId = 'S_mrb_S'; // یا می‌توانید از یک شناسه عددی استفاده کنید
    const message = 'Hello!';

    // ارسال پیام هر 5 ثانیه
    setInterval(async () => {
      try {
        await client.sendMessage(targetId, { message });
        console.log(`Message sent to ${targetId}: ${message}`);
      } catch (error) {
        console.error(`Failed to send message: ${error}`);
      }
    }, 5000); // 5000 میلی‌ثانیه = 5 ثانیه
  })();
}
