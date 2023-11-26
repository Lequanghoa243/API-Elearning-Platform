const rest = require('../utils/restware');
const Course = require('../models/courses.model')
const { Op } = require('sequelize');
const Lesson = require('../models/lesson.model')
module.exports = {

    getAll: function(req, res) {
        const query = req.query || '';
        const where = {};
        let page = 1;
        let perPage = 10;
        const sort = [];
        const offset = perPage * (page - 1);
    
        Course.findAndCountAll({
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
    
   
    getOne: async function (req, res) {
        let coursename = req.params.courseName;
    
        coursename = coursename.replace(/-/g, ' ');
    
        try {
            const attributes = ['CourseID', 'Title', 'Description', 'NumberofLesson', 'LearningTime'];
            const course = await Course.findOne({
                where: { Title: coursename },
                attributes: attributes,
                raw: true,
            });
    
            if (course) {
                const attributesL = ['LessonID', 'CourseID', 'Title', 'Content', 'LessonOrder'];
                const lessons = await Lesson.findAll({
                    where: { CourseID: course.CourseID },
                    attributes: attributesL,
                    raw: true,
                });
    
                course.Lessons = lessons;
                return rest.sendSuccessOne(res, course, 200);
            } else {
                return rest.sendError(res, 1, 'unavailable_course', 400);
            }
        } catch (error) {
            return rest.sendError(res, 1, 'get_one_course_fail', 400, error);
        }
    },
    
    
    searchCourse: function(req, res) {
        let searchTerm = req.query.search;
      
        searchTerm = searchTerm.replace(/-/g, ' ');
    
        if (!searchTerm) {
            return rest.sendError(res, 1, 'search_term_required', 400, 'Search term is required');
        }
    
        Course.findAll({
            where: {
                Title: { [Op.like]: `%${searchTerm}%` },
            },
            raw: true,
        })
        .then((results) => {
            if (results.length === 0) {
                return rest.sendError(res, 1, 'no_course_found', 404, 'No course found');
            }
    
            return rest.sendSuccessMany(res, results, 200);
        })
        .catch((error) => {
            return rest.sendError(res, 1, 'search_course_fail', 400, error);
        });
    }
    ,
    

    getOneLesson:function(req,res){

    },
};
