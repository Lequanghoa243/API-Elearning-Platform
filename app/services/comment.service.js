const rest = require('../utils/restware');
const comment = require('../models/comment.model')

module.exports = {
    getAllComment: function(req, res) {
        const where = {};
        let page = 1;
        let perPage = 10;
        const sort = [];
        const offset = perPage * (page - 1);
    
        comment.findAndCountAll({
            where: where,
            limit: perPage,
            offset: offset,
            order: sort,
            raw: true,
        })
        .then((data) => {
            const pages = Math.ceil(data.count / perPage);
            const output = {
                data: data.rows,
                pages: {
                    current: page,
                    prev: page - 1,
                    hasPrev: false,
                    next: (page + 1) > pages ? 0 : (page + 1),
                    hasNext: false,
                    total: pages,
                },
                items: {
                    begin: ((page * perPage) - perPage) + 1,
                    end: page * perPage,
                    total: data.count,
                },
            };
            output.pages.hasNext = (output.pages.next !== 0);
            output.pages.hasPrev = (output.pages.prev !== 0);
            return rest.sendSuccessMany(res, output, 200);
        })
        .catch(function(error) {
            return rest.sendError(res, 1, 'get_all_course_fail', 400, error);
        });
    },
    
   
};
