const express = require('express');
const router = express.Router();
//add dependencies local handle error
const response = require('../../network/response');

const userController = require('./controller');

router.post('/', (req, res) => {
    userController.addUser(req.body.name)
        .then((data) => {
            response.success(req, res, data, 201);
        })
        .catch(err => {
            response.error(req, res, 'invalidad data', 500, 'error in the controller');
        })
});

router.get('/', (req, res) => {
    userController.listUser()
        .then((listUser) => {
            response.success(req, res, listUser, 200);
        })
        .catch(err => {
            response.error(req, res, 'unexpected error', 500, err)
        })
})

module.exports = router;