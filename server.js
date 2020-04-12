//add dependencies of framework express
const express = require('express');
//add dependencies of bodyParser
const bodyParser = require('body-parser');
//add dependencies of router message
const router =  require('./network/routes');

const db = require('./db');

const db_url = 'mongodb+srv://db_user_platzi_chat:cQzpGmM0DAM2@cluster0-ybgzp.mongodb.net/platzichat_db?retryWrites=true&w=majority';

db(db_url);

var app = express();
//add support body with json
app.use(bodyParser.json());
//add support body key-value
app.use(bodyParser.urlencoded({ extended: false }));
router(app);

app.use('/app', express.static('public'));


app.listen(3000);
console.log('La aplicación está escuchando en http://localhost:3000');