
const { string } = require('joi');
const mongoose = require('mongoose');


const CartSchema = new mongoose.Schema({
    quantity:{type:Number},
    Product_variety_id:{ type: mongoose.Schema.Types.ObjectId, ref: 'ProductVarieties',required: true },
    user_id:{type: mongoose.Schema.Types.ObjectId, ref: 'User',required: true},
    created_at: { type: Date, default: new Date() },
    updated_at: { type: Date, default: new Date() }


})

module.exports = mongoose.model('Cart', CartSchema);
