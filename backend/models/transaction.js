import mongoose from "mongoose";

const TransactionSchema = mongoose.Schema({
    tourId: {
      type: String
    },
    tourTitle: {
      type: String
    },
    agency: {
      type: String
    },
    quantity: {
      type: Number,
      required: true
    },
    pricePerItem: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    customerId: {
      type: String,
      required: true
    },
    customerEmail: {
      type: String,
      required: true
    },
    paymentType: {
      type: String,
      required: true
    },
    paymentId: {
      type: String,
      required: true
    },
    voucherCodes: {
      type: [String],
      required: true
    },
    claimed: {
        type: Boolean,
        default: false
    },
    cashedOut: {
      type: Boolean,
      default: false
    },
    date: {
      type: Date,
      default: Date.now
    },
    dateClaimed: {
      type: Date
    }
  });
  
  export const Transaction = mongoose.model('Transaction', TransactionSchema);


  export const addTransaction = function(newTransaction, callback) {
    newTransaction.save(callback);
  };