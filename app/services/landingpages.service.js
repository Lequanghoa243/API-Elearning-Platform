const Rest = require('../utils/restware');
module.exports = {
    getHome: function (req, res) {
        const out = { title: 'path', id: 'all'};
        return Rest.sendSuccessOne(res, out, 200);
    },

    getContact: function (req, res) {
        let id = req.params.id || '';
        res.send('path: ' + id);
    },
   getAboutUs:function (req, res){
        
    },
};
