
const courseService = require('../services/courses.service');

module.exports = function (app) {
     /**
     * @api {GET} /course/ Get All Courses 
     * @apiVersion 1.0.0
     * @apiName getAll
     * @apiGroup Course
     * @apiPermission Every type of user
     *
     * @apiDescription Get All Courses                                                                                                                                                                                                                                                                                                                                                                                         
     *
     * @apiParam {string} Name Name of the course, on params
     *
     * @apiExample Example usage:
     * curl -i http://localhost:3000/course/web-design
     *
     *
     * @apiSuccess {String} Name Title of course
     *
     * @apiSuccessExample Success-Response:
     *     course: web design
     * @apiError invalid-course the course is not exist in the database
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 400 Bad Request
     *     {
     *       "result": "fail",
     *       "message": "invalid course"
     *     }
     */
    app.get('/course', courseService.getAll);
    /**
     * @api {GET} /course/:course Get One 
     * @apiVersion 1.0.0
     * @apiName getOne
     * @apiGroup Course
     * @apiPermission Every type of user
     *
     * @apiDescription Get one specific course
     *
     * @apiParam {string} Name Name of the course, on params
     *
     * @apiExample Example usage:
     * curl -i http://localhost:3000/course/web-design
     *
     *
     * @apiSuccess {String} Name Title of course
     *
     * @apiSuccessExample Success-Response:
     *     course: web design
     * @apiError invalid-course the course is not exist in the database
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 400 Bad Request
     *     {
     *       "result": "fail",
     *       "message": "invalid course"
     *     }
     */
    app.get('/course/:course-name', courseService.getOne);
    app.get('/course/:course-name/:lesson-id', courseService.getOneLesson);
    app.get('/course/search',courseService.searchCourse);
    

};
