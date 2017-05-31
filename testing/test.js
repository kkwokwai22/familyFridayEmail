var nodemailer = require('nodemailer');
var stubTransport = require('nodemailer-stub-transport');

var transport = nodemailer.createTransport(stubTransport());

let mailData = {
	from: '"Kevin Wong 👻" <prompttesting@gmail.com>', // sender address
	to: 'kkwok_wai@hotmail.com', // list of receivers
	subject: 'Thank you for joining us Friday ', // Subject line
	text: 'Testing with Kevin!', // plain text body
	html: '<h1>Hello World</h1>' // html body
}

let failData = {
	from: '"Kevin Wong 👻" <prompttesting@gmail.com>', // sender address
	to: 'kkwok_wai@hil.com', // list of receivers
	subject: 'Thank you for joining us Friday ', // Subject line
	text: 'Testing with Kevin!', // plain text body
	html: '' // html body
}

transport.sendMail(mailData, function(err, info){
    if(err) {
    	console.log(err)
    } else {
    	console.log(info.response.toString());
    }
});

transport.sendMail(failData, function(err, info){
    if(err) {
    	console.log(err)
    } else {
    	console.log(info.response.toString());
    }
});
