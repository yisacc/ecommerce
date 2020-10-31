var router = require("express-promise-router")();

const { hasPermissions } = require('../../middlewares/auth');
const subCategoryController = require('../../controllers/subCategoryController');

/**
 * @swagger
 * /v1/subCategory:
 *  get:
 *    tags:
 *     - Sub Category
 *    description: Products Sub Category
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/', hasPermissions(['view any user', 'view user']),subCategoryController.fetchSubCategories);

/**
 * @swagger
 * /v1/subCategory/:id:
 *  get:
 *    tags:
 *      - Sub Category
 *    description: Get Products Sub Category By Id
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
router.get('/:id', hasPermissions(['view user']),subCategoryController.getSubCategoryById);

/**
 * @swagger
 * /v1/subCategory:
 *  post:
 *    tags:
 *      - Sub Category
 *    description: Create Products Sub Category
 *    parameters:
 *    - name: reqBody
 *      in: body
 *      schema:
 *          type: object
 *          properties:
 *              subCategoryName:
 *                  type: string 
 *              categoryId:
 *                  type: string
 *          required:
 *              - subCategoryName
 *              - categoryId
 *    responses:
 *      '201':
 *        description: Created
 */

router.post('/', hasPermissions(['create user']), subCategoryController.addNewSubCategory);

/**
 * @swagger
 * /v1/subCategory:
 *  put:
 *    tags:
 *      - Sub Category
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
 *              subCategoryName:
 *                  type: string 
 *              categoryId:
 *                  type: string
 *    responses:
 *      '201':
 *        description: Updated
 */
router.put('/:id', hasPermissions(['update user']), subCategoryController.editSubCategory);

/**
 * @swagger
 * /v1/subCategory:
 *  delete:
 *    tags:
 *      - Sub Category
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

router.delete('/:id', hasPermissions(['remove user']),subCategoryController.deleteSubCategory);

module.exports = router;
