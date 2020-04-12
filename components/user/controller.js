const storeUser = require('./store');

function addUser(name) {
        if(!name) {
            //return promise reject 
            console.error('[userController not user]');
            return Promise.reject(new Error('the data is incorrect'));
        };
        const user = {
            name
        };
        return storeUser.add(user);
};

function listUser() {
   return storeUser.list();
}

module.exports = {
    addUser,
    listUser
}