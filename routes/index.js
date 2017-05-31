var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var mongoose = require('mongoose');
var ejs = require('ejs')
var fs = require('fs');
// var Schema = mongoose.Schema;

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

// var userSchema = new Schema({
//   rating: Number,
//   name: String
// });

// var userRating = mongoose.model('userSchema', userSchema);

// router.post('/userRating', function(req, res, next) {
//     userRating.create({
//         rating: req.body.rating,
//         name: req.body.name
//     }, function(err) {
//         if(err) {
//             console.log(err)
//         } else {
//             res.render('userRating.ejs')
//         }
//     })
// });


// ---------------------------------

router.get('/', function(req, res, next) {
  
  res.render('index.ejs', {
    user: payload.members[0].name,
    title:'Rating Pizza', 
    restaurantName: payload.restaurant.name, 
    restaurantLogo: payload.restaurant.logo,
    restaurantLink: payload.restaurant.yelp_link,
    team: payload.members[0].team,
    backgroundImage: teamDetails.operations.backgroundImage
    });
});

router.get('/sendEmail', function(req, res, next) {
    sendEmailTemplate();
    res.send('sendEmail');
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
    if(payload.members[i].team === 'operations') {
        console.log('hit operations');
        specificTeam = teamDetails.operations.backgroundImage
    } else if (payload.members[i].team === 'engineering') {
        console.log('hit engineering');

        specificTeam = teamDetails.engineering.backgroundImage
    } else if (payload.members[i].team === 'finance') {
        console.log('hit finance');
        specificTeam = teamDetails.finance.backgroundImage 
    } else {
        specificTeam = null
    }

    ejs.renderFile('./views/index.ejs',
        {
        user: payload.members[i].name,
        title:'Rating Pizza', 
        restaurantName: payload.restaurant.name, 
        restaurantLogo: payload.restaurant.logo,
        restaurantLink: payload.restaurant.yelp_link,
        backgroundImage: specificTeam,
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

