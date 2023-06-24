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

    getAll: function(query,page,limit) {
        let skip = page * limit;
        return this.find(query);
        //skip(skip).limit(limit).sort({_id: -1});    
       // return this.find({...query, address: 'USA'}).sort({size: -1}).where('size');
    },

    delete: function(query) {
       return this.findOneAndDelete(query); 
    },

    getCompaniesWithFilterandPaginationandSorter: async function(query,page,limit,sorter) {
        
        let skip = page * limit;
        const count = await this.find(query).countDocuments(); 
        const data = await this.find(query).skip(skip).limit(limit).sort(sorter);

        return {count,data}; 


    }
}

var companyModel = mongoose.model('Company', companySchema);
module.exports = companyModel;


