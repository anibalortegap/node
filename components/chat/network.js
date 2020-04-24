const express = require('express');
const router = express.Router();
//add dependencies local handle error
const response = require('../../network/response');
//add dependencies local controller message
const chatController = require('./controller');

router.post('/', (req, res) => {
    chatController.addChat(req.body.users)
        .then((data) => {
            response.success(req, res, data, 201);
        })
        .catch(err => {
            response.success(req, res, 'invalid data', 500, 'error in the controller');
            console.error(err);
        })
});

router.get('/:userId', (req, res) => {
    const filterChat = req.params.userId;
    chatController.listChat(filterChat)
        .then((data) => {
            response.success(req, res, data, 200);
        })
        .catch(err => {
            response.success(req, res, 'unexpected error', 500, err)
        })
});

module.exports = router;