const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const nodemailer = require("nodemailer");
const axios = require('axios');

require('dotenv').config()

app.use(express.static('public'));
app.use(bodyparser.urlencoded({
  extended: true
}));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.post('/', (req, res) => {
  //FOR FAIL2BAN!
  var ip = req.headers['x-forwarded-for'];
  var ip2 = req.socket.remoteAddress;
  console.log("ip1: " + ip + "ip1: "+ ip2);

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
        res.json({
          "id": info.messageId,
          "status": 200
        })
      } else {
        console.log("Captcha verification failed. IP1: " + ip + " IP2: " + ip);
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
    from: `"Formularz CV na nbtb.eu" <${process.env.EMAIL}>`,
    to: process.env.MY_EMAIL,
    subject: "Nowa wiadomość z formularza CV",
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

app.use(function(req, res) {
  res.redirect('/');
});
