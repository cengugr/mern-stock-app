import mongoose from 'mongoose';
import companySchema from '../models/company';

companySchema.statics = {
   
    create : function(data) {
        var company = new this(data);
       return company.save(); 
    },

    update : function(query, data) {
          return  this.findOneAndUpdate(query, {$set: data});
    },

    get: function(query) {
        return this.findOne(query);
    },

    getAll: function(query) {
        return this.find(query);
       // return this.find({...query, address: 'USA'}).sort({size: -1}).where('size');
    },

    delete: function(query) {
       return this.findOneAndDelete(query); 
    }
}

var companyModel = mongoose.model('Company', companySchema);
module.exports = companyModel;


