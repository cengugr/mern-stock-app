import mongoose from 'mongoose';
import productSchema from '../models/product';
import stockDao from '../dao/stockDao';
import stockSchema from '../models/stock';

productSchema.statics = {
   
    create : function(data) {
       var product = new this(data);
       return product.save();
    },

    update : function(query, data) {
          return  this.findOneAndUpdate(query, {$set: data});
    },

    get: function(query) {
        return this.findOne(query);
    },

    getAll: function(query) {
        return this.find(query);
    },

    delete: function(query) {
       return this.findOneAndDelete(query); 
    }
}


var productModel = mongoose.model('Product', productSchema);
module.exports = productModel;
