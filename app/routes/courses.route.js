/**
 * Created by bioz on 1/13/2017.
 */
// our components
const courseService = require('../services/courses.service');

module.exports = function (app) {
    app.get('/api/v1/course', courseService.getAll);
    /**
     * @api {GET} /api/v1/course/:id Get One
     * @apiVersion 1.0.0
     * @apiName getOne
     * @apiGroup course
     * @apiPermission Every type of user
     *
     * @apiDescription Get one course
     *
     * @apiParam {string} id ID of course, on params
     *
     * @apiExample Example usage:
     * curl -i http://localhost:3000/api/v1/course/2
     *
     * @apiSuccess {String} id the ID of course
     * @apiSuccess {String} title title of course
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *          "data":{
     *              "id": "2",
     *              "title": "ReactJs Course",
     *              ...
     *          },
     *          "result": "ok",
     *          "message" ""
     *     }
     *
     * @apiError invalid input data
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 400 Bad Request
     *     {
     *       "result": "fail",
     *       "message": "invalid input"
     *     }
     */
    app.get('/api/v1/course/:id', courseService.getOne);
};
