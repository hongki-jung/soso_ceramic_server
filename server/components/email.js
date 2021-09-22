'use strict'

const Nodemailer = require('nodemailer')
const config = require('../config')

module.exports.sendEmail = (sender, context) => {
  let transporter = Nodemailer.createTransport({
    service: config.email.service,
    auth: {
      user: config.email.user,
      pass: config.email.pass
    }
  });

  console.log('transporter')

  let mailOptions = {
    from: config.email.user,
    to: sender,
    subject: 'CLE 가입 승인번호 안내',
    html: '<p>귀하의 승인번호는 '+context+'입니다.</p>'
  };

  console.log('mailOptions')
  console.log(mailOptions)

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
  });

  return true
}

module.exports.sendPassword = (sender, context) => {
  let transporter = Nodemailer.createTransport({
    service: config.email.service,
    auth: {
      user: config.email.user,
      pass: config.email.pass
    }
  });

  console.log('transporter')

  let mailOptions = {
    from: config.email.user,
    to: sender,
    subject: 'CLE 비밀번호 안내',
    html: '<p>귀하의 비밀번호는 '+context+'입니다.</p>'
  };

  console.log('mailOptions')
  console.log(mailOptions)

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
  });

  return true
}

module.exports.sendUserId = (sender, context) => {
  let transporter = Nodemailer.createTransport({
    service: config.email.service,
    auth: {
      user: config.email.user,
      pass: config.email.pass
    }
  });

  console.log('transporter')

  let mailOptions = {
    from: config.email.user,
    to: sender,
    subject: 'CLE 아이디 안내',
    html: '<p>귀하의 아이디는 '+context+'입니다.</p>'
  };

  console.log('mailOptions')
  console.log(mailOptions)

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
  });

  return true
}