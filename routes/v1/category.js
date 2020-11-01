var router = require("express-promise-router")();

const { hasPermissions } = require('../../middlewares/auth');
const categoryController = require('../../controllers/categoryController');

/**
 * @swagger
 * /v1/category:
 *  get:
 *    tags:
 *     - Category
 *    description: Products category
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/', hasPermissions(['view any category', 'view category']),categoryController.fetchCategories);

/**
 * @swagger
 * /v1/category/:id:
 *  get:
 *    tags:
 *      - Category
 *    description: Get Products Category By Id
 *    parameters:
 *    - name: id
 *      description: id to view
 *      in: path
 *      type: string
 *      required: true
 *    responses:
 *      '201':
 *        description: A successful response
 */
router.get('/:id', hasPermissions(['view category']),categoryController.getCategoryById);

/**
 * @swagger
 * /v1/category:
 *  post:
 *    tags:
 *      - Category
 *    description: Create Products Category
 *    parameters:
 *    - name: reqBody
 *      in: body
 *      schema:
 *          type: object
 *          properties:
 *              categoryName:
 *                  type: string 
 *          required:
 *              - categoryName
 *    responses:
 *      '201':
 *        description: Created
 */

router.post('/', hasPermissions(['create category']), categoryController.addNewCategory);

/**
 * @swagger
 * /v1/category:
 *  put:
 *    tags:
 *      - Category
 *    description: Edit Products category
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
 *              categoryName:
 *                  type: string 
 *          required:
 *              - categoryName
 *    responses:
 *      '201':
 *        description: Updated
 */
router.put('/:id', hasPermissions(['update category']), categoryController.editCategory);

/**
 * @swagger
 * /v1/category:
 *  delete:
 *    tags:
 *      - Category
 *    description: Delete Products category
 *    parameters:
 *    - name: id
 *      description: id to delete
 *      in: path
 *      type: string
 *      required: true
 *    responses:
 *      '201':
 *        description: Deleted
 */

router.delete('/:id', hasPermissions(['remove category']),categoryController.deletecategory);

module.exports = router;
