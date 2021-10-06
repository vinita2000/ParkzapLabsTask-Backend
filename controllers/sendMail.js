
const nodemailer = require('nodemailer');
const SENDER_MAIL = process.env.SENDER_MAIL;
const SENDER_PASSWORD = process.env.SENDER_PASSWORD;

exports.sendMail = ( mailto, name) => {
  try{
    return new Promise((resolve,reject)=>{

      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: SENDER_MAIL,
          pass: SENDER_PASSWORD
        }
      });
     
      let mailOptions = {
        from: SENDER_MAIL,
        to: `${mailto}`,
        subject: 'Successful Form Submition',
        html: `
            <h3>Form Details for ${name}</h3><br>
            <p> Your Form is Successfully submitted with us !!</p><br>
            <p> You can view all the forms on this link : <a href="https://parkzaplabstask.herokuapp.com/home">$https://parkzaplabstask.herokuapp.com/home</a></p><br>
          `
      };
  
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log("error is " + error);
          resolve(false);
        } 
        else {
          console.log('Email sent: ' + info.response);
          resolve(true);
        }
      });
    });

  }catch(e){
    throw new Error(e.message);
  }
}

