var router = require("express-promise-router")();

const { hasPermissions } = require('../../middlewares/auth');
const variationController = require('../../controllers/variationController');

/**
 * @swagger
 * /v1/variation:
 *  get:
 *    tags:
 *     - Variation
 *    description: Products Variation
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/', hasPermissions(['view any user', 'view user']),variationController.fetchVariations);

/**
 * @swagger
 * /v1/variation/:id:
 *  get:
 *    tags:
 *      - Variation
 *    description: Get Products Variation By Id
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
router.get('/:id', hasPermissions(['view user']),variationController.getVariationById);

/**
 * @swagger
 * /v1/variation:
 *  post:
 *    tags:
 *      - Variation
 *    description: Create Products Variation
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

router.post('/', hasPermissions(['create user']), variationController.addNewVariation);

/**
 * @swagger
 * /v1/variation:
 *  put:
 *    tags:
 *      - Variation
 *    description: Edit Products Variation
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
router.put('/:id', hasPermissions(['update user']), variationController.editVariation);

/**
 * @swagger
 * /v1/variation:
 *  delete:
 *    tags:
 *      - Variation
 *    description: Delete Products Variation
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

router.delete('/:id', hasPermissions(['remove user']),variationController.deleteVariation);

module.exports = router;
