const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const nodemailer = require("nodemailer");
const axios = require('axios');
const used = process.memoryUsage().heapUsed / 1024 / 1024;

require('dotenv').config()

app.use(express.static('public'));
app.use(bodyparser.urlencoded({
  extended: true
}));


const transporter = nodemailer.createTransport({
  port: 1025,
});

// const transporter = nodemailer.createTransport({
//   host: "smtp.ethereal.email",
//   port: 587,
//   secure: false, // true for 465, false for other ports
//   auth: {
//     user: testAccount.user, // generated ethereal user
//     pass: testAccount.pass, // generated ethereal password
//   },
// });


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
        res.json({
          "id": info.messageId,
          "status": 200
        })
      } else {
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

  const html = `<b> ${email}, napisał:</b><br>${message}`;
  const text = `${email}, napisał: ${message}`;

  const info = await transporter.sendMail({
    from: email,
    to: "nodi37@o2.pl", ///MY EMAIL Z .ENV
    subject: "Nowa wiadomość z formularza CV",
    text: text,
    html: html,
  });

  return info;
}
sendmessage().catch(err => {
  return (err);
})

app.listen(3000, () => {
  console.log("Server started on port 3000");
})