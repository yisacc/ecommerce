
const mongoose = require('mongoose');


const VariationSchema = new mongoose.Schema({
    variation_name:{type:String},
    created_at: { type: Date, default: new Date() },
    updated_at: { type: Date, default: new Date() }

})


module.exports = mongoose.model('Variations', VariationSchema);
