const rest = require('../utils/restware');
const Course = require('../models/Courses.model')
const { Op } = require('sequelize');
const Lesson = require('../models/lesson.model')
const Enrollment = require('../models/enrollment.model')
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
            const attributes = ['CourseID', 'Title', 'Description', 'LearningTime'];
            const course = await Course.findOne({
                where: { Title: coursename },
                attributes: attributes,
                raw: true,
            });
    
            if (course) {
                const attributesL = ['LessonID', 'CourseID', 'Title', 'Content', 'OrderL'];
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
    

    getOneLesson: async function(req, res) {
        let coursename = req.params.courseName;
        let lessonId = req.params.id;

        coursename = coursename.replace(/-/g, ' ');

        try {
            const course = await Course.findOne({
                where: { Title: coursename },
                raw: true,
            });

            if (course) {
                const lesson = await Lesson.findOne({
                    where: { CourseID: course.CourseID, LessonID: lessonId },
                    raw: true,
                });

                if (lesson) {
                    return rest.sendSuccessOne(res, lesson, 200);
                } else {
                    return rest.sendError(res, 1, 'lesson_not_found', 404, 'Lesson not found');
                }
            } else {
                return rest.sendError(res, 1, 'course_not_found', 404, 'Course not found');
            }
        } catch (error) {
            return rest.sendError(res, 1, 'get_one_lesson_fail', 400, error);
        }
    },

    enrollCourse:async function (req, res) {
        const { userID } = req.body; // Assuming the request body contains userID
        let { courseName } = req.params; // Retrieve courseName from route parameters

        try {
            
            courseName = courseName.replace(/-/g, ' ');
            const course = await Course.findOne({
                where: { Title: courseName },
                attributes: ['CourseID'],
                raw: true,
            });

            if (!course) {
                return rest.sendError(res, 1, 'course_not_found', 404, 'Course not found');
            }

            const courseID = course.CourseID;

            // Check if the user is already enrolled in the course
            const existingEnrollment = await Enrollment.findOne({
                where: { UserID: userID, CourseID: courseID },
                raw: true,
            });

            if (existingEnrollment) {
                return rest.sendError(res, 1, 'already_enrolled', 400, 'User is already enrolled in the course');
            }

            // If not enrolled, create a new enrollment record
            await Enrollment.create({
                UserID: userID,
                CourseID: courseID,
                EnrollmentDate: new Date(),
            });

            return rest.sendSuccessOne(res, { message: 'Enrollment successful' }, 201);
        } catch (error) {
            console.error('Error in enrollCourse:', error);
            return rest.sendError(res, 1, 'enroll_course_fail', 400, error);
        }
    },
};
