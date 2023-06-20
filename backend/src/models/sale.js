import mongoose from "mongoose";

var saleSchema = new mongoose.Schema({
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    customerName: String,
    salesDate: Date,
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        quantity: Number,
        unitPrice: Number
    }]
});

module.exports = saleSchema; 