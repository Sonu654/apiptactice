var nodemailer = require('nodemailer');
var _ = require("lodash");

var mailer = {
  mailerInit: function () {
    let transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: process.env.SMTP_SSL,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });
  
    return transporter;
  },
  sendMail: async function (mailOptions) {
    try {
        var transporter = await exports.mailerInit();
        var response = await transporter.sendMail(mailOptions);
        return response;
    } catch (err) {
        return err;
    }
  },
  beautifyEmail: async function (content, data) {
    var mailContent = '';
    mailContent = await _.replace(content, new RegExp('{username}', 'g'), data.username);
    mailContent = await _.replace(mailContent, new RegExp('{link}', 'g'), data.link);
    return mailContent;
  }
}

module.exports = mailer;