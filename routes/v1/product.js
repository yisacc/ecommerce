var router = require("express-promise-router")();

const { hasPermissions } = require('../../middlewares/auth');
const productController = require('../../controllers/productController');

/**
 * @swagger
 * /v1/product:
 *  get:
 *    tags:
 *     - Product
 *    description: Products
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/', hasPermissions(['view any user', 'view user']),productController.fetchProducts);

/**
 * @swagger
 * /v1/product/:id:
 *  get:
 *    tags:
 *      - Product
 *    description: Get Product By Id
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
router.get('/:id', hasPermissions(['view user']),productController.getProductById);

/**
 * @swagger
 * /v1/product:
 *  post:
 *    tags:
 *      - Product
 *    description: Create Product
 *    parameters:
 *    - name: reqBody
 *      in: body
 *      schema:
 *          type: object
 *          properties:
 *              productSKU:
 *                  type: string 
 *              productTitle:
 *                  type: string 
 *              productDescription:
 *                  type: string 
 *              manufactureDetails:
 *                  type: object
 *                  properties:
 *                      modelNumber:
 *                          type: string
 *                      releaseDate:
 *                          type: string
 *                          format: date-time
 * 
 *              primaryCategoryId:
 *                  type: string 
 *              categoryId:
 *                  type: array
 *                  items:
 *                      type: string
 *              tag:
 *                  type: array
 *                  items:
 *                      type: string
 *          required:
 *              - productSKU
 *              - productTitle
 *              - productDescription
 *              - primaryCategoryId
 *    responses:
 *      '201':
 *        description: Created
 */

router.post('/', hasPermissions(['create user']), productController.addNewProduct);

/**
 * @swagger
 * /v1/product:
 *  put:
 *    tags:
 *      - Product
 *    description: Edit Product
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
 *              variationName:
 *                  type: string 
 *          required:
 *              - variationName
 *    responses:
 *      '201':
 *        description: Updated
 */
router.put('/:id', hasPermissions(['update user']), productController.editProduct);

/**
 * @swagger
 * /v1/product:
 *  delete:
 *    tags:
 *      - Product
 *    description: Delete Product
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

router.delete('/:id', hasPermissions(['remove user']),productController.deleteProduct);

module.exports = router;
