const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const nodemailer = require("nodemailer");
const axios = require('axios');

require('dotenv').config()

app.set('trust proxy', true);
app.use(express.static('public'));
app.use(bodyparser.urlencoded({
  extended: true
}));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.post('/', (req, res) => {
  const {
    email,
    message,
    none
  } = req.body;
  const response = Object.values(req.body)[2];
  const secret = process.env.GAPI_SECRET;
  axios
    .post(`https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${response}`, {}, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
      },
    })
    .then(async function (tokenres) {

      const {
        success,
        challenge_ts,
        hostname
      } = tokenres.data;

      if (success) {
        const info = await sendmessage(email, message);
        console.log("Message sent: " + info.messageId);
        const mid = info.messageId.slice(1, info.messageId.indexOf("@"));
        res.json({
          "id": mid,
          "status": 200
        })
      } else {
        //FOR FAIL2BAN
        const now = new Date();
        const tZOffset = now.getTimezoneOffset() / 60;
        const month = now.toLocaleString('en-US', {month: 'short'});
        const day = (now.getUTCDate()<10)?("0"+now.getUTCDate()):now.getUTCDate();
        const hours = (now.getUTCHours() - tZOffset<10)?("0"+now.getUTCHours()- tZOffset):(now.getUTCHours()-tZOffset);
        const minutes = (now.getUTCMinutes()<10)?("0"+now.getUTCMinutes()):now.getUTCMinutes();
        const seconds = (now.getUTCSeconds()<10)?("0"+now.getUTCSeconds()):now.getUTCSeconds();
        console.log(`${month} ${day} ${hours}:${minutes}:${seconds} Captcha verification failed [${req.ip}]`);
        res.json({
          "message": "Bad Request.",
          "status": "400"
        })
      }
    })
    .catch(error => {
      console.error(error)
      res.json({
        "message": "Internal Server Error.",
        "status": "500"
      })
    })
})

async function sendmessage(email, message) {

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  const html = `<b> ${email}, napisał:</b><br>${message}`;
  const text = `${email}, napisał: ${message}`;

  const info = await transporter.sendMail({
    from: `"Formularz z nbtb.eu" <${process.env.EMAIL}>`,
    to: process.env.MY_EMAIL,
    subject: "Nowa wiadomość z nbtb.eu",
    text: text,
    html: html,
  });

  return info;
}
sendmessage().catch(err => {
  return (err);
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});

app.use(function (req, res) {
  res.redirect('/');
});