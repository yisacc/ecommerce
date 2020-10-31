var express = require('express');
var router = express.Router();

const indexRouter=require('./v1/index');
const usersRouter=require('./v1/users');
const authRouter=require('./v1/auth');
const variationRouter=require('./v1/variation');



router.use('/', indexRouter);
router.use('/users',usersRouter);
router.use('/auth', authRouter);
router.use('/variation', variationRouter);

module.exports = router;
