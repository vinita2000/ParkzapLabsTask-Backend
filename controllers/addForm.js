const Form = require('../models/forms');
const { sendMail } = require('./sendMail');

const validatePhoneNumber = async (input_str) => {
  const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  return re.test(input_str);
}

exports.addForm = async (req, res) => {
  try {

    const { name, email, dob, phone } = req.body;

    // validate phone number
    if (phone){
      const isValid = await validatePhoneNumber(phone);
      if (!isValid) throw new Error('Please enter valid phone number');
    }

    await Form.create(req.body);

    await sendMail(email, name, 'github');

    // res.render('/home');
    res.status(200).json({
      message: 'Success'
    });

  } catch (e) {
    res.status(400).json({
      message: e.message
    });
  }
};