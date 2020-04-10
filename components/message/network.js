const express = require('express');
const router = express.Router();
//add dependencies local handle error
const response = require('../../network/response');
//add dependencies local controller message
const messageController = require('./controller');

router.get('/', (req, res) => {
    messageController.getMessages()
        .then((messageList) => {
            response.success(req, res, messageList, 200);
        })
        .catch(err => {
            response.error(req, res, 'Unexpected Error', 500, err);
        })
});

router.post('/', (req, res) => {
    messageController.addMessage(req.body.user, req.body.message)
        .then((fullMessage)=> {
            response.success(req, res, fullMessage, 201);
        })
        .catch(err => {
            response.error(req, res, 'invalid data', 400, 'error in the controller');
        });
});

module.exports = router;