var express = require('express');
var router = express.Router();

const indexRouter=require('./v1/index');
const usersRouter=require('./v1/users');
const authRouter=require('./v1/auth');
const variationRouter=require('./v1/variation');
const variationOptionRouter=require('./v1/variationOption');
const categoryRouter=require('./v1/category');
const productRouter=require('./v1/product');
const subCategoryRouter=require('./v1/subCategory');
const productTagRouter=require('./v1/tag');



router.use('/', indexRouter);
router.use('/users',usersRouter);
router.use('/auth', authRouter);
router.use('/variation', variationRouter);
router.use('/variationOption', variationOptionRouter);
router.use('/category', categoryRouter);
router.use('/subCategory',subCategoryRouter);
router.use('/product', productRouter);
router.use('/productTag', productTagRouter);

module.exports = router;
