var router = require("express-promise-router")();

const  {userFormRequest} = require('../../middlewares/formRequest/user');
const { hasPermissions } = require('../../middlewares/auth');
const variationController = require('../../controllers/variationController');

router.get('/', hasPermissions(['view any user', 'view user']),variationController.fetchVariations);

router.get('/:id', hasPermissions(['view user']),variationController.getVariationById);

router.post('/', hasPermissions(['create user']), variationController.addNewVariation);

router.patch('/:id', hasPermissions(['update user']), variationController.editVariation);

router.delete('/:id', hasPermissions(['remove user']),variationController.deleteVariation);

module.exports = router;
