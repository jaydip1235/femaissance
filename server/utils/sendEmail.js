var nodemailer = require('nodemailer');

const sendEmail=(obj)=>{
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.MAIL_PASSWORD
        }
      });
      
      var mailOptions = {
        from: process.env.EMAILID,
        to: obj.email,
        subject: obj.subject,
        html: obj.message
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}

module.exports=sendEmail;