var Alexa = require('alexa-sdk');
const https = require('https');
const definitions = require('./definitions.json');
const responses = require('./responses.json');
var express = require("express")
var router = express.Router();
const request = require('request');
var bodyParser = require('body-parser');
var app = express();
var json = require('./test.json');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var http = require('http')
var jsonfile = require('jsonfile')

const keyFromSlot = slot => key => key.toUpperCase() === slot.toUpperCase();
var app = express();



const handlers = {
    'LaunchRequest': function () {
        this.emit(':ask', responses.LaunchRequest.ask, responses.LaunchRequest.reprompt);
    },
    'AMAZON.HelpIntent': function () {
        this.emit(':ask', responses["AMAZON.HelpIntent"].ask, responses["AMAZON.HelpIntent"].reprompt);
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', responses["AMAZON.StopIntent"].tell);
    },
    'AMAZON.CancelIntent': function () {
        this.emit('AMAZON.StopIntent');
    },
    'SessionEndedRequest': function () {
        this.emit('AMAZON.StopIntent');
    },
    'Unhandled': function () {
        this.emit('AMAZON.HelpIntent');
    },
    'GetDefinition': function () {
        var data ={
        showSignIn: true
        }

        var slot = this.event.request.intent.slots.Term.value;
        if (slot) {
            var term = Object.keys(definitions).find(keyFromSlot(slot));
  request.post({url:'https://morning-bastion-58963.herokuapp.com/signIn', form: data}, function(err,httpResponse,body){ /* ... */ 
                //   this.emit(":tell", "Done form has been added");
                if(err){
                console.log(err);
                                } else{
                console.log(body);
                }
                
                 })
 console.log("I am herehdoifhewoh don with url post");
           
    console.log(data)
    //wdjpqw
    json.showSignIn = true
    var obj =  {
        showSignIn: false,
        showSignUp: false,
        showPills: false
    };
  
var file = './test.json'
jsonfile.writeFile(file, obj, function (err) {
    
  console.error(err)
})
console.log("Updated");
console.log(json)
            const definition = definitions[term];
            if (definition) {
                console.log("I am herehdoifhewoh");
                
                //  request.post({url:'https://morning-bastion-58963.herokuapp.com/signIn', form: { showSignIn: true}}, function(err,httpResponse,body){ /* ... */ 
                  this.emit(":tell", "Done form has been added"); 
                // })
                // this.emit(":tellWithCard", definition, term, definition);
              
            } else {
                this.emit(":tell", "I'm sorry, I don't know the definition of " + slot + ". Please try again.");
            }
        } else {
            this.emit(":ask", "You need to provide a term. " + responses["AMAZON.HelpIntent"].reprompt, responses["AMAZON.HelpIntent"].reprompt);
        }

    }
};

exports.handler = function (event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};
var appPort = (process.env.PORT || 3000);

app.listen(appPort, function() {
    console.log("listening on port " + appPort);
});
app.get('/form',function(req,res){
    var formJson = {
        showSignIn: false,
        showSignUp: false,
        showPills: false
    };
    res.send(json)
})

//post signin data

