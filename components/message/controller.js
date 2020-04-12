const storeMessage = require('./store');

function addMessage(user, message) {
    return new Promise((resolve, reject) => {
        if(!user || !message) {
            console.error('[messageController] not user or message');
            return reject(new Error('the data is incorrect'));
        };
        const fullMessage = {
            user: user,
            message: message,
            date: new Date(),
        };
        storeMessage.add(fullMessage);
        resolve(fullMessage);
    })
};

function getMessages(filterUser) {
    return new Promise((resolve, reject) => {
        const listMessage = storeMessage.list(filterUser);
        resolve(listMessage);
    });
};

function updateMessage(id, message){
    return new Promise( async (resolve, reject)=> {
        if(!id || !message) {
            console.error('[messageController] not id or message');
            return reject(new Error('the data is incorrect'));
        };
        const result = await storeMessage.updateText(id, message);
        resolve(result);
    });
};

function deleteMessage(id) {
    return new Promise((resolve, reject) => {
        if(!id) {
            console.error('[messageController] not id');
            return reject(new Error('the data is incorrect'));
        }
        storeMessage.delete(id)
            .then(()=> {
                resolve();
            })
            .catch(err => {
                reject(err);
            })
    });
};

module.exports = {
    addMessage,
    getMessages,
    updateMessage,
    deleteMessage
};