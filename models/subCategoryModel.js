
const mongoose = require('mongoose');


const SubCategorySchema = new mongoose.Schema({
    category_id:{ type: mongoose.Schema.Types.ObjectId, ref: 'Categories' },
    sub_category_name:{type:String}

})

// methods

// attributes

module.exports = mongoose.model('SubCategories', SubCategorySchema);
