const rest = require('../utils/restware');
const Category = require('../models/category.model')
const Course = require('../models/Courses.model');
const Enrollment = require('../models/enrollment.model')

module.exports = {

    getAll: async function(req, res) {
        try {
            const attributes = ['CategoryID', 'Name'];
            const categories = await Category.findAll({
                where: {},
                attributes: attributes,
                raw: true,
            });

            if (categories.length > 0) {
                for (const category of categories) {
                    const attributesL = ['CourseID', 'Title', 'Description', 'NumberofLesson', 'LearningTime', 'CategoryID'];
                    const courses = await Course.findAll({
                        where: { CategoryID: category.CategoryID },
                        attributes: attributesL,
                        raw: true,
                    });
                    category.Lessons = courses;
                }

                return rest.sendSuccessMany(res, categories, 200);
            } else {
                return rest.sendError(res, 1, 'unavailable_category', 400);
            }
        } catch (error) {
            return rest.sendError(res, 1, 'get_home_fail', 400, error);
        }
    },
    
    getOne: async function(req, res) {
        
    },
};
