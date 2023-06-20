import mongoose from 'mongoose';
import purchaseSchema from '../models/purchase';

purchaseSchema.statics = {
   
    create : function(data) {
        var purchase = new this(data);
       return purchase.save(); 
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


var purchaseModel = mongoose.model('Purchase', purchaseSchema);
module.exports = purchaseModel; 
