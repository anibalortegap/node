const express = require('express');
const router = express.Router();
//add dependencies local handle error
const response = require('../../network/response');
//add dependencies local controller message
const messageController = require('./controller');

router.get('/', (req, res) => {
    const filterMessageUser = req.query.user || null;
    messageController.getMessages(filterMessageUser)
        .then((messageList) => {
            response.success(req, res, messageList, 200);
        })
        .catch(err => {
            response.error(req, res, 'unexpected Error', 500, err);
        })
});

router.post('/', (req, res) => {
    messageController.addMessage(req.body.user, req.body.message)
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