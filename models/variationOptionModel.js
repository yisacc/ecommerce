
const { string, number } = require('joi');
const mongoose = require('mongoose');


const VariationOptionSchema = new mongoose.Schema({
    option_name:{type:String},
    variation_id:{type: mongoose.Schema.Types.ObjectId, ref: 'Variations'},
    created_at: { type: Date, default: new Date() },
    updated_at: { type: Date, default: new Date() }

})


module.exports = mongoose.model('VariationOptions', VariationOptionSchema);
