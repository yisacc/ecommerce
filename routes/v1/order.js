var router = require("express-promise-router")();

const { hasPermissions } = require('../../middlewares/auth');
const orderController = require('../../controllers/orderController');

/**
 * @swagger
 * /v1/order/getOrders:
 *  get:
 *    tags:
 *     - Order
 *    description: Orders List
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/getOrders', hasPermissions(['view any variation', 'view variation']),orderController.fetchOrders);


/**
 * @swagger
 * /v1/order/createOrder:
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
 *              cartId:
 *                  type: string 
 *          required:
 *              - cartId
 *    responses:
 *      '201':
 *        description: Created
 */

router.post('/createOrder', hasPermissions(['create variation']), orderController.addNewOrder);
/**
 * @swagger
 * /v1/order/getOrderById/:id:
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
router.get('/getOrderById/:id', hasPermissions(['view variation']),orderController.getOrderById);


/**
 * @swagger
 * /v1/order/cancelOrder/:id:
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

router.delete('/cancelOrder/:id', hasPermissions(['remove variation']),orderController.deleteOrder);

module.exports = router;
