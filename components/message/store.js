const Model = require('./model');

function addMessage(message) {
    const myMessage = new Model(message);
    myMessage.save();

};

function getMessageByUser(filterUser) {
    return new Promise((resolve, reject) => {
        let filter = {};
        if (filterUser !== null) {
            filter = { user: filterUser }
        }
        Model.find(filter)
            .populate('user')
            .exec((err, pupulatedData) => {
                if (err) {
                    reject(new Error(err));
                    return false;
                }
                resolve(pupulatedData);
            });
    })
};

function getMessageByChat(filterChat) {
    return new Promise((resolve, reject) => {
        let filter = {};
        if (filterChat !== null) {
            filter = { chat: filterChat }
        }
        Model.find(filter)
            .populate('user')
            .exec((err, pupulatedData) => {
                if (err) {
                    reject(new Error(err));
                    return false;
                }
                resolve(pupulatedData);
            });
    })
};

async function updateTextMesssage(id, message) {
    const foundMessage = await Model.findOne({
        _id: id
    });
    foundMessage.message = message;
    const newMessage = await foundMessage.save();
    return newMessage;
};

function deleteMessage(id) {
    return Model.deleteOne({
        _id: id
    });
};

module.exports = {
    add: addMessage,
    listUser: getMessageByUser,
    listChat: getMessageByChat,
    updateText: updateTextMesssage,
    delete: deleteMessage
};