var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

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