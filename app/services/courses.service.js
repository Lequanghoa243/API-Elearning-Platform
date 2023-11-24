const Rest = require('../utils/restware');
module.exports = {
    getAll: function (req, res) {
        const out = { title: 'course', id: 'all'};
        return Rest.sendSuccessOne(res, out, 200);
    },

    getOne: function (req, res) {
        let id = req.params.id || '';
        res.send('course: ' + id);
    },
    searchCourse:function (req, res){

    },
    getAllLesson:function(req,res){

    },
    getOneLesson:function(req,res){

    },
};
