const Form = require('../models/forms');

exports.getForms = async (req, res) => {
  try {

    let forms = await Form.find({});
    if (!forms){
      forms = [];
    }
    res.status(200).json({
      message: 'Success',
      data: forms
    });

  } catch (e) {
    res.status(400).json({
      message: e.message
    });
  }
};