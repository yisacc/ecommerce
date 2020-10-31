
const mongoose = require('mongoose');


const ProductTagSchema = new mongoose.Schema({
    tag_name:{type:String},
    created_at: { type: Date, default: new Date() },
    updated_at: { type: Date, default: new Date() }

})


module.exports = mongoose.model('ProductTags', ProductTagSchema);
