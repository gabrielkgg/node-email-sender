const express = require("express");
const app = express();
const path = require("path");
const nodemailer = require("nodemailer");
const port = 80;
app.use(express.urlencoded());

app.get("/", function (request, response, next) {
  response.sendFile(path.join(__dirname + "/formulario-teste.html"));
});

app.post("/", function (request, response, next) {
  //response.send(request.body);
  async function main(formData) {
    console.log(formData);
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.freesmtpservers.com",
      port: 25,
      secure: true, // true for 465, false for other ports
      auth: false,
    });

    // send mail with defined transport object
    const message = {
      from: "gabriel@teste.com",
      to: "gabriel@teste.com", // list of receivers
      subject: "Hello ✔", // Subject line
      html: `<b>${formData.nome}</b>`, // html body
    };

    let info = await transporter.sendMail(message, function (error) {
      if (error) {
        console.log("Error occured");
        console.log(error.message);
        return;
      }
    });

    console.log(info);
  }
  main(request.body).catch(console.error);
});

app.listen();
