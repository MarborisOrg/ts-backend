import nodemailer from 'nodemailer';

// تنظیمات SMTP
const transporter = nodemailer.createTransport({
  host: 'smtp.example.com', // آدرس SMTP سرور
  port: 587, // پورت SMTP
  secure: false, // true برای پورت 465 و false برای پورت 587
  auth: {
    user: 'your-email@example.com', // ایمیل شما
    pass: 'your-email-password', // رمز عبور ایمیل شما
  },
});

// تنظیمات ایمیل
const mailOptions = {
  from: 'your-email@example.com', // فرستنده
  to: 'recipient@example.com', // گیرنده
  subject: 'Hello from Node.js', // موضوع ایمیل
  text: 'This is a test email sent from Node.js using TypeScript!', // متن ایمیل
};

// ارسال ایمیل
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log('Error occurred: ' + error.message);
  }
  console.log('Email sent: ' + info.response);
});
