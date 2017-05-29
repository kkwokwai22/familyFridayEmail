var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var ejs = require('ejs')
var fs = require('fs');

var payload = {
    "members": [
        {
            "email": "kkwok_wai@hotmail.com",
            "name": "Jill",
            "team": "engineering"
        },
        {
            "email": "kkwok_wai@hotmail.com",
            "name": "Rohit",
            "team": "finance"
        },
        {
            "email": "kkwok_wai@hotmail.com",
            "name": "Maria",
            "team": "operations"
        }
    ],

    "restaurant": {
        "logo": "https://s3-media2.fl.yelpcdn.com/bphoto/F_dgemfinYzY9nrZ_xfeGw/o.jpg",
        "name": "Tony’s Pizza Napoletana",
        "yelp_link": "https://www.yelp.com/biz/tonys-pizza-napoletana-san-francisco?osq=best+pizza"
    },

    "operations": {
        'backgroundImage': 'a',
        'description': 'a'
    },
    "finance": {
        'backgroundImage': 'a',
        'description': 'a'
    },
    "engineering": {
        'backgroundImage': 'a',
        'description': 'a'
    }
}

// ---------------------------------

/* GET home page. */
router.get('/', function(req, res, next) {
  
  res.render('index.ejs', {
    user: payload.members[0].name,
    title:'Rating Pizza', 
    restaurantName: payload.restaurant.name, 
    restaurantLogo: payload.restaurant.logo,
    restaurantLink: payload.restaurant.yelp_link,
    team: payload.members[0].team
    });
});


router.get('/sendEmail', function(req, res, next) {
    res.send('sendEmail');
    sendEmailTemplate();
});

function sendEmailTemplate() {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'prompttesting@gmail.com',
            pass: 'testing111'
        }
    });

for(var i = 0; i <= payload.members.length; i++) {
    ejs.renderFile('./views/index.ejs',
        {
        user: payload.members[i].name,
        title:'Rating Pizza', 
        restaurantName: payload.restaurant.name, 
        restaurantLogo: payload.restaurant.logo,
        restaurantLink: payload.restaurant.yelp_link,
        team: payload.members[i].team
        }, 
        function(err, data) {
            if(err) {
                console.log(err);
            } else {
                // setup email data with unicode symbols
                let mailOptions = { 
                    from: '"Kevin Wong 👻" <prompttesting@gmail.com>', // sender address
                    to: payload.members[i].email, // list of receivers
                    subject: 'welcome to nodemailer', // Subject line
                    text: 'Testing with Kevin!', // plain text body
                    html: data// html body
                };
                transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message %s sent: %s', info.messageId, info.response);
                });
            }
        })
    }
}


module.exports = router;

