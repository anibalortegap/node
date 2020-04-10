const db = require('mongoose');
const Model = require('./model');

const db_url = 'mongodb+srv://db_user_platzi_chat:cQzpGmM0DAM2@cluster0-ybgzp.mongodb.net/platzichat_db?retryWrites=true&w=majority';
//mongoose use native Promise JS
db.Promise = global.Promise;
db.connect(db_url, {
    //backward compatibility of mongoDB
    useNewUrlParser: true,
    //enable engine the discovery and monitoring the server 
    useUnifiedTopology: true
});

console.log('[db] connect succesfull');

function addMessage(message){
    const myMessage = new Model(message);
    myMessage.save();

};

async function getMessage(){
    const messages = await Model.find();
    return messages
};

module.exports = {
    add: addMessage,
    list: getMessage,
}