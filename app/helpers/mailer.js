var nodemailer = require("nodemailer");
var _ = require("lodash");

export const mailerInit = () => {
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    // secure: process.env.SMTP_SSL,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  return transporter;
};

export const sendMail = async mailOptions => {
  console.log("sending mail", mailOptions);
  try {
    var transporter = await exports.mailerInit();
    var response = await transporter.sendMail(mailOptions);
    console.log("response===>", response);
    return response;
  } catch (err) {
    console.log("sending mail err", err);
    return err;
  }
};

export const beautifyEmail = async (content, data) => {
  var mailContent = "";
  mailContent = await _.replace(
    content,
    new RegExp("{username}", "g"),
    data.username
  );
  mailContent = await _.replace(
    mailContent,
    new RegExp("{link}", "g"),
    data.link
  );
  return mailContent;
};
