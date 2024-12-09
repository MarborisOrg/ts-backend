import nodemailer from 'nodemailer';

export function sendMail(to: string, subject: string, text: string): void {
  // تنظیمات SMTP
  const transporter = nodemailer.createTransport({
    host: $.env.config.host, // آدرس SMTP سرور
    port: $.env.config.port, // پورت SMTP
    secure: $.env.config.secure, // true برای پورت 465 و false برای پورت 587
    auth: {
      user: $.env.config.auth_user, // ایمیل شما
      pass: $.env.config.auth_pass, // رمز عبور ایمیل شما
    },
  });

  // تنظیمات ایمیل
  const mailOptions = {
    from: $.env.config.auth_user, // فرستنده
    to, // گیرنده
    subject, // موضوع ایمیل
    text, // متن ایمیل
  };

  // ارسال ایمیل
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log('Error occurred: ' + error.message);
    }
    console.log('Email sent: ' + info.response);
  });
}
