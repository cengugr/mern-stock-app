import mongoose from 'mongoose';

var companySchema = new mongoose.Schema({
    name: String,
    address: String,
    city: String,
    sector: String,
    size : Number
},
{
    timestamps: true
}
);

module.exports = companySchema;
