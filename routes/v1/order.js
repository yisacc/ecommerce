var router = require("express-promise-router")();

const { hasPermissions } = require('../../middlewares/auth');
const orderController = require('../../controllers/orderController');

/**
 * @swagger
 * /v1/order:
 *  get:
 *    tags:
 *     - Order
 *    description: Orders List
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/', hasPermissions(['view any variation', 'view variation']),orderController.fetchOrders);


/**
 * @swagger
 * /v1/order:
 *  post:
 *    tags:
 *      - Order
 *    description: Create Order
 *    parameters:
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
 *        description: Created
 */

router.post('/', hasPermissions(['create variation']), orderController.addNewOrder);
/**
 * @swagger
 * /v1/order/:id:
 *  get:
 *    tags:
 *      - Order
 *    description: Get Order
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
router.get('/:id', hasPermissions(['view variation']),orderController.getOrderById);


/**
 * @swagger
 * /v1/order:
 *  delete:
 *    tags:
 *      - Order
 *    description: Cancel Order
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

router.delete('/:id', hasPermissions(['remove variation']),orderController.deleteOrder);

module.exports = router;
