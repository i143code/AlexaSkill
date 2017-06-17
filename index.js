var Alexa = require('alexa-sdk');
const https = require('https');
const definitions = require('./definitions.json');
const responses = require('./responses.json');
var express = require("express")
var router = express.Router();
const request = require('request');
const keyFromSlot = slot => key => key.toUpperCase() === slot.toUpperCase();
var app = express();
// const handlers = {
//     'LaunchRequest': function () {
//         this.emit(':ask', responses.LaunchRequest.ask, responses.LaunchRequest.reprompt);
//     },
//     'AMAZON.HelpIntent': function () {
//         this.emit(':ask', responses["AMAZON.HelpIntent"].ask, responses["AMAZON.HelpIntent"].reprompt);
//     },
//     'AMAZON.StopIntent': function () {
//         this.emit(':tell', responses["AMAZON.StopIntent"].tell);
//     },
//     'AMAZON.CancelIntent': function () {
//         this.emit('AMAZON.StopIntent');
//     },
//     'SessionEndedRequest': function () {
//         this.emit('AMAZON.StopIntent');
//     },
//     'Unhandled': function () {
//         this.emit('AMAZON.HelpIntent');
//     },
//     'GetDefinition': function () {
       
//         var slot = this.event.request.intent.slots.Term.value;
//         //  request('https://morning-bastion-58963.herokuapp.com/form', function(err, res, body) {  
//         //         //   this.emit(":tellWithCard", definition, term, definition);
//         //       });
//         if (slot) {
//             var term = Object.keys(definitions).find(keyFromSlot(slot));
        
//             const definition = definitions[term];
//             if (definition) {
//                 // thi this.emit(":tellWithCard", definition, term, definition);s.emit(":tellWithCard","Done ashish Sweet");
//                              this.emit(":tellWithCard", definition, term, definition);

//             } else {
//                 this.emit(":tell", "I'm sorry, I don't know the definition of " + slot + ". Please try again.");
//             }
//         } else {
//             this.emit(":ask", "You need to provide a term. " + responses["AMAZON.HelpIntent"].reprompt, responses["AMAZON.HelpIntent"].reprompt);
//         }

//     }
    
// };

// exports.handler = function (event, context, callback) {
//     var alexa = Alexa.handler(event, context);
//     alexa.registerHandlers(handlers);
//     alexa.execute();
// };



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
        var slot = this.event.request.intent.slots.Term.value;
        if (slot) {
            var term = Object.keys(definitions).find(keyFromSlot(slot));

            const definition = definitions[term];
            if (definition) {
                this.emit(":tellWithCard", definition, term, definition);
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
