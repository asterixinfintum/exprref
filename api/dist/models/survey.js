"use strict";

var mongoose = require('mongoose');
var ContactInfoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  }
});
var SurveySchema = new mongoose.Schema({
  investmentAmount: {
    type: String,
    required: true,
    "enum": ['less than 5000', '5000-10000', '10000-20000', '21000-40000', '40000-80000', '80000-100000', '100000-150000', '150000 and up']
  },
  transferMethod: {
    type: String,
    required: true,
    "enum": ['credit-debit', 'crypto', 'wire', 'money-gram', 'cash', 'other']
  },
  caseDescription: {
    type: String,
    required: true,
    trim: true
  },
  contactInfo: ContactInfoSchema
}, {
  timestamps: true
});
var Survey = mongoose.model('Survey', SurveySchema);
module.exports = Survey;