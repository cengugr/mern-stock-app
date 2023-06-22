import mongoose from 'mongoose';
import purchaseSchema from '../models/purchase';
import stockDao from './stockDao';
import stockSchema from '../models/stock';

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
        //return this.find(query).populate('company',['name','address']).sort({_id: -1});
        return this.find(query).populate( 'company').populate('products.product').sort({_id: -1});
        //populate({path : 'company', match : { name : "Teknosa" }, select : 'name' }).populate('products.product').sort({_id: -1}); 
    },

    delete: function(query) {
       return this.findOneAndDelete(query); 
    }
}

var purchaseModel = mongoose.model('Purchase', purchaseSchema);
module.exports = purchaseModel; 
