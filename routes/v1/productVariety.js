var router = require("express-promise-router")();

const { hasPermissions } = require('../../middlewares/auth');
const productVarietyController = require('../../controllers/ProductVarietyController');

/**
 * @swagger
 * /v1/productVariety/getProductVarieties:
 *  get:
 *    tags:
 *     - Product Variety
 *    description: Product Varieties
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/getProductVarieties', hasPermissions(['view any user', 'view user']),productVarietyController.fetchProductVarieties);

/**
 * @swagger
 * /v1/productVariety/getProductVarietyById:
 *  get:
 *    tags:
 *      - Product Variety
 *    description: Get Product Variety By Id
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
router.get('/getProductVarietyById', hasPermissions(['view user']),productVarietyController.getProductVarietyById);

/**
 * @swagger
 * /v1/productVariety/createProductVariety:
 *  post:
 *    tags:
 *      - Product Variety
 *    description: Create Product Variety
 *    parameters:
 *    - name: reqBody
 *      in: body
 *      schema:
 *          type: object
 *          properties:
 *              optionId:
 *                  type: string 
 *              productId:
 *                  type: string 
 *              totalStock:
 *                  type: string 
 *              shippingDetails:
 *                  type: object
 *                  properties:
 *                      width:
 *                          type: number
 *                      height:
 *                          type: number
 *                      depth:
 *                          type: number
 *                      weight:
 *                          type: number
 *              priceHistory:
 *                  type: array
 *                  items:
 *                      type: object
 *                      properties:
 *                         retail:
 *                              type: number
 *                         sale:
 *                              type: number
 *                         start:
 *                              type: string
 *                              format: date-time
 *                         end:
 *                              type: string
 *                              format: date-time
 *          required:
 *              - optionId
 *              - productId
 *              - totalStock
 *              - priceHistory
 *    responses:
 *      '201':
 *        description: Created
 */

router.post('/createProductVariety', hasPermissions(['create user']), productVarietyController.addNewProductVariety);

/**
 * @swagger
 * /v1/productVariety/editProductVariety:
 *  put:
 *    tags:
 *      - Product Variety
 *    description: Edit Product Variety
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
 *              optionId:
 *                  type: string 
 *              productId:
 *                  type: string 
 *              totalStock:
 *                  type: number 
 *              shippingDetails:
 *                  type: object
 *                  properties:
 *                      width:
 *                          type: number
 *                      height:
 *                          type: number
 *                      depth:
 *                          type: number
 *                      weight:
 *                          type: number
 *              priceHistory:
 *                  type: array
 *                  items:
 *                      type: object
 *                      properties:
 *                         retail:
 *                              type: number
 *                         sale:
 *                              type: number
 *                         start:
 *                              type: string
 *                              format: date-time
 *                         end:
 *                              type: string
 *                              format: date-time
 *    responses:
 *      '201':
 *        description: Updated
 */
router.put('/editProductVariety', hasPermissions(['update user']), productVarietyController.editProductVariety);

/**
 * @swagger
 * /v1/productVariety/deleteProductVariety:
 *  delete:
 *    tags:
 *      - Product Variety
 *    description: Delete Product Variety
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

router.delete('/deleteProductVariety', hasPermissions(['remove user']),productVarietyController.deleteProductVariety);

module.exports = router;
