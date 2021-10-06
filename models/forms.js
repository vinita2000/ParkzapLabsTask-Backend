const mongoose = require('mongoose');
const validator = require('validator');

// console.log(validator, typeof validator, validator.isEmail);

const schema = new mongoose.Schema({
   name: {
    type: String,
    trim: true,
    required: [true, 'Please enter name']
   },
   dob: {
    type: String,
    required: [true, 'Please enter Date Of Birth']
   },
   email: {
    type: String,
    lowercase: true,
    trim: true,
    validator: [validator.isEmail, 'Invalid email'],
    required: true
   },
   phone: {
    type: String,
    trim: true,
    validator: [validator.isMobilePhone, 'Invalid Phone Number'],
    required: [true, 'Please enter a Phone Number']
   }
}, {timestamps:true});

const Form = mongoose.model('form', schema);
module.exports = Form;