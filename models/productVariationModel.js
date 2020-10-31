
const { string, number } = require('joi');
const mongoose = require('mongoose');


const ProductVariationSchema = new mongoose.Schema({
    option_id:{ type: mongoose.Schema.Types.ObjectId, ref: 'VariationOptions' },
    product_id:{type: mongoose.Schema.Types.ObjectId, ref: 'Products'},
    product_quantity:{type:Number,required: true},
    value_name:{type:String},
    total_reviews:{type:Number},
    average_review:{type:Number},
    price_history:[{
        retail:{type:Number},
        sale:{type:Number},
        start:{type:Date},
        end:{type:Date}
    }],

})


module.exports = mongoose.model('ProductVariations', ProductVariationSchema);
