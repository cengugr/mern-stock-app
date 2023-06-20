import mongoose from 'mongoose';

var productSchema = new mongoose.Schema({
    name: String,
    category: String,
    unit : {
        type: String,
        enum: ['kg', 'pcs', 'box' ]
    }
});

module.exports = productSchema;
