const storeMessage = require('./store');

function addMessage(user, message, chat, file) {
    return new Promise((resolve, reject) => {
        if(!user || !message || !chat) {
            console.error('[messageController] not user or message');
            return reject(new Error('the data is incorrect'));
        };

        let fileUrl = '';
        if(file) {
            fileUrl = 'http://localhost:3000/app/public/files' + file.filename;
        }
        const fullMessage = {
            chat: chat,
            user: user,
            message: message,
            date: new Date(),
            file: fileUrl
        };
        storeMessage.add(fullMessage)
        resolve(fullMessage);
    })
};

function getMessageByUser(filterUser) {
    return new Promise((resolve, reject) => {
        const listMessage = storeMessage.listUser(filterUser);
        resolve(listMessage);
    });
};

function getMessageByChat(filterChat) {
    return new Promise((resolve, reject) => {
        const listMessage = storeMessage.listChat(filterChat);
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
    updateMessage,
    deleteMessage,
    getMessageByUser,
    getMessageByChat
};