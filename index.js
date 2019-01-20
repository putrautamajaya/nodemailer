const express = require("express");
const bodyParser = require("body-parser");
const expressHandlebars = require("express-handlebars");
const nodemailer = require("nodemailer");
const path = require("path");

const app = express();
const port = process.env.PORT || 5000;

//view engine setup
app.engine("handlebars", expressHandlebars());
app.set("view engine", "handlebars");

app.use(express.static(path.join(__dirname, "build")));

//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.get("/", (req, res) => {
//   res.send("nodemailer is online...");
// });

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build/index.html"));
});

app.post("/sendEmail", async (req, res) => {
  const outPut = `
  <h1>Name: ${req.body.name}</h1>
  `;

  let transporter = nodemailer.createTransport({
    host: "smtp.hostinger.co.id",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "putrautamajaya@putrautamajaya.online", // generated ethereal user
      pass: 123456 // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: '"Nodemailer Putra" <putrautamajaya@putrautamajaya.online>', // sender address
    to: "putrautamajaya@gmail.com", // list of receivers
    subject: "email from nodemailer", // Subject line
    text: "Hello world?", // plain text body
    html: outPut // html body
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions);

  console.log("Message sent: %s", info.messageId);
  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
});

app.listen(port, () => console.log(`Listening on port ${port}`));
// app.listen(3000, () => console.log("server started..."));
