
const { string } = require('joi');
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');


const OrderSchema = new mongoose.Schema({

    cart_id:{ type: mongoose.Schema.Types.ObjectId, ref: 'User',required: true },
    created_at: { type: Date, default: new Date() },
    updated_at: { type: Date, default: new Date() }



})



module.exports = mongoose.model('Orders', OrderSchema);
