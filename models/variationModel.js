
const { string, number } = require('joi');
const mongoose = require('mongoose');


const VariationSchema = new mongoose.Schema({
    variation_name:{type:String},

})


module.exports = mongoose.model('Variations', VariationSchema);
