const mongoose = require('mongoose')
const invoiceScema = mongoose.Schema({
    
    id: {
      type: Number,
      required: true,
      unique:true
    },
    customer_name:{
        type: String,
        required: true
    },
    saleperson_name: {
      type: String,
      required:true  
    },
    date:{

      type: Date,
      required:true
    },
    products:{
      type: Object,
      required:true
    },
    created_at: {
        type: Date,
    },
    updated_at: {
      type: Date,
    }
})

invoiceScema.pre('save', async function (next) {
    next()
})

const invoice = mongoose.model('invoices', invoiceScema)
module.exports = invoice