var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var fs = require('fs');



// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'prompttesting@gmail.com',
        pass: 'testing111'
    }
});

var htmlTemplate = fs.readFileSync('./views/index.html', 'utf8');

// setup email data with unicode symbols
let mailOptions = {
    from: '"Kevin Wong 👻" <foo@blurdybloop.com>', // sender address
    to: 'kkwok_wai@hotmail.com', // list of receivers
    subject: 'welcome to nodemailer', // Subject line
    text: 'Testing with Kevin!', // plain text body
    html: htmlTemplate// html body
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/sendEmail', function(req, res, next) {
    res.send(transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
    }));
})


module.exports = router;

