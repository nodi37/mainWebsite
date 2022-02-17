const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const axios = require('axios');
const Ajv = require("ajv");
const ajv = new Ajv();
require('dotenv').config()
app.set('trust proxy', true);
app.use(express.static('public'));
app.use(bodyparser.json());



/////////////////////////////////////////////////////////////////////////
//////////////////////API VALIDATION SCHEMES/////////////////////////////
const captchaSchema = {
  type: "object",
  properties: {
    "token": { type: "string" }
  },
  required: ["token"],
  additionalProperties: false
}
//////////////////////API VALIDATION SCHEMES/////////////////////////////
/////////////////////////////////////////////////////////////////////////





/////////////////////////////////////////////////////////////////////////
///////////////////////////////MAIN REQUEST//////////////////////////////

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

///////////////////////////////MAIN REQUEST//////////////////////////////
/////////////////////////////////////////////////////////////////////////





/////////////////////////////////////////////////////////////////////////
/////////////////////////////////RECAPTCHA///////////////////////////////
app.post('/captcha', async (req, res) => {
  if (ajv.validate(captchaSchema, req.body)) {
    const secret = process.env.GAPI_SECRET;
    const userToken = req.body.token;

    axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${userToken}`, {}, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
      },
    }).then(async (tokenres) => {
      const {
        success,
        challenge_ts,
        hostname
      } = tokenres.data;

      if (!success) {
        console.log("This will be error " + req.ip)
      }
      res.sendStatus(200);
    });
  } else {
    res.sendStatus(400)
  }
});

/////////////////////////////////RECAPTCHA///////////////////////////////
/////////////////////////////////////////////////////////////////////////





/////////////////////////////////////////////////////////////////////////
/////////////////////////////////Something///////////////////////////////
app.listen(3000, () => {
  console.log("Server started on port 3000");
});

app.use(function (req, res) {
  res.redirect('/');
});