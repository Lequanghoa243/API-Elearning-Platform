const rest = require('../utils/restware');
const path = require('../models/paths.model');
const CoursePath = require('../models/coursePath.model');
const Course = require('../models/courses.model');
const { Op } = require('sequelize');


module.exports = {
    getAll: function(req, res) {
        const query = req.query || '';
        const where = {};
        let page = 1;
        let perPage = 10;
        const sort = [];
        const offset = perPage * (page - 1);
    
        path.findAndCountAll({
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
            return rest.sendError(res, 1, 'get_all_path_fail', 400, error);
        });
    },


    getOne: async function (req, res) {
        let pathName = req.params.pathName;
      
        pathName = pathName.replace(/-/g, ' ');
    
        try {
            const pathInstance = await path.findOne({
                where: { Name: pathName },
                raw: true,
            });
    
            if (!pathInstance) {
                return rest.sendError(res, 1, 'unavailable_path', 404);
            }
    
            const coursesInPath = await CoursePath.findAll({
                where: { PathID: pathInstance.PathID },
                attributes: ['OrderC'], // Include other attributes if needed
                include: [
                    {
                        model: Course,
                        attributes: ['CourseID', 'Title', 'Description', 'NumberofLesson', 'LearningTime'],
                        raw: true,
                    },
                ],
                order: [['OrderC', 'ASC']],
                raw: true,
            });
    
            if (coursesInPath.length === 0) {
                return rest.sendError(res, 1, 'no_courses_in_path', 404, 'No courses found in the path');
            }
    
            // Construct the response JSON
            const pathWithCourses = {
                id: pathInstance.PathID,
                name: pathInstance.Name,
                description: pathInstance.Description,
                courses: coursesInPath.map(course => ({
                    id: course['Course.CourseID'],
                    title: course['Course.Title'],
                    description: course['Course.Description'],
                    numberOfLessons: course['Course.NumberofLesson'],
                    learningTime: course['Course.LearningTime'],
                    order: course['OrderC'],
                })),
            };
    
            // Sending the pathWithCourses as the response
            return rest.sendSuccessOne(res, pathWithCourses, 200);
        } catch (error) {
            // Logging the error
            console.error('An error occurred in getOnePath:', error);
            return rest.sendError(res, 1, 'get_one_path_fail', 400, error);
        }
    },
    
    
    
    searchPath:function(req, res) {
        let searchTerm = req.query.search;
      
        searchTerm = searchTerm.replace(/-/g, ' ');
    
        if (!searchTerm) {
            return rest.sendError(res, 1, 'search_term_required', 400, 'Search term is required');
        }
    
        path.findAll({
            where: {
                Name: { [Op.like]: `%${searchTerm}%` },
            },
            raw: true,
        })
        .then((results) => {
            if (results.length === 0) {
                return rest.sendError(res, 1, 'no_path_found', 404, 'No path found');
            }
    
            return rest.sendSuccessMany(res, results, 200);
        })
        .catch((error) => {
            return rest.sendError(res, 1, 'search_path_fail', 400, error);
        });
    }
    ,
};
