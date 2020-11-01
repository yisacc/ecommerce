var router = require("express-promise-router")();

const { hasPermissions } = require('../../middlewares/auth');
const cartController = require('../../controllers/cartController');

/**
 * @swagger
 * /v1/cart/getCartItems:
 *  get:
 *    tags:
 *     - Cart
 *    description: Cart Items
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/getCartItems', hasPermissions(['view any user', 'view user']),cartController.fetchCartItems);

/**
 * @swagger
 * /v1/cart/getCartItemById:
 *  get:
 *    tags:
 *      - Cart
 *    description: Get Cart Item By Id
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
router.get('/getCartItemById', hasPermissions(['view user']),cartController.getItemFromCartById);

/**
 * @swagger
 * /v1/cart/addToCart:
 *  post:
 *    tags:
 *      - Cart
 *    description: Add to Cart
 *    parameters:
 *    - name: reqBody
 *      in: body
 *      schema:
 *          type: object
 *          properties:
 *              quantity:
 *                  type: number 
 *              ProductVarietyId:
 *                  type: string 
 *              userId:
 *                  type: string 

 *          required:
 *              - quantity
 *              - ProductVarietyId
 *              - userId
 *    responses:
 *      '201':
 *        description: Created
 */

router.post('/addToCart', hasPermissions(['create user']), cartController.addToCart);


/**
 * @swagger
 * /v1/cart/deleteCartItem:
 *  delete:
 *    tags:
 *      - Cart
 *    description: Delete Cart Item
 *    parameters:
 *    - name: cartItemId
 *      description: Cart Item Id to delete
 *      in: path
 *      type: string
 *      required: true
 *    responses:
 *      '201':
 *        description: Deleted
 */

router.delete('/deleteCartItem', hasPermissions(['remove user']),cartController.deleteCartItem);

module.exports = router;
