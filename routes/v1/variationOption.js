var router = require("express-promise-router")();

const { hasPermissions } = require('../../middlewares/auth');
const variationOptionController = require('../../controllers/variationOptionController');

/**
 * @swagger
 * /v1/variationOption:
 *  get:
 *    tags:
 *     - Variation Option
 *    description: Products Variation Option
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/', hasPermissions(['view any user', 'view user']),variationOptionController.fetchVariationOptions);

/**
 * @swagger
 * /v1/variationOption/:id:
 *  get:
 *    tags:
 *      - Variation Option
 *    description: Get Products Variation Option By Id
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
router.get('/:id', hasPermissions(['view user']),variationOptionController.getVariationOptionById);

/**
 * @swagger
 * /v1/variationOption:
 *  post:
 *    tags:
 *      - Variation Option
 *    description: Create Products Variation Option
 *    parameters:
 *    - name: reqBody
 *      in: body
 *      schema:
 *          type: object
 *          properties:
 *              optionName:
 *                  type: string 
 *              variationId:
 *                  type: string
 *          required:
 *              - optionName
 *              - variationId
 *    responses:
 *      '201':
 *        description: Created
 */

router.post('/', hasPermissions(['create user']), variationOptionController.addNewVariationOption);

/**
 * @swagger
 * /v1/variationOption:
 *  put:
 *    tags:
 *      - Variation Option
 *    description: Edit Products Variation Option
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
 *              optionName:
 *                  type: string 
 *              variationId:
 *                  type: string
 *    responses:
 *      '201':
 *        description: Updated
 */
router.put('/:id', hasPermissions(['update user']), variationOptionController.editVariationOption);

/**
 * @swagger
 * /v1/variationOption:
 *  delete:
 *    tags:
 *      - Variation Option
 *    description: Create Products Variation Option
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

router.delete('/:id', hasPermissions(['remove user']),variationOptionController.deleteVariationOption);

module.exports = router;
