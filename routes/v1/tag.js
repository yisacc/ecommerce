var router = require("express-promise-router")();

const { hasPermissions } = require('../../middlewares/auth');
const tagController = require('../../controllers/productTagController');

/**
 * @swagger
 * /v1/productTag:
 *  get:
 *    tags:
 *     - Product Tag
 *    description: Product Tag
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/', hasPermissions(['view any productTag', 'view productTag']),tagController.fetchTags);

/**
 * @swagger
 * /v1/productTag/:id:
 *  get:
 *    tags:
 *      - Product Tag
 *    description: Get Product Tag By Id
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
router.get('/:id', hasPermissions(['view productTag']),tagController.getTagById);

/**
 * @swagger
 * /v1/productTag:
 *  post:
 *    tags:
 *      - Product Tag
 *    description: Create Product Tag
 *    parameters:
 *    - name: reqBody
 *      in: body
 *      schema:
 *          type: object
 *          properties:
 *              tagName:
 *                  type: string 
 *          required:
 *              - tagName
 *    responses:
 *      '201':
 *        description: Created
 */

router.post('/', hasPermissions(['create productTag']), tagController.addNewTag);

/**
 * @swagger
 * /v1/productTag:
 *  put:
 *    tags:
 *      - Product Tag
 *    description: Edit Product Tag
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
 *              tagName:
 *                  type: string 
 *          required:
 *              - tagName
 *    responses:
 *      '201':
 *        description: Updated
 */
router.put('/:id', hasPermissions(['update productTag']), tagController.editTag);

/**
 * @swagger
 * /v1/productTag:
 *  delete:
 *    tags:
 *      - Product Tag
 *    description: Delete Product Tag
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

router.delete('/:id', hasPermissions(['remove productTag']),tagController.deleteTag);

module.exports = router;
