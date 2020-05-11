'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const APP_TOKEN = 'EAAJqlkCtRg8BAMmmHyM4jd456vHxr1rJHKIV0A8oa42tLrHsWgt6u8or9rnrrWMhKJJhKNSMTZBz0jKB1I2eL7FZCRpbOZCedq8IOyg1V7DpateMuZBQLXYwrmaXL9bLugy7CgQzB4rWY5xlhlGCeDky6wnlEDkKpSW9qN7OXQZDZD';


var app = express();
app.use(bodyParser.json());

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function () {
    console.log("Servidor escuchando puerto");
});

app.get('/', function (req, res) {
    res.send('Demosle vida a Cyso');
}); 

app.get('/webhook', function (req, res) {
    if (req.query['hub.verify_token'] === 'cysoBot_token_by_CysoProject2020') 
    {
        res.send(req.query['hub.challenge']);
    } else 
    {
        res.send('No tienes permitido el acceso a esta ruta');
    }
}); 

app.post('/webhook', function(req, res){
    const webhook_event = req.body.entry[0];
    if(webhook_event.messaging) {
        webhook_event.messaging.forEach(event => {
            handleMessage(event);
        })
    }
    res.sendStatus(200);
})

function handleMessage(event){
    const senderId = event.sender.id;
    const messageText = event.message.text;
    const messageData = {
        recipient: {
            id: senderId
        },
        message: {
            text: messageText
        }
    }
    callSendApi(messageData);
}

function callSendApi(response) {
    request({
        "uri": "https://graph.facebook.com/me/messages",
        "qs": {
            "access_token": APP_TOKEN
        },
        "method": "POST",
        "json": response
    }
    // function(err) {
    //     if(err) {
    //         console.log('Ha ocurrido un error')
    //     } else {
    //         console.log('Mensaje enviado')
    //     }
    // }
)
}