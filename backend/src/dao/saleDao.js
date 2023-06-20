import mongoose from 'mongoose';
import saleSchema from '../models/sale';

saleSchema.statics = {
   
    create : function(data) {
        var sale = new this(data);
       return sale.save(); 
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


var saleModel = mongoose.model('Sale', saleSchema);
module.exports = saleModel; 
