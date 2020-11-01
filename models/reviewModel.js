
const mongoose = require('mongoose');


const ReviewSchema = new mongoose.Schema({
    product_id:{ type: mongoose.Schema.Types.ObjectId, ref: 'Products' },
    title:{type:String},
    text:{type:String},
    rating:{type:Number},
    user_id:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    helpful_votes:{type:Number},
    voter_ids:[{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    created_at: { type: Date, default: new Date() },
    updated_at: { type: Date, default: new Date() }


})


module.exports = mongoose.model('Reviews', ReviewSchema);
