const express = require('express');
const router = express.Router();
//add dependencies local handle error
const response = require('../../network/response');
//add dependencies local controller message
const messageController = require('./controller');
//add dependencies send file in requuest
const multer = require('multer');

const upload = multer({
    dest: 'public/files/'
});

router.get('/', (req, res) => {
    if(req.query.chat){
        const filterMessageChat = req.query.chat || null;
        messageController.getMessageByChat(filterMessageChat)
        .then((messageList) => {
            response.success(req, res, messageList, 200);
        })
        .catch(err => {
            response.error(req, res, 'unexpected Error', 500, err);
        })
    } else {
        const filterMessageUser = req.query.user || null;
        messageController.getMessageByChat(filterMessageUser)
            .then((messageList) => {
                response.success(req, res, messageList, 200);
            })
            .catch(err => {
                response.error(req, res, 'unexpected Error', 500, err);
            })
    }
});

router.post('/', upload.single('file'), (req, res) => {
    messageController.addMessage(req.body.user, req.body.message, req.body.chat, req.file)
        .then((fullMessage) => {
            response.success(req, res, fullMessage, 201);
        })
        .catch(err => {
            response.error(req, res, 'invalid data', 400, 'error in the controller');
        });
});

router.patch('/:id', (req, res) => {
    messageController.updateMessage(req.params.id, req.body.message)
        .then((data) => {
            response.success(req, res, data, 200);
        })
        .catch(err => {
            response.error(req, res, 'internal error', 500, err);
        })
});

router.delete('/:id', (req, res) => {
    messageController.deleteMessage(req.params.id)
        .then(() => {
            response.success(req, res, `user ${req.params.id} succesfull delete`, 200);
        })
        .catch(err => {
            response.error(req, res, 'internal error', 500, err);
        })
});

module.exports = router;