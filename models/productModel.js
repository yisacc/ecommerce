
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');


const ProductSchema = new mongoose.Schema({
    product_sku:{type:String,unique: true,required: true},
    product_title:{type:String,required: true},
    product_description:{type:String,required: true},
    manufacture_details: {
        model_number: {type:String},
        release_date: {type:Date}
      },
    primary_category_id:{ type: mongoose.Schema.Types.ObjectId, ref: 'Categories',required: true },
    category_ids:[{type: mongoose.Schema.Types.ObjectId, ref: 'SubCategories'}],
    tags:[{type: mongoose.Schema.Types.ObjectId, ref: 'Tags'}],
    created_at: { type: Date, default: new Date() },
    updated_at: { type: Date, default: new Date() }


})

// plugins
ProductSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Products', ProductSchema);
