import twilio from 'twilio';

export function sendSms(body: string, from: string, to: string): void {
  // اطلاعات حساب Twilio
  const accountSid = $.env.config.accountSid; // SID حساب شما
  const authToken = $.env.config.authToken; // توکن احراز هویت شما

  const client = twilio(accountSid, authToken);

  // ارسال SMS
  client.messages
    .create({
      body, // متن پیام
      from, // شماره Twilio شما
      to, // شماره گیرنده
    })
    .then((message) => console.log('Message sent: ' + message.sid))
    .catch((error) => console.error('Error occurred: ' + error.message));
}
