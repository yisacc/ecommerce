
const { string, number } = require('joi');
const mongoose = require('mongoose');


const ProductSchema = new mongoose.Schema({
    product_sku:{type:String,unique: true,required: true},
    product_title:{type:String,required: true},
    product_description:{type:String,required: true},
    product_quantity:{type:Number,required: true},
    shipping_details:{
        weight: {type:Number},
        width: {type:Number},
        height: {type:Number},
        depth: {type:Number}
    },
    manufacture_details: {
        model_number: {type:String},
        release_date: {type:Date}
      },
    total_reviews:{type:Number},
    average_review:{type:Number},
    price_history:[{
        retail:{type:Number},
        sale:{type:Number},
        start:{type:Date},
        end:{type:Date}
    }],
    primary_category:{ type: mongoose.Schema.Types.ObjectId, ref: 'Categories',required: true },
    category_ids:[{type: mongoose.Schema.Types.ObjectId, ref: 'SubCategories'}],
    tags:[{type: mongoose.Schema.Types.ObjectId, ref: 'Tags'}],
    created_at: { type: Date, default: new Date() },
    updated_at: { type: Date, default: new Date() }


})

// methods

// attributes

module.exports = mongoose.model('Products', ProductSchema);
