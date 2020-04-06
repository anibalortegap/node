//add dependencies of framework express
const express = require('express');
//add dependencies of bodyParser
const bodyParser = require('body-parser');
//add dependencies of router of express
const router =  express.Router();
//add dependencies local handle error
const response = require('./network/response');

var app = express();
//add support body with json
app.use(bodyParser.json());
//add support body key-value
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);

router.get('/message', (req, res) => {
    //access headers of request
    console.log(req.headers);
    //send custom headers
    res.header({
        "custom-header": "custom value",
    });
    response.success(req, res, 'list of messages');
});

router.post('/message', (req, res) => {
    console.log(req.body);
    console.log(req.query);
    if(req.query.error === 'ok'){
        response.error(req, res, 'simulate error', 401);
    }else{
        response.success(req, res, 'succesfully create', 201);
    }
});


app.use('/app', express.static('public'));


app.listen(3000);
console.log('La aplicación está escuchando en http://localhost:3000');