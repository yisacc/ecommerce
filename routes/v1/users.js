var router = require("express-promise-router")();

const  {userFormRequest} = require('../../middlewares/formRequest/user');
const { hasPermissions } = require('../../middlewares/auth');
const userController = require('../../controllers/userControllers');

/**
 * @swagger
 * /v1/users:

 *  get:
 *    tags:
 *      - users
 *    description: View registered users
 *    responses:
 *      '200':
 *        description: A successful response
 */

router.get('/', hasPermissions(['view any user', 'view user']),userController.All);

/**
 * @swagger
 * /v1/users/:id:

 *  get:
 *    tags:
 *      - users
 *    description: View user by id
 *    parameters:
 *    - name: id
 *      description: id to view
 *      in: path
 *      type: string
 *      required: true
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/:id', hasPermissions(['view user']),userController.get);

/**
 * @swagger
 * /v1/users/:
 *  post:
 *    tags:
 *      - users
 *    description: Register a new user
 *    parameters:
 *    - name: reqBody
 *      in: body
 *      schema:
 *          type: object
 *          properties:
 *              username:
 *                  type: string 
 *              password:
 *                  type: string
 *              repeat_password:
 *                  type: string
 *              email:
 *                  type: string
 *          required:
 *              - username
 *              - password
 *              - repeat_password
 *              - email
 *    responses:
 *      '201':
 *        description: Created
 */
router.post('/', hasPermissions(['create user']) && userFormRequest('createUser'), userController.create);

/**
 * @swagger
 * /v1/users/:id:
 *  patch:
 *    tags:
 *      - users
 *    description: update user information
 *    parameters:
 *    - name: id
 *      description: id to update
 *      in: path
 *      type: string
 *      required: true
 *    - name: reqBody
 *      in: body
 *      schema:
 *          type: object
 *          properties:
 *              username:
 *                  type: string 
 *              password:
 *                  type: string
 *              repeat_password:
 *                  type: string
 *              email:
 *                  type: string
 *    responses:
 *      '201':
 *        description: Created
 */
router.patch('/:id', hasPermissions(['update user']), userController.update);


/**
 * Remove a new user  with id
 * 
 * @route DELETE /users/{id}
 * @group User 
 * @param {string} id.path.required - user id
 * @security JWT
 * @returns {object} 200 - User object
 * @returns {Error}  default - Unexpected error
 */
router.delete('/:id', hasPermissions(['remove user']),userController.remove);

module.exports = router;
