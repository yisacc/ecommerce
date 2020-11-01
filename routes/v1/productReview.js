var router = require("express-promise-router")();

const { hasPermissions } = require('../../middlewares/auth');
const productReviewController = require('../../controllers/productReviewController');

/**
 * @swagger
 * /v1/productReview:
 *  get:
 *    tags:
 *     - Product Review
 *    description: Products
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/', hasPermissions(['view any review', 'view review']),productReviewController.fetchProductReview);

/**
 * @swagger
 * /v1/productReview/:id:
 *  get:
 *    tags:
 *      - Product Review
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
router.get('/:id', hasPermissions(['view review']),productReviewController.getProductReviewById);

/**
 * @swagger
 * /v1/productReview:
 *  post:
 *    tags:
 *      - Product Review
 *    description: Create Product
 *    parameters:
 *    - name: reqBody
 *      in: body
 *      schema:
 *          type: object
 *          properties:
 *              productId:
 *                  type: string 
 *              title:
 *                  type: string 
 *              text:
 *                  type: string 
 *              rating:
 *                  type: number
 *              userId:
 *                  type: string 
 *          required:
 *              - productId
 *              - title
 *              - rating
 *    responses:
 *      '201':
 *        description: Created
 */

router.post('/', hasPermissions(['create review']), productReviewController.addNewProductReview);

/**
 * @swagger
 * /v1/productReview:
 *  put:
 *    tags:
 *      - Product Review
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
 *              productId:
 *                  type: string 
 *              title:
 *                  type: string 
 *              text:
 *                  type: string 
 *              rating:
 *                  type: number
 *              userId:
 *                  type: string 
 *    responses:
 *      '201':
 *        description: Updated
 */
router.put('/:id', hasPermissions(['update review']), productReviewController.editProductReview);

/**
 * @swagger
 * /v1/productReview:
 *  delete:
 *    tags:
 *      - Product Review
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

router.delete('/:id', hasPermissions(['remove review']),productReviewController.deleteProductReview);

/**
 * @swagger
 * /v1/productReview/vote/:id:
 *  post:
 *    tags:
 *      - Product Review
 *    description: Create Product
 *    parameters:
 *    - name: reqBody
 *      in: body
 *      schema:
 *          type: object
 *          properties:
 *              voterId:
 *                  type: array
 *                  items:
 *                      type: string 
 *              
 *          required:
 *              - helpfulVotes
 *              - voterId
 *    responses:
 *      '201':
 *        description: Created
 */
router.put('/vote/:id', hasPermissions(['remove review']),productReviewController.voteProductReview);

module.exports = router;
