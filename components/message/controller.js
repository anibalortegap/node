const storeMessage = require('./store');

function addMessage(user, message) {
    return new Promise((resolve, reject) => {
        if(!user || !message) {
            console.error('[messageController] not user or message');
            return reject(new Error('the data is incorrect'));
        }
        const fullMessage = {
            user: user,
            message: message,
            date: new Date(),
        };
        storeMessage.add(fullMessage);
        resolve(fullMessage);
    })
};

function getMessages() {
    return new Promise((resolve, reject) => {
        const listMessage = storeMessage.list();
        console.log(listMessage);
        resolve(listMessage);
    });
};
module.exports = {
    addMessage,
    getMessages
};