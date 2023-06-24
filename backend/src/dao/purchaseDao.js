import mongoose from 'mongoose';
import purchaseSchema from '../models/purchase';
import stockDao from './stockDao';

purchaseSchema.statics = {
   
    create : function(data) {
        var purchase = new this(data);
        return purchase.save().then((p) => {
             
            if(p.products)
             p.products.forEach(element => {
                 
                stockDao.findOne({company : p.company, product : element.product}).then((s) => {
                    console.log(s); 
                    if(s) {
                        s.quantity += element.quantity;
                        s.save();
                    } else {
                        var stock = {company : p.company, product : element.product, quantity : element.quantity};
                        stockDao.create(stock);                        
                    }
                }
                );

             });

             return p;

        })
        
    },  
       
    update : async function(query, data) {
          let p = await this.findOne(query); 
          return  this.findOneAndUpdate(query, {$set: data}).then((result) => {
            let willBeDeletedList = [];
                if(data.products)
                {
                   
                    //get me the records that includes in old list but not in the new list for delete from stock
                    willBeDeletedList = p.products.filter(item => {
                        return !data.products.filter(pF=>pF._id).some(obj =>obj._id == item._id.toString());
                    });

                
                 {data.products.forEach(element => {                    
                    

                    let exQuantity = 0;
                    if(element._id)
                    exQuantity = p.products.find((e) => element._id == e._id.toString())?.quantity ?? 0;
                
                    let diff = element.quantity - exQuantity; 

                    stockDao.findOne({company : p.company, product : element.product}).then((s) => {
                        console.log(s); 
                        if(s) {
                            s.quantity += diff;
                            s.save();
                        } else {
                            var stock = {company : p.company, product : element.product, quantity : diff};
                            stockDao.create(stock);                        
                        }
                    }
                    );
    
                 })}} 
                 else {
                    willBeDeletedList = p.products;
                    
                    }

                    willBeDeletedList.forEach(element => {
             
                        stockDao.findOne({company : p.company, product : element.product}).then((s) => {
                            console.log(s); 
                            if(s) {
                                s.quantity -= element.quantity;
                                s.save();
                            } else {
                                var stock = {company : p.company, product : element.product, quantity : -element.quantity};
                                stockDao.create(stock);                        
                            }
                        }
                        );
            
                     });
                        
    
                 return result; 
          }
            );
    },

    get: function(query) {
        return this.findOne(query);
    },

    getAll: function(query) {
        //return this.find(query).populate('company',['name','address']).sort({_id: -1});
        return this.find(query).populate( 'company').populate('products.product').sort({_id: -1});
        //populate({path : 'company', match : { name : "Teknosa" }, select : 'name' }).populate('products.product').sort({_id: -1}); 
    },

    delete: async function(query) {
       let p = await this.findOne(query); 
       return this.findOneAndDelete(query).then(() => {
             
        if(p.products)
         p.products.forEach(element => {
             
            stockDao.findOne({company : p.company, product : element.product}).then((s) => {
                console.log(s); 
                if(s) {
                    s.quantity -= element.quantity;
                    s.save();
                } else {
                    var stock = {company : p.company, product : element.product, quantity : -element.quantity};
                    stockDao.create(stock);                        
                }
            }
            );

         });

         return p;

    }); 
    },
    getCompaniesWithFilterandPaginationandSorter: async function(query,page,limit,sorter) {
        
        let skip = page * limit;
        const count = await this.find(query).countDocuments(); 
        const data = await this.find(query).skip(skip).limit(limit).populate( 'company').populate('products.product').sort(sorter);

        return {count,data}; 

    }
}

var purchaseModel = mongoose.model('Purchase', purchaseSchema);
module.exports = purchaseModel; 
