import nodemailer  from 'nodemailer';

// Create a transporter object using SMTP
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: '', // Your email address
    pass: '' // Your password
  }
});

// Define the email content
const mailOptions = {
  from: 'xx@gmail.com', // Sender address
  to: 'yy@gmail.com', // List of recipients
  subject: 'Hello from Node.js', // Subject line
  text: 'Hello, this is a test email sent from Node.js!' // Plain text body
};

// Send the email
exports.sendMail=()=>{
    transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('Error occurred while sending email:', error.message);
  } else {
    console.log('Email sent successfully!');
    console.log('Message ID:', info.messageId);
  }
});
}







