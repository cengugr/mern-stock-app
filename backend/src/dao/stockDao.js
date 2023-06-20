import mongoose from 'mongoose';
import stockSchema from '../models/stock';

stockSchema.statics = {
   
    create : function(data) {
        var stock = new this(data);
       return stock.save(); 
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


var stockModel = mongoose.model('Stock', stockSchema);
module.exports = stockModel; 
