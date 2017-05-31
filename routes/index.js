var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var mongoose = require('mongoose');
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
            "email": "kkwokwai22@gmail.com",
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
}

var teamDetails =  {
    "operations": {
        'backgroundImage': "http://www.channel4.com/explore/surgerylive/images/team2.jpg",
        'description': 'Operations is the best wow!! '
    },
    "finance": {
        'backgroundImage':'https://www.western.edu/sites/default/files/finance_header2.jpg',
        'description': 'hey finance people'
    },
    "engineering": {
        'backgroundImage':'https://engineeringinterviewquestions.com/wp-content/uploads/2016/01/engineering-qa.jpg',
        'description': 'you are in the engineering team please '
    },
    'general': {
        'backgroundImage': ''
    }
}

// ---------------------------------

/* GET home page. */
router.get('/', function(req, res, next) {
  
  // res.render('index.ejs', {
  //   user: payload.members[0].name,
  //   title:'Rating Pizza', 
  //   restaurantName: payload.restaurant.name, 
  //   restaurantLogo: payload.restaurant.logo,
  //   restaurantLink: payload.restaurant.yelp_link,
  //   team: payload.members[0].team,
  //   backgroundImage: teamDetails.operations.backgroundImage
  //   });
  res.render('home.ejs')
});

router.get('/sendEmail', function(req, res, next) {
    sendEmailTemplate(payload, function(err, data){
        if(err) {
            console.log(err)
        } else {
            res.send('good job')
        }
    });
});

function sendEmailTemplate(informationOfMember, callback) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'prompttesting@gmail.com',
            pass: 'testing111'
        }
    });

    const member = informationOfMember.members
    const restaurant = informationOfMember.restaurant

    for(var i = 0; i <= member.length; i++) {
        var specificTeam = null
        if(member[i].team === 'operations') {
            specificTeam = teamDetails.operations.backgroundImage
        } else if (member[i].team === 'engineering') {
            specificTeam = teamDetails.engineering.backgroundImage
        } else if (member[i].team === 'finance') {
            specificTeam = teamDetails.finance.backgroundImage 
        } else {
            console.log('hitting');
            specificTeam = null
        }

        ejs.renderFile('./views/index.ejs',
            {
            user: member[i].name,
            title:'Rating Pizza', 
            restaurantName: restaurant.name, 
            restaurantLogo: restaurant.logo,
            restaurantLink: restaurant.yelp_link,
            backgroundImage: specificTeam,
            team: member[i].team
            }, 
            function(err, data) {
                if(err) {
                    console.log(err);
                } else {
                    // setup email data with unicode symbols
                    let mailOptions = { 
                        from: '"Kevin Wong 👻" <prompttesting@gmail.com>', // sender address
                        to: member[i].email, // list of receivers
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

