# familyFridayEmail

a prompt from apartmentlist:  

Instruction to run the app: 

Step 1: npm install

Step 2: npm start ---- this will run nodemon app.js

Step 3: go to your http://localhost:3000/ --- you will see whats in the payload (all the names) and once you hit the send email button it will send to whoever email you input in the payload 

payload is located at index.js -- and is run by the sendEmailTemplate function 

payload example - (from apartmentlist) 

{
    "members": [
        {
            "email": "example@hotmail.com",
            "name": "Jill",
            "team": "engineering"
        },
        {
            "email": "example@gmail.com",
            "name": "Rohit",
            "team": "finance"
        },
        {
            "email": "example@hotmail.com",
            "name": "Maria",
            "team": "operations"
        },
        {
            "email": "example@gmail.com",
            "name": "General",
            "team": ""
        },
        {
            "email": "example@gmail.com",
            "name": "Jackie",
            "team": "engineering"
        }
    ],

    "restaurant": {
        "logo": "https://s3-media2.fl.yelpcdn.com/bphoto/F_dgemfinYzY9nrZ_xfeGw/o.jpg",
        "name": "Tony’s Pizza Napoletana",
        "yelp_link": "https://www.yelp.com/biz/tonys-pizza-napoletana-san-francisco?osq=best+pizza"
    }
}

------------ The getFeedback log in ------------- 

https://www.getfeedback.com/ 

log to see the feedback information

promptesting@gmail.com 
pw: testing111


------------ My step of appoaching the problem -------------
 
1. first trying to figure out the apartment prompt 

	- I never build a email template so I need to do some research 

2. research how to send email through server 

	- since I'm a javascript developer and without a doubt I used node.js and express as my server side lanugage. 

3. implement node mailer and test it (it works) 

	- During the research I came upon a few npm packet to help through mailing email template. From sendGrid to nodemailer because sendGrid was not as friendly then nodemailer so I decide to use nodemailer. However, sendGrid is more secure then nodemailer since it can track down how many you send out. But since I just need quick implementation I decided to use nodemailer.

4. implement template for it to run (because i was able to only run it single line) 

	This is the nodemailer example from docs --- 
	
	let mailOptions = {
    	from: '"Fred Foo 👻" <foo@blurdybloop.com>', // sender address
    	to: 'bar@blurdybloop.com, baz@blurdybloop.com', // list of receivers
    	subject: 'Hello ✔', // Subject line
    	text: 'Hello world ?', // plain text body
    	html: '<b>Hello world ?</b>' // html body
	};
	
	Base on the docs I was able to send the hello world to my own email. So I created the prompttesting email to continue my work on this application

5. implement css style (but only able to do it with inline now) 

	- I trying using stylesheet however I find out once the email is send out it acts at a single page html so having a seperate stylesheet is not working. So i decided to use inline style

6. now have to figure out to change variable through template 

	- Base on some research I was able to run the html template through html: of mailOption (refer back to problem 4). 


7. I decided to use ejs to render dynamic content 

	- I thought about using react however ejs template is very easy to use and it can run dynamticly so I decided to use it and it works perfectly. 


8. Now i need to try to figure out how to render image through nodemailer (links work) 
	
	- So my first approach of rendering image is to save a local one, because this is how we normally make website; however, after looking at few template in gmail all the image is saw has to be render through https:// .... so i just decided to find image online for my implementation 

9. Finally working on how to store usering click

	- instead of storing to mongo database (my first approach) I find out that html form are not a solution once you send it as a html template, so after some research I find the getfeedback.com website which give me a option of store user clicks. I can redirect back my localhost and collect the data and save it to my database. However, if I think more on the future others can use the app as well so I decided to use a 3rd party application instead. 

10. lastly is just styling 

	- This is my apporach to the problem. Of course there is more small things in between that got me stuck, but these steps are the milestone that I needed to cross to enable this application be build.
