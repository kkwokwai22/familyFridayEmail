var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var ejs = require('ejs')
var fs = require('fs');

var payload = {
    "members": [
        {
            "email": "jill@mycompany.com",
            "name": "Jill",
            "team": "engineering"
        },
        {
            "email": "rohit@mycompany.com",
            "name": "Rohit",
            "team": "finance"
        },
        {
            "email": "maria@mycompany.com",
            "name": "Maria",
            "team": "operations"
        }
    ],
    "restaurant": {
        "logo": "http://example.com/images/pizza.png",
        "name": "Pizza R Us",
        "yelp_link": "https://yelp.com/pizza-r-us"
    }
}





// ---------------------------------


/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('hit')
  res.render('index.ejs', {user: 'kevin', title:'homepage'});
});


router.get('/sendEmail', function(req, res, next) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'prompttesting@gmail.com',
            pass: 'testing111'
        }
    });

    // sending the html template as email 
    var EjsTemplate = fs.readFileSync('./views/index.ejs', 'utf8');


    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Kevin Wong 👻" <prompttesting@gmail.com>', // sender address
        to: 'kkwok_wai@hotmail.com', // list of receivers
        subject: 'welcome to nodemailer', // Subject line
        text: 'Testing with Kevin!', // plain text body
        html: EjsTemplate// html body
    };

    res.render('index', {user: "Great User",title:"homepage"})

    transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
    });
})


module.exports = router;

