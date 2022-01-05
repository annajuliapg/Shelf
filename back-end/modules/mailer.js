const path = require('path');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars')
const config = require('../config');

var transport = nodemailer.createTransport({
  service: config.mailConfig.service,
  auth: {
    user: config.mailConfig.auth.user,
    pass: config.mailConfig.auth.pass,
  },
  tls: {
    rejectUnauthorized: false
  }
});

transport.use('compile', hbs({
  viewEngine: {
    defaultLayout: undefined,
    partialsDir: path.resolve('./resources/mail/')
  },
  viewPath: path.resolve('./resources/mail/'),
  extName: '.html',
}));

module.exports = transport;

