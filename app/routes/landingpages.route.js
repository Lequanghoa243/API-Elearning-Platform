const pageService = require('../services/landingpages.service');
module.exports = function (app) {
    app.get('/',pageService.getHome)
    app.get('/aboutus',pageService.getAboutUs)
    app.get('/contact',pageService.getContact)
    
}