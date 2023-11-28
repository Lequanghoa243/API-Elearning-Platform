const userService = require('../services/users.service');
module.exports = function (app) {
    app.get('/user/:id',userService.getOne)
    app.post('user/register',userService.register)
    app.post('user/login',userService.login)
    app.get('/user/logout',userService.logout)
}