const db = require('mongoose');

//mongoose use native Promise JS
db.Promise = global.Promise;
function connect(db_url) {
    db.connect(db_url, {
        //backward compatibility of mongoDB
        useNewUrlParser: true,
        //enable engine the discovery and monitoring the server 
        useUnifiedTopology: true
    });
    console.log('[db] connect succesfull');
};

module.exports = connect;


