
const { string, number } = require('joi');
const mongoose = require('mongoose');


const ReviewSchema = new mongoose.Schema({
    product_id:{ type: mongoose.Schema.Types.ObjectId, ref: 'Products' },
    date:{type:Date},
    title:{type:String},
    text:{type:Number},
    rating:{type:Number},
    user_id:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    helpful_votes:{type:Number},
    voter_ids:[{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    created_at: { type: Date, default: new Date() },
    updated_at: { type: Date, default: new Date() }


})

// methods

// attributes

module.exports = mongoose.model('Reviews', ReviewSchema);
