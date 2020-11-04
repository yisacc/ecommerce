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
const productReviewRouter=require('./v1/productReview');
const productVarietyRouter=require('./v1/productVariety');
const cartRouter=require('./v1/cart');
const orderRouter=require('./v1/order');



router.use('/', indexRouter);
router.use('/users',usersRouter);
router.use('/auth', authRouter);
router.use('/variation', variationRouter);
router.use('/variationOption', variationOptionRouter);
router.use('/category', categoryRouter);
router.use('/subCategory',subCategoryRouter);
router.use('/product', productRouter);
router.use('/productTag', productTagRouter);
router.use('/productReview', productReviewRouter);
router.use('/productVariety', productVarietyRouter);
router.use('/cart', cartRouter);
router.use('/order', orderRouter);
module.exports = router;
