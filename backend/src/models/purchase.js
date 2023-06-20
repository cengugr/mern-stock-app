import mongoose from "mongoose";

var purchaseSchema = new mongoose.Schema({
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    supplierName: String,
    deliveryDate: Date,
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        quantity: Number,
        unitPrice: Number
    }]
});

module.exports = purchaseSchema;

