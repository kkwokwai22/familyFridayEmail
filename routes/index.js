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
        'backgroundImage': 'https://www.asiwny.org/wp-content/uploads/2017/05/Finance.jpg',
        'description': 'Operations is the best wow!! '
    },
    "finance": {
        'backgroundImage': 'data:image/png;base64,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',
        'description': 'hey finance people'
    },
    "engineering": {
        'backgroundImage': 'http://engineeringinterviewquestions.com/wp-content/uploads/2016/01/engineering-qa.jpg',
        'description': 'you are in the engineering team please '
    },
    'general': {
        'backgroundImage': ''
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
    team: payload.members[0].team,
    backgroundImage: payload.operations.backgroundImage
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
    var specificTeam = null
    var specificTeamMessage = null 
    if(payload.members[i].team === 'operations') {
        specificTeam = payload.operations.backgroundImage
        specificTeamMessage = payload.operations.description
    } else if (payload.members[i].team === 'engineering') {
        specificTeam = payload.engineering.backgroundImage
        specificTeamMessage = payload.engineering.description
    } else if (payload.members[i].team === 'finance') {
        specificTeam = payload.finance.backgroundImage 
        specificTeamMessage = payload.finance.description
    } else {
        specificTeam = null
        specificTeamMessage = null
    }

    ejs.renderFile('./views/index.ejs',
        {
        user: payload.members[i].name,
        title:'Rating Pizza', 
        restaurantName: payload.restaurant.name, 
        restaurantLogo: payload.restaurant.logo,
        restaurantLink: payload.restaurant.yelp_link,
        backgroundImage: specificTeam,
        description: specificTeamMessage,
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

