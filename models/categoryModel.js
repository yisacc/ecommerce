
const mongoose = require('mongoose');


const CategorySchema = new mongoose.Schema({
category_name:{type:String}


})

// methods

// attributes

module.exports = mongoose.model('Categories', CategorySchema);
