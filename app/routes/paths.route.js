const pathService = require('../services/paths.service');
module.exports = function (app) {
    app.get('/path',pathService.getAll);
    app.get('/path/:path-name',pathService.getOne);
    app.get('/path/search',pathService.searchPath);
}