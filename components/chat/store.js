const Model = require('./model');

function addChat(chat) {
    const mychat = new Model(chat);
    return mychat.save();

};

function getChat(userId) { 
    return new Promise((resolve, reject) => {
        let filter = {}
        if(userId !== null) {
            filter = { users: userId }
        }
        console.log(filter);
        Model.find(filter)
            .populate('users')
            .exec((err, populateData) => {
                if(err) {
                    reject(new Error(err));
                    return false
                }
                resolve(populateData);
            });
    });
};

module.exports = {
    add: addChat,
    list: getChat
};