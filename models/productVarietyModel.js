
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');


const ProductVarietySchema = new mongoose.Schema({
    option_id:{ type: mongoose.Schema.Types.ObjectId, ref: 'VariationOptions' },
    product_id:{type: mongoose.Schema.Types.ObjectId, ref: 'Products'},
    total_stock:{type:Number,required: true},
    shipping_details:{
        weight: {type:Number},
        width: {type:Number},
        height: {type:Number},
        depth: {type:Number}
    },
    price_history:[{
        retail:{type:Number,required: true},
        sale:{type:Number,required: true},
        start:{type:Date,required: true},
        end:{type:Date,required: true}
    }],

})

// plugins
ProductVarietySchema.plugin(mongoosePaginate);
module.exports = mongoose.model('ProductVarieties', ProductVarietySchema);
