const chatStore = require('./store');

function addChat(users) {
    //validate if users and users is array
    if(!users || !Array.isArray(users)) {
        return Promise.reject(new Error('invalid users list'));
    }

    const chat = {
        users: users
    };

    return chatStore.add(chat);
};

function listChat(filterChat) {
    return new Promise((resolve, reject) => {
        const listChat = chatStore.list(filterChat)
        resolve(listChat)
    });
};

module.exports = {
    addChat,
    listChat
}