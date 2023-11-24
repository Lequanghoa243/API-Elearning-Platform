const userService = require('../services/users.service');
module.exports = function (app) {
    app.get('/user/:user-name',userService.getOne)
    app.post('user/register',userService.register)
    app.post('user/login',userService.login)
}