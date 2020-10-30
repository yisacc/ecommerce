var express = require('express');

var router = express.Router();

/**
 * @swagger
 * /v1/:
 *  get:
 *    description: Ecommerce API
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/', async function(req, res, next) {
  return res.json({
    title: 'Ecommerce Items',
    version: '1.0.0',
    description: 'description .....'
  })
});

module.exports = router;
